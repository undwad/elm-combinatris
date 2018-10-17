module Lang.Parse exposing (isComb, isVar, expr, lang)

import Set exposing (Set)
import Parser exposing (..)

import Lang.Types exposing (..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

spaces : Parser ()
spaces = chompWhile (\c -> c == ' ' || c == '\t')

char : (Char -> Bool) -> (Int -> String -> a) -> Parser a
char pred ctor =
  succeed ctor
    |= getCol
    |= variable { start = pred, inner = always False, reserved = Set.empty }

isComb : Char -> Bool
isComb = Char.isUpper

isVar : Char -> Bool
isVar ch = '_' == ch || Char.isLower ch

comb : (Int -> String -> a) -> Parser a
comb = char isComb

var : (Int -> String -> a) -> Parser a
var = char isVar

arg : (Int -> String -> a) -> Parser a
arg = char isVar

loopAppend : List a -> a -> Step (List a) (List a)
loopAppend list = Loop << (++) list << List.singleton

untilBreak : List a -> Parser (Step (List a) (List a))
untilBreak list = succeed (Done list) |. oneOf [ symbol "\n", symbol "\r", end ]

untilEnd : List a -> Parser (Step (List a) (List a))
untilEnd list = succeed (Done list) |. end

untilOther : List a -> Parser (Step (List a) (List a))
untilOther list = succeed () |> map (always <| Done list)

args : Parser Args
args =
  let
    appendArg list =
      succeed (loopAppend list)
          |. spaces
          |= arg (always identity)
          |. spaces
    tryAppend list  =
      oneOf
        [ appendArg list
        , untilOther list
        ]
  in
    loop [] tryAppend

appendTerm : Expr -> Parser (Step Expr Expr)
appendTerm list =
  succeed (loopAppend list)
      |. spaces
      |= oneOf [ comb Comb, var Var ]
      |. spaces

expr : Parser Expr
expr =
  let
    appendComb list =
      oneOf
        [ appendTerm list
        , appendScope list
        , untilOther list
        ]
    appendScope list =
      succeed (loopAppend list)
        |=
          ( succeed Scope
            |= getCol
            |. symbol "("
            |. spaces
            |= loop [] appendComb
            |. spaces
            |= getCol
            |. symbol ")"
          )
        |. spaces
        |. untilOther list
    tryAppend list =
      oneOf
        [ appendTerm list
        , appendScope list
        , untilOther list
        ]
  in
    loop [] tryAppend

comment : Parser String
comment =
  getChompedString
    <| spaces
    |. oneOf
      [ succeed () |. symbol "--" |. chompWhile (not << (==) '\n')
      , succeed ()
      ]
    |. oneOf [ symbol "\n", symbol "\r", end ]

decl : Parser Decl
decl =
  succeed Decl
    |= getRow
    |= comb (always identity)
    |. spaces
    |= args
    |. spaces
    |. symbol "="
    |. spaces
    |= expr
    |= comment

lang : Parser Decls
lang =
  let
    skipWhitespace list =
      succeed (Loop list)
      |. oneOf
        [ symbol " "
        , symbol "\t"
        , symbol "\n"
        , symbol "\r"
        ]
    appendDecl list =
      succeed (loopAppend list)
          |= decl
    tryAppend list =
      oneOf
        [ appendDecl list
        , untilEnd list
        , skipWhitespace list
        ]
  in
    loop [] tryAppend
