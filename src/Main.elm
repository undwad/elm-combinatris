module Main exposing (main)

import Url exposing (Url)
import Browser exposing (UrlRequest(..))
import Browser.Events
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Set exposing (Set (..))
import Dict exposing (Dict (..))
import Result exposing (..)
import String exposing (fromInt, fromFloat, fromChar)
import Json.Decode as FromJson
import Random
import Html
import Tuple exposing (pair)
import List.Extra as List
import Result.Extra exposing (..)

import Lang.Types exposing (..)
import Lang.Lang exposing (..)
import Lang.Game exposing (..)
import Lang.Show exposing (..)
import Editor.CodeArea as CodeArea
import Editor.Data exposing (exampleGAME1, exampleSKIY, exampleBCKWY)
import Editor.Types as Editor
import Editor.Editor as Editor
import Editor.View as Editor
import Editor.Utils as Editor
import Game.Types as Game
import Game.Game as Game
import Game.View as Game
import Misc exposing (..)

-- import Debug exposing (toString, log)

map = Result.map

type Msg
  = Idle
  | EditorMsg Editor.Msg
  | GameMsg Game.Msg
  | UrlRequest UrlRequest
  | UrlChanged Url

type Scope = Editor | Game

type alias Model = NavModel
  { scope  : Scope
  , editor : Editor.Model
  , game   : Game.Model
  }

main : Program () Model Msg
main =
  Browser.application
    { init          = init
    , update        = update
    , subscriptions = subscribe
    , view          = view
    , onUrlChange   = UrlChanged
    , onUrlRequest  = UrlRequest
    }

mapEditor : Model -> (Editor.Model, Cmd Editor.Msg) -> (Model, Cmd Msg)
mapEditor model (editor, msg) =
  { model | scope = Editor, editor = editor }
  |> perform (Cmd.map EditorMsg msg)

mapGame : Model -> (Game.Model, Cmd Game.Msg) -> (Model, Cmd Msg)
mapGame model (game, msg) =
  { model | scope = Game, game = game }
  |> perform (Cmd.map GameMsg msg)

init : () -> Url -> Nav.Key -> (Model, Cmd Msg)
init _ url key =
  let
    (editor, msg) = Editor.init ()
    (game, _) = Game.init Dict.empty [] Dict.empty
  in
  mapEditor
  { navurl = url
  , navkey = key
  , scope  = Editor
  , editor = editor
  , game   = game
  }
  (editor, msg)

startGame : Model -> (Model, Cmd Msg)
startGame ({ editor } as model) =
  editor.langRes
  |> withDefault Dict.empty
  |> Game.init editor.langCode.styles editor.termWeights
  |> mapGame model

resetUrl : Model -> Cmd Msg
resetUrl { navkey, navurl } =
  { navurl | fragment = Nothing } |> Url.toString |> Nav.replaceUrl navkey

pushUrl : Model -> Url -> Cmd Msg
pushUrl { navkey } url  = url |> Url.toString |> Nav.pushUrl navkey

setLangText : String -> Cmd Msg
setLangText = goto << EditorMsg << Editor.LangArea << CodeArea.SetText

thenPerform : Cmd Msg -> (Model, Cmd Msg) -> (Model, Cmd Msg)
thenPerform msg1 (model, msg) = (model, Cmd.batch [ msg, msg1 ])

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  -- case (log "" msg, model.scope) of
  case (msg, model.scope) of
    (EditorMsg msg1, Editor) -> Editor.update msg1 model.editor |> mapEditor model
    (GameMsg   msg1, Game)   -> Game.update   msg1 model.game   |> mapGame model
    (UrlChanged url, Editor) ->
      case url.fragment of
        Just "GAME1"         -> model |> perform (setLangText exampleGAME1)  |> thenPerform (resetUrl model)
        Just "SKIY"          -> model |> perform (setLangText exampleSKIY)  |> thenPerform (resetUrl model)
        Just "BCKWY"         -> model |> perform (setLangText exampleBCKWY) |> thenPerform (resetUrl model)
        Just "NEW"           -> model |> perform (setLangText "\u{200B}")   |> thenPerform (resetUrl model)
        Just "game"          -> if Editor.isLangStyled model.editor then startGame model
                                                                    else model |> perform (resetUrl model)
        _                    -> model |> perform Cmd.none
    (UrlChanged _, Game)     -> { model | scope = Editor } |> perform (resetUrl model)
    (UrlRequest req, _) ->
      case req of
        Internal url         -> model |> perform (pushUrl model url)
        External url         -> model |> perform (Nav.load url)
    _                        -> model |> perform Cmd.none

subscribe : Model -> Sub Msg
subscribe { scope, editor, game } =
  case scope of
    Editor -> Editor.subscribe editor |> Sub.map EditorMsg
    Game   -> Game.subscribe   game   |> Sub.map GameMsg

view : Model -> Browser.Document Msg
view { scope, editor, game } =
  { title = "Combinatris in Elm"
  , body =
    [ case scope of
        Editor -> Editor.view editor |> Html.map EditorMsg
        Game   -> Game.view   game   |> Html.map GameMsg
    ]
  }
