module Editor.Editor exposing (init, update, subscribe)

import Url exposing (Url)
import Browser exposing (UrlRequest(..))
import Browser.Events
import Browser.Navigation as Navigation
import Set exposing (Set (..))
import Dict exposing (Dict (..))
import Result exposing (..)
import String exposing (fromInt, fromFloat, fromChar)
import Json.Decode as FromJson
import Random
import Html exposing (div)
import Html.Attributes exposing (style)
import Tuple exposing (pair)
import List.Extra as List
import Result.Extra exposing (..)

import Lang.Types exposing (..)
import Lang.Lang exposing (..)
import Lang.Game exposing (..)
import Lang.Show exposing (..)
import Editor.Port exposing (..)
import Editor.Types exposing (..)
import Editor.Data exposing (..)
import Editor.View exposing (..)
import Editor.CodeArea as CodeArea
import Editor.Utils exposing (..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

map = Result.map

init : () -> (Model, Cmd Msg)
init _ =
  let
    model = CodeArea.init ()
  in
    { langCode    =
      { model
      | class       = "langarea"
      , numlines    = True
      , maxline     = 10
      , placeholder = placeholder
      }
    , exprCode    =
      { model
      | class       = "exprarea"
      , numlines    = False
      , maxline     = 1
      , opacity     = True
      }
    , langRes     = Ok emptyLang
    , exprRes     = Ok []
    , termWeights = []
    , nextTerm    = Nothing
    , slot        = "1"
    }
    |> perform readSlotNum

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
    getErrorLine res =
      case res of
        Err (SemanticsError row _)  -> row
        Err (SyntaxError (de :: _)) -> de.row
        _                           -> -1
    setStyles styles m     = { m | styles = styles }
    setOpacity opacity m   = { m | opacity = opacity }
    highlightError res m   = { m | highlight = getErrorLine res }
    langAreaUpdate1 msg1 m = { m | langCode = CodeArea.update msg1 m.langCode }
    exprAreaUpdate1 msg1 m = { m | exprCode = CodeArea.update msg1 m.exprCode }
    buildLang1 code m      = { m | langRes  = makeLang code, nextTerm = Nothing }
    highlightLang1 m       = { m | langCode = highlightError m.langRes m.langCode }
    buildWeights1 m        = { m | termWeights = map getWeights m.langRes |> withDefault [] }
    buildExpr1 code m      = { m | exprRes = m.langRes |> andThen (\lang -> makeExpr lang (always True) code) }
    highlightExpr1 m       = { m | exprCode = highlightError m.exprRes m.exprCode }
    showExpr1 m            = { m | exprCode = CodeArea.update (CodeArea.SetText <| showExpr <| withDefault [] m.exprRes) m.exprCode }
    randomTerm1            = Random.generate PrependNext <| Random.weighted (0.0, Scope 0 [] 0) model.termWeights
    joinStyles1 m =
      let
        styles1 = m.langRes |> map getStyles |> withDefault Dict.empty
        styles  = Dict.union styles1 CodeArea.defaultStyles
      in
        { m
        | langCode = setStyles styles m.langCode
        , exprCode =
          m.exprCode
          |> setStyles styles
          |> (setOpacity <| not << Dict.isEmpty <| styles1)
        }
    getReductionOffsets1 m =
      let
        exprCode = m.exprCode
      in
        { m
        | exprCode =
          { exprCode
          | strong =
              if withDefault True <| map canInsertTerm m.exprRes then []
              else withDefault [] <| map2 getReductionOffsets m.langRes m.exprRes
          }
        }
    reduceExpr1 mode m =
      { m
      | exprRes =
          case mode of
            Normal -> map2 reduceExpr m.langRes m.exprRes
            Left   -> map2 reduceLeft m.langRes m.exprRes
      }
    prependNext1 next m =
      { m
      | exprRes =
          case m.nextTerm of
            Just term -> map2 (prependTerm term) m.langRes m.exprRes
            Nothing  -> m.exprRes
      , nextTerm = Just next
      }
    updateLang1 code m =
      m
      |> buildLang1 code
      |> joinStyles1
      |> highlightLang1
      |> buildWeights1
      |> buildExpr1 ""
      |> showExpr1
      |> updateExpr1
    updateExpr1 m =
      m
      |> buildExpr1 m.exprCode.code
      |> highlightExpr1
      |> getReductionOffsets1
    changeSlot1 slot m =
      { m
      | slot = if List.member slot slots then slot else m.slot
      }
  in
    -- case (log "" msg) of
    case msg of
      Idle       -> model |> perform Cmd.none
      LangArea msg1 ->
        case msg1 of
          CodeArea.SetText code ->
            model
            |> langAreaUpdate1 msg1
            |> updateLang1 code
            |> (perform << Cmd.batch)
               [ writeSlot model.slot code
               , goto RandomTerm
               ]
          _ ->
            model
            |> langAreaUpdate1 msg1
            |> perform Cmd.none
      ExprArea msg1 ->
        case msg1 of
          CodeArea.SetText code ->
            model
            |> exprAreaUpdate1 msg1
            |> updateExpr1
            |> perform Cmd.none
          _ ->
            model
            |> exprAreaUpdate1 msg1
            |> perform Cmd.none
      ReduceExpr mode ->
        model
        |> reduceExpr1 mode
        |> showExpr1
        |> updateExpr1
        |> perform Cmd.none
      PrependNext term ->
        model
        |> prependNext1 term
        |> showExpr1
        |> updateExpr1
        |> perform Cmd.none
      RandomTerm ->
        model
        |> perform randomTerm1
      ReadCache ->
        model
        |> perform (readSlot model.slot)
      ChangeSlot slot ->
        model
        |> changeSlot1 slot
        |> (perform << Cmd.batch)
           [ writeSlotNum slot, goto ReadCache]

subscribe : Model -> Sub Msg
subscribe model =
  Sub.batch
  [ readSlotNumCallback ChangeSlot
  , readSlotCallback (LangArea << CodeArea.SetText)
  ]
