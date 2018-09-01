module Expr exposing (Term(..), Expr, init, getWidth, append, apply, update)

import List
import String
import Random
import Tuple
import Maybe exposing (Maybe, withDefault)
import Debug exposing (log)

type Term = I | K | S | Y | Scope Int Terms

type alias Terms = List Term

type alias Expr =
  { terms    : Terms
  , text     : String
  , width    : Int
  , applying : Int
  , score    : Int
  }

init : Expr
init = { terms = [], text = "", width = 0, applying = 0, score = 0 }

getWidth : Terms -> Int
getWidth expr =
  let
    width1 s =
      case s of
        Scope n cc ->
          let
            k = List.foldl ((+) << width1) 0 cc
          in
            2 + n + k - List.length cc
        _ -> 1
  in
    case expr of
      s::rest -> width1 s + getWidth rest
      _ -> 0

toString : Terms -> String
toString expr =
  let
    toString1 s =
      case s of
        Scope n cc ->
          let
            spaces = String.repeat (n - List.length cc) " "
          in
            "(" ++ spaces ++ toString cc ++ ")"
        _ -> Basics.toString s
  in
    case expr of
      s::rest -> toString1 s ++ toString rest
      []      -> ""

canApply : Terms -> Int
canApply expr =
  let
    canInsert1 s =
      case s of
        Scope n cc ->
          if n > List.length cc then True
          else List.any canInsert1 cc
        _ -> False
  in
    case expr of
      I::c2::rest             -> 2
      K::c2::c3::rest         -> 3
      S::c2::c3::c4::rest     -> 4
      Y::c2::rest             -> 2
      (Scope n cc as s)::rest -> if canInsert1 s then 0 else 1
      _                       -> 0

append : Term -> Terms -> Terms
append c terms =
  let
    insert1 x y =
      case y of
        Scope n cc ->
          let
            m = List.foldr (insert2 x) (False, []) cc
          in
            case m of
              (True, cc)  -> Just (Scope n cc)
              (False, cc) ->
                if n > List.length cc then Just (Scope n (x::cc))
                                      else Nothing
        _ -> Nothing
    insert2 x y acc =
      case acc of
        (True, cc) -> (True, y::cc)
        (False, cc) ->
          let
            m = insert1 x y
          in
            case m of
              Just s -> (True, s::cc)
              Nothing -> (False, y::cc)
  in
    case terms of
      s::rest ->
        let
          m = insert1 c s
        in
          case m of
            Just s  -> s::rest
            Nothing -> c::terms
      _ -> c::terms

apply : Terms -> Terms
apply terms =
  case terms of
      I::c2::rest         -> c2::rest
      K::c2::c3::rest     -> c2::rest
      S::c2::c3::c4::rest -> c2::c4::(Scope 2 [c3, c4])::rest
      Y::c2::rest         -> c2::(Scope 2 [Y, c2])::rest
      (Scope n cc)::rest  -> cc ++ rest
      _                   -> terms

update : (Terms -> Terms) -> Expr -> Expr
update f expr =
  let
    terms    = f expr.terms
    text     = toString terms
    width    = String.length text
    applying = canApply terms
    score    = expr.score + (max 0 <| String.length expr.text - String.length text)
  in
    { terms = terms, text = text, width = width, applying = applying, score = score }
