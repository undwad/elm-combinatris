module Lang.Types exposing (..)

import Parser exposing (DeadEnd)
import Dict exposing (Dict)

type alias Comb = String
type alias Arg  = String
type alias Var  = String
type alias Args = List Arg
type alias Expr = List Term

type Term
  = Comb  Int Comb
  | Var   Int Var
  | Arg   Int Arg
  | Scope Int Expr Int

type Decl = Decl Int Comb Args Expr String

type alias Decls = List Decl
type alias Lang = Dict Comb Decl

type alias SyntaxError = List DeadEnd

type SemanticsError
  = Impossible
  | DuplicateCombinator Comb
  | UndefinedCombinator Comb
  | DuplicateArgument Arg
  | UndefinedVariable Var

type Error
  = SyntaxError SyntaxError
  | SemanticsError Int SemanticsError
