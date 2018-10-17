module Editor.Utils exposing (..)

import Result exposing (..)
import Result.Extra exposing (..)
import Dict

import Lang.Types exposing (..)
import Lang.Lang exposing (..)
import Lang.Game exposing (..)
import Lang.Show exposing (..)
import Editor.Types exposing (..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

isLangReady : Model -> Bool
isLangReady model = model.langRes |> map (not << Dict.isEmpty) |> withDefault False

isLangStyled : Model -> Bool
isLangStyled model = List.length model.termWeights > 0
