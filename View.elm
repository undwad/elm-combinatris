module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Array exposing (Array)
import Json.Decode as Json
import Markdown

import Common exposing(..)
import Expr exposing (Expr, Term(..))

(=>) : a -> b -> (a, b)
(=>) = (,)

onTouchStart : Msg -> Html.Attribute Msg
onTouchStart msg = onWithOptions "touchstart" { stopPropagation = True, preventDefault = True } (Json.succeed msg)

onTouchEnd : Msg -> Html.Attribute Msg
onTouchEnd msg = onWithOptions "touchend" { stopPropagation = True, preventDefault = True } (Json.succeed msg)

showTerm : String -> Term -> List (Html Msg)
showTerm tag term =
  let
    show1 tag color opacity ch =
      td []
      [ (node tag)
        [ style [ "color" => color, "opacity" => opacity ] ]
        [ text ch ]
      ]
    show2 tag depth term =
      let
        opacity =
          case depth of
            0 -> "1.0"
            1 -> "0.5"
            2 -> "0.4"
            3 -> "0.3"
            _ -> "0.2"
      in
        case term of
          I -> [ show1 tag "blue"  opacity "I" ]
          K -> [ show1 tag "brown" opacity "K" ]
          S -> [ show1 tag "green" opacity "S" ]
          Y -> [ show1 tag "red"   opacity "Y" ]
          Scope n cc ->
            let
              spaces  = List.repeat (n - List.length cc) (show1 "span" "black" opacity space)
              terms  = List.concat <| List.map (show2 "span" <| depth + 1) cc

            in
              [ show1 tag "black" opacity "(" ] ++ spaces ++ terms ++ [ show1 tag "black" opacity ")" ]
  in
    show2 tag 0 term

showRow : Maybe Curr -> Int -> Expr -> List (Html Msg)
showRow mbcurr y expr =
  let
    getEmptyCells n = List.repeat n (td [] [ text space ])
    emptyCells =
      case mbcurr of
        Just curr ->
          if y == curr.y then
            let
              currCells   = showTerm "span" curr.term
              emptyCells1 = getEmptyCells curr.x
              emptyCells2 = getEmptyCells <| Common.width - expr.width - curr.x - List.length currCells
            in
              emptyCells1 ++ currCells ++ emptyCells2
          else
            getEmptyCells (Common.width - expr.width)
        Nothing -> getEmptyCells (Common.width - expr.width)
    getTag i  = if i < expr.applying then "strong" else "span"
    busyCells = List.concat <| List.indexedMap (showTerm << getTag) <| expr.terms
    cells     = emptyCells ++ busyCells
  in
    List.drop (List.length cells - Common.width) cells

showTable : Model -> Html Msg
showTable model =
  div
  [ style
    [ "font-family" => "monospace"
    , "font-size"   => "6vh"
    , "font-weight" => "300"
    , "white-space" => "pre"
    , "position"    => "fixed"
    , "left"        => "50%"
    , "top"         => "40%"
    , "transform"   => "translate(-50%, -50%)"
    , "margin"      => "0 auto"
    ]
  ]
  [ table []
    (List.indexedMap (\i -> tr [] << showRow model.curr i) <| Array.toList model.exprs)
  ]

showCaption : String -> Html Msg
showCaption txt =
  div
  [ style
    [ "font-family" => "Helvetica, Arial, sans-serif"
    , "font-size"   => "10vh"
    , "font-weight" => "300"
    , "position"    => "fixed"
    , "left"        => "50%"
    , "top"         => "10px"
    , "color"       => "#3993d0"
    , "line-height" => "1"
    , "text-align"  => "center"
    , "transform"   => "translate(-50%, 0%)"
    , "margin"      => "0 auto"
    ]
  ]
  [ text txt ]

coloredText : String -> String -> Html Msg
coloredText clr txt = div [ style [ "color" => clr ] ] [ text txt ]

horzDiv : List (Html Msg) -> Html Msg
horzDiv children =
  div
  [ style
    [ "display" => "flex"
    , "margin"  => "10px 0 0 0"
    ]
  ] children

showInfo : Term -> Int -> Html Msg
showInfo next score =
  div
  [ style
    [ "font-family" => "Helvetica, Arial, sans-serif"
    , "font-size"   => "10vh"
    , "font-weight" => "300"
    , "position"    => "fixed"
    , "margin"      => "10px 0 0"
    , "left"        => "10px"
    , "bottom"      => "10px"
    , "line-height" => "1"
    , "text-align"  => "center"
    , "white-space" => "pre"
    ]
  ]
  [ horzDiv <| (coloredText "#bdc3c7" "Next: ")::(showTerm "span" next)
  , horzDiv [ coloredText "#bdc3c7" "Score: ", coloredText "#3993d0" <| toString score ]
  ]

