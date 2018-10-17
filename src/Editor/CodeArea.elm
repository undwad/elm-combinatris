module Editor.CodeArea exposing
  ( Msg(..)
  , Scroll
  , Model
  , defaultStyles
  , init
  , view
  , update
  , viewCode
  , viewString
  )

import Char
import Parser exposing (..)
import Set exposing (Set)
import Tuple exposing (pair, first, second)
import Dict exposing (Dict)
import Maybe exposing (Maybe, withDefault)
import String exposing (fromInt, fromFloat, fromChar)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Html.Lazy exposing (..)
import Json.Decode as Json
import Markdown

import Lang.Parse exposing (isComb, isVar)
import Editor.TextStyle exposing (..)

-- import Debug exposing (toString, log)

lazy = Html.Lazy.lazy

type Msg
  = SetText String
  | OnScroll Scroll

type alias Scroll =
  { top  : Int
  , left : Int
  }

type alias Model =
  { class       : String
  , code        : String
  , scroll      : Scroll
  , numlines    : Bool
  , maxline     : Int
  , highlight   : Int
  , strong      : List Int
  , styles      : Styles
  , opacity     : Bool
  , placeholder : String
  }

defaultStyles : Styles
defaultStyles =
  Dict.fromList
  [ pair "highlight"  <| backgroundColor      (Hex "#ffecec")
  , pair "comment"    <| italic <| textColor  (Hex "#969896")
  , pair "eq"         <| textColor            (Hex "#d73a49")
  , pair "scope"      <| textColor            (Hex "#0086b3")
  , pair "comb"       <| textColor            (Hex "#63a35c")
  , pair "var"        <| textColor            (Hex "#795da3")
  ]

init : () -> Model
init _ =
  { class       = ""
  , scroll      = Scroll 0 0
  , code        = ""
  , numlines    = True
  , maxline     = 10
  , highlight   = -1
  , strong      = []
  , styles      = defaultStyles
  , opacity     = False
  , placeholder = ""
  }

viewString : Model -> String -> List (Html Msg)
viewString model str  =
  let
    commentStart = String.indexes "--" str |> List.head |> Maybe.withDefault (String.length str)
    depthToOpacity depth =
      case depth of
        0 -> "1.0"
        1 -> "0.5"
        2 -> "0.4"
        3 -> "0.3"
        _ -> "0.2"
    charToStyle ch =
      case ch of
        '=' -> "eq"
        '(' -> "scope"
        ')' -> "scope"
        _   ->
          if Dict.member (fromChar ch) model.styles then fromChar ch
          else if isComb ch                                then "comb"
          else if isVar  ch                                then "var"
          else ""
    viewChar depth idx ch =
      let
        style1 = if idx < commentStart then charToStyle ch else "comment"
        s = String.fromList [ch]
      in
        if String.isEmpty style1 then text s
        else
          (node <| if List.member (idx + 1) model.strong then "strong" else "span")
          [ classList [ ("codearea-" ++ style1, True) ]
          , style "opacity" (if model.opacity then depthToOpacity depth else "1.0")
          ]
          [ text s ]
    viewHead depth idx chars =
      case chars of
        ch :: rest ->
          case ch of
            '(' -> viewChar (depth    ) idx ch :: viewHead (depth + 1) (idx + 1) rest
            ')' -> viewChar (depth - 1) idx ch :: viewHead (depth - 1) (idx + 1) rest
            _   -> viewChar (depth    ) idx ch :: viewHead (depth    ) (idx + 1) rest
        []         -> []
  in
    str |> String.toList |> viewHead 0 0

viewCode : Model -> Html Msg
viewCode model =
  let
    viewLine index str =
      div
      [ classList
        [ ( "codearea-line", model.numlines )
        , ( "codearea-highlight", model.highlight >= 0 && model.highlight == 1 + index )
        ]
      , attribute "data-codearea-lc" (fromInt (1 + index))
      ]
      (viewString model str)
  in
    model.code
    |> String.lines
    |> List.indexedMap viewLine
    |> code []
    |> List.singleton
    |> pre [ class "codearea" ]

viewFakeTextArea : Model -> Html Msg
viewFakeTextArea model =
  textarea
  [ value model.code
  , classList
    [ ( "textarea", True )
    , ( "textarea-lc", model.numlines )
    , ( model.class, True )
    ]
  , onInput (SetText)
  , spellcheck False
  , on "scroll" (Json.map2 Scroll (Json.at [ "target", "scrollTop" ] Json.int) (Json.at [ "target", "scrollLeft" ] Json.int) |> Json.map OnScroll)
  ]
  []

viewCodeArea : Model -> Html Msg
viewCodeArea model =
  div
  [ classList
    [ ( "container", True )
    , ( "codearea", True )
    , ( model.class, True )
    , ( model.class ++ "-view", True )
    ]
  ]
  [ div
    [ class "view-container"
    , style "transform" ("translate(" ++ fromInt -model.scroll.left ++ "px, " ++ fromInt -model.scroll.top ++ "px)")
    , style "will-change" "transform"
    ]
    [ lazy viewCode model ]
  , viewFakeTextArea model
  ]

viewPlaceholderArea : Model -> Html Msg
viewPlaceholderArea model = Markdown.toHtml [] model.placeholder

view : Model -> Html Msg
view model =
  div []
  [ Html.node "style" []
    [ text
      <| ".textarea {caret-color: #24292e;}"
      ++ ".textarea::selection { background-color: rgba(0,0,0,0.2); }"
    ]
  , model.styles
    |> Dict.toList
    |> List.map (Tuple.mapFirst <| (++) ".codearea-")
    |> toCss
    |> text
    |> List.singleton
    |> Html.node "style" []
  , if String.isEmpty model.code && not (String.isEmpty model.placeholder)
      then viewPlaceholderArea model
      else viewCodeArea model
  ]

cutLines : Int -> String -> String
cutLines max = String.lines >> List.take max >> String.join "\n"

update : Msg -> Model -> Model
update msg model =
  case msg of
    SetText code    -> { model | code = cutLines model.maxline code }
    OnScroll scroll -> { model | scroll = scroll }
