module Editor.TextStyle exposing (..)

import Dict exposing (Dict)
import String exposing (..)

type Color
  = DefaultColor
  | Hex String
  | Rgb Int Int Int
  | Rgba Int Int Int Float

type alias Style =
  { isBold      : Bool
  , isItalic    : Bool
  , isUnderline : Bool
  , text        : Color
  , background  : Color
  }

type alias Styles = Dict String Style

noEmphasis : Color -> Color -> Style
noEmphasis text background =
  { isBold      = False
  , isItalic    = False
  , isUnderline = False
  , text        = text
  , background  = background
  }

textColor : Color -> Style
textColor text =
  { isBold      = False
  , isItalic    = False
  , isUnderline = False
  , text        = text
  , background  = DefaultColor
  }

backgroundColor : Color -> Style
backgroundColor background =
  { isBold      = False
  , isItalic    = False
  , isUnderline = False
  , text        = DefaultColor
  , background  = background
  }

italic : Style -> Style
italic style = { style | isItalic = True }

bold : Style -> Style
bold style = { style | isBold = True }

toCss : List ( String, Style ) -> String
toCss = List.map toCssClass >> concat

toCssClass : ( String, Style ) -> String
toCssClass ( selectors, style ) =
  if isEmpty selectors then ""
  else selectors ++ " {" ++ styleToCss style ++ "}"

styleToCss : Style -> String
styleToCss { isBold, isItalic, isUnderline, text, background } =
  concat
  [ if isBold then "font-weight: bold;" else ""
  , if isItalic then "font-style: italic;" else ""
  , if isUnderline then "text-decoration: underline;" else ""
  , colorToCss "color: " text
  , colorToCss "background: " background
  ]

colorToCss : String -> Color -> String
colorToCss property color =
  case color of
    DefaultColor -> ""
    Hex hex -> property ++ hex ++ ";"
    Rgb r g b -> property ++ "rgb(" ++ fromInt r ++ ", " ++ fromInt g ++ "," ++ fromInt b ++ ");"
    Rgba r g b a -> property ++ "rgba(" ++ fromInt r ++ ", " ++ fromInt g ++ "," ++ fromInt b ++ ", " ++ fromFloat a ++ ");"
