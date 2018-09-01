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
              emptyCells2 = getEmptyCells <| sizes.width - expr.width - curr.x - curr.width
            in
              emptyCells1 ++ currCells ++ emptyCells2
          else
            getEmptyCells (sizes.width - expr.width)
        Nothing -> getEmptyCells (sizes.width - expr.width)
    getTag i  = if i < expr.applying then "strong" else "span"
    busyCells = List.concat <| List.indexedMap (showTerm << getTag) <| expr.terms
    cells     = emptyCells ++ busyCells
  in
    List.drop (List.length cells - sizes.width) cells

showTable : Model -> Html Msg
showTable model =
  div [ id "table" ]
  [ table []
    (List.indexedMap (\i -> tr [] << showRow model.curr i) <| Array.toList model.exprs)
  ]

showCaption : String -> Html Msg
showCaption txt = div [ id "caption" ] [ text txt ]

coloredText : String -> String -> Html Msg
coloredText clr txt = div [ style [ "color" => clr ] ] [ text txt ]

horzDiv : List (Html Msg) -> Html Msg
horzDiv children = div [ class "horzDiv" ] children

showInfo : Term -> Int -> Html Msg
showInfo next score =
  div [ id "info" ]
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
    button [ id "gameButton", onClick msg ] [ text txt ]

showControlButton : String -> List (Html.Attribute Msg) -> Html Msg
showControlButton txt attrs = div (class "controlButton" :: attrs) [ text txt ]

showControls : Html Msg
showControls =
  div [ id "controls" ]
  [ div [ id "arrowLeft" ]
    [ showControlButton "→" [ onMouseDown Throw, onTouchStart Throw ]
    ]
  , div []
    [ showControlButton "↑" [ onMouseDown Up,    onTouchStart Up    ]
    , showControlButton "↓" [ onMouseDown Down,  onTouchStart Down  ]
    ]
  ]

showRule : Term -> Html Msg
showRule term =
  let
    rule =
     case term of
        I ->
          [ coloredText "#3993d0" "            " ] ++
          (showTerm "span" I) ++
          [ coloredText "#3993d0" "x"
          , coloredText "#bdc3c7" " = "
          , coloredText "#3993d0" "x"
          ]
        K ->
          [ coloredText "#3993d0" "         " ] ++
          (showTerm "span" K) ++
          [ coloredText "#3993d0" "xy"
          , coloredText "#bdc3c7" " = "
          , coloredText "#3993d0" "x" ]
        S ->
          (showTerm "span" S) ++
          [ coloredText "#3993d0" "xyz"
          , coloredText "#bdc3c7" " = "
          , coloredText "#3993d0" "xz"
          , coloredText "#34495f" "("
          , coloredText "#3993d0" "yz"
          , coloredText "#34495f" ")"
          ]
        Y ->
          [ coloredText "#3993d0" "     " ] ++
          (showTerm "span" Y) ++
          [ coloredText "#3993d0" "x"
          , coloredText "#bdc3c7" " = "
          , coloredText "#3993d0" "x"
          , coloredText "#34495f" "("
          ] ++
          (showTerm "span" Y) ++
          [ coloredText "#3993d0" "x"
          , coloredText "#34495f" ")"
          ]
        _ -> [ ]
  in
    horzDiv rule

showRules : Html Msg
showRules =
  div [ id "rules" ]
  [ showRule I
  , showRule K
  , showRule S
  , showRule Y
  ]

showIntro : Html Msg
showIntro =
  div [ id "intro" ]
  [ Markdown.toHtml [] """
This game is a [**Combinatris**](http://dirk.rave.org/combinatris/how-to-play.html)
clone coded in [**Elm**](http://elm-lang.org/) language.

Unlike the original game, expressions don't reduce completely at once,
but step by step, so that you could stop infinite loops.
Scoring also is slightly different but intuitive.

Use arrow keys or screen buttons to play the game.

The game is open source on [**GitHub**](https://github.com/undwad/elm-combinatris).
"""
  ]

showOrientationHint : Html Msg
showOrientationHint =
  div [ id "orientationHint" ]
  [ img
    [ src "orientation.svg"
    , width 200
    , height 400
    ]
    []
  ]

view : Model -> Html Msg
view model =
  if Landscape == model.orient then
    div [ id "main" ]
    [ showCaption "Combinatris in Elm 5"
    , if Loaded == model.state then showIntro else showTable model
    , if Loaded /= model.state then showInfo model.next model.score else div [] []
    , showGameButton model.state
    , if Playing == model.state then showControls else showRules
    ]
  else
    showOrientationHint
