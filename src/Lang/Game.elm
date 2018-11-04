module Lang.Game exposing
  ( Weights
  , makeScope
  , canReduceLeft
  , reduceLeft
  , canInsertTerm
  , prependTerm
  , getStyles
  , getWeights
  )

import Parser
import Set exposing (Set)
import Dict exposing (Dict)
import Result exposing (..)
import Tuple exposing (first, second, pair)
import List.Extra as List
import Maybe.Extra as Maybe
import Regex

import Editor.TextStyle exposing (..)
import Lang.Types exposing (..)
import Lang.Parse exposing (..)
import Lang.Check exposing (..)
import Lang.Lang exposing (..)
import Misc exposing (..)

import Debug exposing (toString, log)

type alias Weights = List (Float, Term)

makeScope : Int -> Term
makeScope len = Scope 0 (List.repeat len (Var 0 "_")) 0

startsWith : List a -> List a -> Bool
startsWith start = (==) start << List.take (List.length start)

canReduceLeft : List Int -> Expr -> Bool
canReduceLeft offsets expr =
  List.head expr
  |> Maybe.map getTermOffsets
  |> Maybe.map (flip startsWith offsets)
  |> Maybe.withDefault False

reduceLeft : Lang -> Expr -> Expr
reduceLeft lang expr =
  case expr of
    (Scope _ scope _) :: rest   -> scope ++ rest
    (Comb _ comb)     :: rest   -> Maybe.withDefault expr <| reduceComb lang comb rest
    _                           -> expr

canInsertTerm : Expr -> Bool
canInsertTerm expr =
  case expr of
    (Var _ "_")       :: rest -> True
    (Scope _ scope _) :: rest -> canInsertTerm scope
    _                         -> False

prependTerm : Term -> Lang -> Expr -> Expr
prependTerm term lang expr =
  let
    combs        = Set.fromList <| Dict.keys lang
    termRes      = checkExpr combs Set.empty (always True) [ term ]
    insert expr1 =
      case expr1 of
        (Var _ "_") :: rest        ->
           if canInsertTerm rest then (Var 0 "_") :: insert rest
                                 else term :: rest
        (Scope _ scope _) :: rest  -> Scope 0 (insert scope) 0 :: rest
        _                          -> expr1
    prepend expr1 =
      case expr1 of
        (Scope _ scope _) :: rest  ->
          if canInsertTerm scope then Scope 0 (insert scope) 0 :: rest
                                 else term :: expr1
        _                          -> term :: expr1
  in
    case termRes of
      Ok _  -> prepend expr
      Err _ -> expr

getAttrs : String -> (String -> a) -> Lang -> List (String, a)
getAttrs pattern f lang =
  let
    regex =
      Regex.fromStringWith
      { caseInsensitive = True
      , multiline = False
      } pattern
      |> Maybe.withDefault Regex.never
    tryPair decl =
      case decl of
        Decl _ comb _ _ comment ->
          Regex.find regex comment
          |> List.map .match |> List.head
          |> Maybe.map (pair comb << f)
  in
    Dict.values lang |> List.map tryPair |> List.filter Maybe.isJust
    |> Maybe.combine |> Maybe.withDefault []

getStyles : Lang -> Styles
getStyles = getAttrs "#[0-9a-f]{6}|#[0-9a-f]{3}" (textColor << Hex) >> Dict.fromList

getWeights : Lang -> Weights
getWeights lang =
  let
    getArgsLen decl = case decl of Decl _ _ args _ _ -> List.length args
    maxLen = Dict.values lang |> List.map getArgsLen |> List.maximum |> Maybe.withDefault 3
    fromString = toFloat << Maybe.withDefault 1 << String.toInt << String.dropLeft 1
    toWeight (comb, weight) = (weight, Comb 0 comb)
    weights = lang |> getAttrs "%\\d+" fromString |> List.map toWeight
    sum = weights |> List.map first |> List.sum
    scopeWeight = sum * 0.25 / (toFloat maxLen - 1)
    scopes = List.range 2 maxLen |> List.map (pair scopeWeight << makeScope)
  in
    if List.length weights > 0 then weights ++ scopes
                               else []
