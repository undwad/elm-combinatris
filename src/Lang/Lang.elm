module Lang.Lang exposing
  ( emptyLang
  , makeLang
  , makeExpr
  , reduceComb
  , reduceExpr
  , getTermOffsets
  , getReductionOffsets
  )

import Parser
import Set exposing (Set)
import Dict exposing (Dict)
import Result exposing (..)
import List.Extra as List
import Maybe.Extra as Maybe

import Lang.Types exposing (..)
import Lang.Parse exposing (..)
import Lang.Check exposing (..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

emptyLang : Lang
emptyLang = Dict.fromList []

makeLang : String -> Result Error Lang
makeLang str =
  Parser.run lang str
  |> mapError SyntaxError
  |> andThen buildLang
  |> andThen checkLang

makeExpr : Lang -> (Var -> Bool) -> String -> Result Error Expr
makeExpr lang checkVar str =
  let
    combs = Set.fromList <| Dict.keys lang
    args  = Set.fromList []
  in
    Parser.run expr str
    |> mapError SyntaxError
    |> andThen (mapError (SemanticsError 1) << checkExpr combs args checkVar)

replaceArg : (Arg, Term) -> Expr -> Expr
replaceArg (arg, term) expr =
  let
    replace1 = replaceArg (arg, term)
  in
    case expr of
      []                        -> []
      (Comb _ comb)     :: rest -> (Comb 0 comb)                :: replace1 rest
      (Scope _ scope _) :: rest -> (Scope 0 (replace1 scope) 0) :: replace1 rest
      (Var _ var)       :: rest -> (Var 0 var)                  :: replace1 rest
      (Arg _ arg1)      :: rest ->
               if arg1 == arg then term                         :: replace1 rest
                              else (Arg 0 arg1)                 :: replace1 rest

reduceComb : Lang -> Comb -> Expr -> Maybe Expr
reduceComb lang comb expr =
  case Dict.get comb lang of
    Just (Decl _ _ args repl _) ->
      let
        len = List.length args
        (args1, rest1) = List.splitAt len expr
      in
        if len == List.length args1
          then Just (List.foldl replaceArg repl (List.zip args args1) ++ rest1)
          else Nothing
    Nothing -> Nothing

reduceExpr : Lang -> Expr -> Expr
reduceExpr lang expr =
  let
    reduceExpr1 idx expr1 =
      case expr1 of
        (Comb _ comb) :: rest     -> reduceComb lang comb rest
        (Scope _ scope _) :: rest ->
          case scope of
            []                    -> Just rest
            [ term ]              -> Just (term :: rest)
            _                     ->
                    if 0 == idx then Just (scope ++ rest)
                    else    Maybe.or
                                   ( reduceExpr1 0 scope        |> Maybe.map (flip (::) rest << flip (Scope 0) 0) )
                                   ( reduceExpr1 (idx + 1) rest |> Maybe.map ((::) (Scope 0 scope 0)) )
        term :: rest              -> reduceExpr1 (idx + 1) rest |> Maybe.map ((::) term)
        _                         -> Nothing
  in
    reduceExpr1 0 expr |> Maybe.withDefault expr

getTermOffsets term =
  case term of
    Comb col _        -> [col]
    Var col _         -> [col]
    Arg col _         -> [col]
    Scope col1 _ col2 -> [col1, col2]

getReductionOffsets : Lang -> Expr -> List Int
getReductionOffsets lang expr =
  let
    getReductionOffsets1 idx expr1 =
      case expr1 of
        (Comb col comb) :: rest     ->
          case Dict.get comb lang of
            Just (Decl _ _ args repl _) ->
              let
                len = List.length args
                (args1, _) = List.splitAt len rest
              in
                if len == List.length args1
                  then Just (col :: List.concatMap getTermOffsets args1)
                  else Nothing
            Nothing -> Nothing
        (Scope col1 scope col2) :: rest ->
          case scope of
            []                    -> Just [col1, col2]
            [ term ]              -> Just [col1, col2]
            _                     ->
                    if 0 == idx then Just [col1, col2]
                    else    Maybe.or
                                   ( getReductionOffsets1 0 scope )
                                   ( getReductionOffsets1 (idx + 1) rest )
        _ :: rest                 -> getReductionOffsets1 (idx + 1) rest
        _                         -> Nothing
  in
    getReductionOffsets1 0 expr |> Maybe.withDefault []
