module Game.View exposing (viewString, view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Array exposing (Array)
import String exposing (fromInt, fromFloat)
import Json.Decode as Decode
import Markdown

import Lang.Types exposing (..)
import Lang.Game exposing (..)
import Lang.Show exposing (..)
import Editor.CodeArea as CodeArea
import Game.Types exposing(..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

fontSize : Model -> String
fontSize model = "calc(100vw / " ++ fromFloat (toFloat model.width * 1.1) ++ ")"

viewString : Theme -> String -> List (Html Msg)
viewString theme = CodeArea.viewString theme >> (List.map <| Html.map <| always Idle)

padRight : Int -> List (Html Msg) -> List (Html Msg)
padRight n html = html ++ List.repeat (n - List.length html) (text " ")

showRow : Model -> Int -> Row -> Html Msg
showRow model y row =
  let
    makeSpaces n = String.repeat n "_" |> viewString model.theme
    spaces =
      case model.curr of
        Just curr ->
          if y == curr.y then
            let
              spaces1 = makeSpaces curr.x
              spaces2 = makeSpaces (model.width - row.width - curr.x - curr.width)
            in
              spaces1 ++ curr.html ++ spaces2
          else
            makeSpaces (model.width - row.width)
        Nothing -> makeSpaces (model.width - row.width)
    html = spaces ++ row.html
  in
    html
    |> List.drop (List.length html - model.width)
    |> List.map (td [] << List.singleton )
    |> tr []

showTable : Model -> Html Msg
showTable model =
  div [ class "centered" ]
  [
    table
    [ class "centered-table"
    , style "font-size" (fontSize model)
    , style "white-space" "pre"
    ]
    (Array.toList model.rows |> List.indexedMap (showRow model))
  ]

coloredText : String -> String -> Html Msg
coloredText clr txt = div [ style "color" clr ] [ text txt ]

showGameButton : State -> Html Msg
showGameButton state =
  let
    ( txt, msg, bttn ) =
      case state of
        Playing  -> ("Pause",   Pause,  "bttn-danger")
        Paused   -> ("Resume",  Resume, "bttn-success")
        Finished -> ("Restart", Start,  "bttn-success")
  in
    button
    [ class ("bttn-simple bttn-md " ++ bttn)
    , style "margin" "0 auto 0"
    , style "position" "fixed"
    , style "left" "10px"
    , style "bottom" "10px"
    , onClick msg
    , disableContextMenu Idle
    , id txt
    ]
    [ text txt ]

showControlButton : String -> Msg -> Html Msg
showControlButton txt msg =
  button
  [ class "bttn-bordered bttn-lg bttn-primary"
  , onClick msg
  , style "width" "1.5cm"
  , style "height" "1.5cm"
  , style "font-size" "1.0cm"
  , disableContextMenu Idle
  , id txt
  ]
  [ text txt ]

showControls : Model -> Html Msg
showControls model =
  table
  [ style "display" "block"
  , style "margin" "0 auto 0"
  , style "position" "fixed"
  , style "right" "10px"
  , style "bottom" "10px"
  , class "no-user-select"
  ]
  [ tr []
    [ td [] []
    , td [ style "padding" "10px 0" ] [ showControlButton "⇧" Up ]
    ]
  , tr []
    [ td [ style "padding" "0 10px" ] [ showControlButton "⇨" Throw ]
    , td [] [ showControlButton "⇩" Down ]
    ]
  ]

showInfo : Model -> Html Msg
showInfo model =
  let
      pad = model.width - 7
  in
    div [ class "centered" ]
    [
      table
      [ class "centered-table"
      , style "font-size" (fontSize model)
      , style "white-space" "pre"
      ]
      [ tr []
        [ td [] [ coloredText "#bdc3c7" "Now:   " ]
        , td [] (Maybe.map .info model.curr |> Maybe.withDefault [] |> padRight pad)
        ]
      , tr []
        [ td [] [ coloredText "#bdc3c7" "Next:  " ]
        , td [] (Maybe.map .info model.next |> Maybe.withDefault [] |> padRight pad)
        ]
      , tr []
        [ td [] [ coloredText "#bdc3c7" "Score: " ]
        , td [] [ coloredText "#3993d0" (fromInt model.score |> String.padRight pad ' ') ]
        ]
      , tr [ class "hint" ]
        [ td [] [ coloredText "#bdc3c7" "Hint: " ]
        , td [] [ coloredText "#85144b" ("Try landscape mode!" |> String.padRight pad ' ') ]
        ]
      ]
    ]

break = div [ style "height" "10px" ] [ br [] [] ]

horzDiv = div
  [ style "display" "flex"
  , style "width" "100%"
  , style "display" "table"
  , style "white-space" "pre"
  ]

leftDiv   = div [ style "float" "left" ]
rightDiv  = div [ style "float" "right" ]
centerDiv = div [ style "float" "center" ]

pairDiv left right = horzDiv [ leftDiv left, leftDiv right ]

view : Model -> Html Msg
view model =
  div [ style "font-family" "monospace" ] <|
    [ break
    , horzDiv [ showTable model ], break
    , horzDiv [ showInfo model ], break
    , showGameButton model.state
    , if Playing == model.state then showControls model else div [] []
    , CodeArea.view model.theme |> Html.map (always Idle)
    ]

display : String -> Html msg
display = String.lines >> List.map text >> List.intersperse (br [] []) >> div []