showGameButton : State -> Html Msg
showGameButton state =
  let
    ( txt, msg ) =
      case state of
        Loaded   -> ("Start",   Start)
        Finished -> ("Restart", Start)
        Playing  -> ("Pause",   Pause)
        Paused   -> ("Resume",  Resume)
  in
    button
    [ style
      [ "font-family" => "Helvetica, Arial, sans-serif"
      , "font-size"   => "7vh"
      , "font-weight" => "300"
      , "background"  => "#34495f"
      , "border"      => "0"
      , "color"       => "#fff"
      , "cursor"      => "pointer"
      , "display"     => "block"
      , "outline"     => "none"
      , "padding"     => "0"
      , "width"       => "35vh"
      , "height"      => "15vh"
      , "line-height" => "15vh"
      , "position"    => "fixed"
      , "left"        => "50%"
      , "bottom"      => "10px"
      , "transform"   => "translate(-50%, 0%)"
      , "margin"      => "0 auto 0"
      ]
      , onClick msg
    ]
    [ text txt ]

showControlButton : String -> List (Html.Attribute Msg) -> Html Msg
showControlButton txt attrs =
  div
    (style
      [ "background"          => "#34495f"
      , "border"              => "0"
      , "color"               => "#fff"
      , "cursor"              => "pointer"
      , "text-align"          => "center"
      , "-webkit-user-select" => "none"
      , "font-family"         => "Helvetica, Arial, sans-serif"
      , "font-size"           => "10vh"
      , "font-weight"         => "300"
      , "width"               => "15vh"
      , "height"              => "15vh"
      , "line-height"         => "15vh"
      , "margin"              => "10px 0 0 0"
      , "outline"             => "none"
      , "padding"             => "0"
      ]
      :: attrs
    )
    [ text txt ]

showControls : Html Msg
showControls =
  div
  [ style
    [ "margin"   => "0 auto 0"
    , "position" => "fixed"
    , "right"    => "10px"
    , "bottom"   => "10px"
    , "display"  => "flex"
    ]
  ]
  [ div
    [ style
        [ "margin" => "25% 10px 0 0"
        ]
    ]
    [ showControlButton "→" [ onMouseDown Throw, onTouchStart Throw ]
    ]
  , div
    []
    [ showControlButton "↑" [ onMouseDown Up,    onTouchStart Up    ]
    , showControlButton "↓" [ onMouseDown Down,  onTouchStart Down  ]
    ]
  ]

showIntro : Html Msg
showIntro =
  div
    [ style
      [ "background"  => "rgba(236, 240, 241, 0.85)"
      , "color"       => "#34495f"
      , "font-family" => "Helvetica, Arial, sans-serif"
      , "font-size"   => "5vh"
      , "font-weight" => "300"
      , "position"    => "fixed"
      , "left"        => "50%"
      , "top"         => "45%"
      , "width"       => "90%"
      , "height"      => "55%"
      , "transform"   => "translate(-50%, -50%)"
      , "margin"      => "0 auto"
      ]
    ]
    [ Markdown.toHtml [] """
elm-flatris is a [**Flatris**](https://github.com/skidding/flatris)
clone coded in [**Elm**](http://elm-lang.org/) language.

Inspired by the classic [**Tetris**](http://en.wikipedia.org/wiki/Tetris)
game, the game can be played with a keyboard using the arrow keys,
and on mobile devices using the buttons below.

elm-flatris is open source on
[**GitHub**](https://github.com/w0rm/elm-flatris).
"""
    ]

showOrientationHint : Html Msg
showOrientationHint =
  div
  [ style
    [ "position"    => "fixed"
    , "left"        => "50%"
    , "top"         => "50%"
    , "transform"   => "translate(-50%, -50%)"
    , "margin"      => "0 auto"
    ]
  ]
  [ img
    [ src "orientation.svg"
    , Html.Attributes.width 200
    , Html.Attributes.height 400
    ]
    []
  ]

view : Model -> Html Msg
view model =
  if Landscape == model.orient then
    div
    [ style
      [ "min-height" => "100%"
      ]
    ]
    [ showCaption "Combinatris in Elm"
    , if Loaded == model.state then showIntro else showTable model
    , if Loaded /= model.state then showInfo model.next model.score else div [] []
    , showGameButton model.state
    , if Playing == model.state then showControls else div [] []
    ]
  else
    showOrientationHint
