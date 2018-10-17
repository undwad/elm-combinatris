module Editor.View exposing (view)

import Url exposing (Url)
import Browser exposing (UrlRequest)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Result exposing (..)
import Result.Extra exposing (..)
import Dict

import Lang.Types exposing (..)
import Lang.Game exposing (..)
import Lang.Show exposing (..)
import Editor.Types exposing (..)
import Editor.Data exposing (..)
import Editor.Utils exposing (..)
import Editor.CodeArea as CodeArea
import Misc exposing (..)

map = Result.map

break = div [ style "height" "10px" ] [ br [] [] ]

horzDiv  = div
  [ style "display" "flex"
  , style "width" "100%"
  , style "display" "table"
  , disableContextMenu Idle
  ]

leftDiv  = div [ style "float" "left" ]
rightDiv = div [ style "float" "right" ]

errors : Model -> Html Msg
errors model =
  case model.langRes of
    Ok _        ->
      case model.exprRes of
        Ok _    ->  display ""
        Err err -> display (showError err)
    Err err     -> display (showError err)

slotButton : Model -> String -> Html Msg
slotButton model slot =
  button
  [ onClick <| ChangeSlot slot
  , class
    <| (if slot == model.slot then "bttn-simple" else "bttn-bordered")
    ++ " bttn-md bttn-primary"
  , style "marginRight" "10px"
  , style "marginBottom" "10px"
  ]
  [ text slot ]

prependButton : Model -> Html Msg
prependButton model =
  button
  [ onClick RandomTerm
  , class "bttn-bordered bttn-md bttn-success"
  , disabled (not << isLangStyled <| model)
  , style "marginBottom" "10px"
  ]
  (  model.nextTerm
  |> Maybe.map (CodeArea.viewString model.langCode << showTerm)
  |> Maybe.withDefault [ text "Random" ]
  |> List.map (Html.map <| always Idle)
  )

reduceButton : Model -> Html Msg
reduceButton model =
  let
    left = map (canReduceLeft model.exprCode.strong) model.exprRes |> withDefault False
  in
    button
      [ onClick <| if left then ReduceExpr Left else ReduceExpr Normal
      , class ("bttn-simple bttn-md "
      ++ if left then "bttn-success" else "bttn-primary")
      , disabled (List.length model.exprCode.strong <= 0)
      , style "marginBottom" "10px"
      ]
      [ text <| "Reduce" ]

playButton : Model -> Html Msg
playButton model = a [ href "/game" ] [ text "Play Combinatris" ]

view : Model -> Html Msg
view model =
  div [ style "font-family" "monospace" ] <|
    [ h2 [] [ text "Combinatris in Elm" ], break
    , horzDiv <| List.map (slotButton model) slots, break
    , CodeArea.view model.langCode |> Html.map LangArea, break
    , CodeArea.view model.exprCode |> Html.map ExprArea |> when (isLangReady model), break
    , errors model, break
    , horzDiv [ leftDiv [ prependButton model ], rightDiv [ reduceButton model ] ], break
    ]
    ++ [ playButton model |> when (isLangStyled model) ]

display : String -> Html msg
display = String.lines >> List.map text >> List.intersperse (br [] []) >> div []
