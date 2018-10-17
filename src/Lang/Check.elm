module Lang.Check exposing (checkExpr, buildLang, checkLang)

import Set exposing (Set)
import Dict exposing (Dict)
import List.Extra as List
import Result exposing (..)
import Result.Extra exposing (..)

import Lang.Types exposing (..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

findFirstDuplicateBy : (a -> comparable) -> List a -> Maybe a
findFirstDuplicateBy f list =
  let
    count x         = List.count ((==) x << f) list
    pairWithCount x = (x, count <| f x)
    isDuplicate     = (<) 1 << Tuple.second
  in
    List.reverse list
    |> List.uniqueBy f
    |> List.map pairWithCount
    |> List.filter isDuplicate
    |> List.head
    |> Maybe.map Tuple.first

checkArgs : Args -> Result SemanticsError Args
checkArgs args =
  case findFirstDuplicateBy identity args of
    Nothing -> Ok args
    Just ch -> Err (DuplicateArgument ch)

checkTerm : Set Comb -> Set Arg -> (Var -> Bool) -> Term -> Result SemanticsError Term
checkTerm combs args checkVar term =
  case term of
    Comb col comb           ->
      if Set.member comb combs
                          then Ok (Comb col comb)
                          else Err (UndefinedCombinator comb)
    Var col var             ->
      if Set.member var args
                          then Ok (Arg col var)
      else if checkVar var
                          then Ok (Var col var)
                          else Err (UndefinedVariable var)
    Arg col arg             -> Ok (Arg col arg)
    Scope col1 expr col2    ->
              List.foldr ((::) << checkTerm combs args checkVar) [] expr
              |> combine
              |> map (flip (Scope col1) col2)

checkExpr : Set Comb -> Set Arg -> (Var -> Bool) -> Expr -> Result SemanticsError Expr
checkExpr combs args checkVar expr =
  case checkTerm combs args checkVar (Scope 0 expr 0) of
    Err err              -> Err err
    Ok (Scope _ expr1 _) -> Ok expr1
    _                    -> Err Impossible

checkDecl : Set Comb -> Decl -> Result Error Decl
checkDecl combs decl =
  case decl of
    Decl row comb args expr comment ->
      checkArgs args
      |> map (always expr)
      |> andThen ( checkExpr combs (Set.fromList args) (always False) )
      |> map (flip (Decl row comb args) comment)
      |> mapError (SemanticsError row)

getComb : Decl -> Comb
getComb (Decl _ comb _ _ _) = comb

toPair : Decl -> (Comb, Decl)
toPair decl = (getComb decl, decl)

buildLang : Decls -> Result Error Lang
buildLang decls =
  case findFirstDuplicateBy getComb decls of
    Nothing                    -> Ok  <| Dict.fromList <| List.map toPair decls
    Just (Decl row comb _ _ _) -> Err <| SemanticsError row <| DuplicateCombinator comb

checkLang : Lang -> Result Error Lang
checkLang lang =
  let
    combs = Set.fromList <| Dict.keys lang
  in
    Dict.values lang
    |> List.foldr ((::) << checkDecl combs) []
    |> combine
    |> map (Dict.fromList << List.map toPair)
