module Lang.Show exposing (showTerm, showExpr, showError)

import Parser exposing (..)
import Dict
import String exposing (fromInt, fromFloat, fromChar)
import Lang.Types exposing (..)

-- import Debug exposing (toString)

showChars : (a -> String) -> String -> (List a) -> String
showChars show str list =
  case list of
    head :: rest -> showChars show (str ++ show head) rest
    []           -> str

showTerm : Term -> String
showTerm term =
  case term of
    Comb  _ ch     -> ch
    Var   _ ch     -> ch
    Arg   _ ch     -> ch
    Scope _ expr _ -> "(" ++ showExpr expr ++ ")"

showExpr : Expr -> String
showExpr = showChars showTerm ""

showEscapeSymbols : String -> String
showEscapeSymbols = String.replace "\n" "\\n" >> String.replace "\r" "\\r"

showProblem : Problem -> String
showProblem problem =
  case problem of
    Expecting str         -> "Expecting '" ++ str ++ "'"
    ExpectingInt          -> "Expecting integer"
    ExpectingHex          -> "Expecting hex"
    ExpectingOctal        -> "Expecting octal"
    ExpectingBinary       -> "Expecting binary"
    ExpectingFloat        -> "Expecting float"
    ExpectingNumber       -> "Expecting number"
    ExpectingVariable     -> "Expecting variable"
    ExpectingSymbol str   -> "Expecting symbol '" ++ showEscapeSymbols str ++ "'"
    ExpectingKeyword str  -> "Expecting keyword '" ++ str ++ "'"
    ExpectingEnd          -> "Expecting end"
    UnexpectedChar        -> "Unexpected char"
    Problem str           -> "Problem '" ++ str ++ "'"
    BadRepeat             -> "Bad repeat"

showDeadEnd : DeadEnd -> String
showDeadEnd de = showProblem de.problem

showSemanticsError : SemanticsError -> String
showSemanticsError err =
  case err of
    Impossible              -> "Impossible"
    DuplicateCombinator ch  -> "Duplicate combinator '" ++ ch ++ "'"
    UndefinedCombinator ch  -> "Undefined combinator '" ++ ch ++ "'"
    DuplicateArgument ch    -> "Duplicate argument '" ++ ch ++ "'"
    UndefinedVariable ch    -> "Undefined variable '" ++ ch ++ "'"

showError : Error -> String
showError err =
  case err of
    SyntaxError perr -> perr |> List.map showDeadEnd |> String.join "\n"
    SemanticsError _ verr -> showSemanticsError verr
