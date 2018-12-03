module Game.Types exposing (..)

import Array exposing (Array)
import Time exposing (Posix)
import Html exposing (Html)
import Keyboard exposing (Key)
import Keyboard.Arrows exposing (Arrows)

import Lang.Types exposing (..)
import Lang.Game exposing (Weights)
import Editor.CodeArea as CodeArea

type alias Theme = CodeArea.Model

type State = Playing | Paused | Finished

type Orientation = Portrait | Landscape

type alias Curr =
  { term  : Term
  , html  : List (Html Msg)
  , width : Int
  , x     : Int
  , y     : Int
  , info  : List (Html Msg)
  }

type alias Row =
  { expr      : Expr
  , html      : List (Html Msg)
  , width     : Int
  , score     : Int
  , canReduce : Bool
  }

type alias Model =
  { state    : State
  , theme    : Theme
  , weights  : Weights
  , lang     : Lang
  , rows     : Array Row
  , curr     : Maybe Curr
  , next     : Maybe Curr
  , score    : Int
  , width    : Int
  , height   : Int
  , interval : Float
  , keys     : List Key
  , arrows   : Arrows
  , orient   : Orientation
  }

type Msg
  = Idle
  | Start
  | Pause
  | Resume
  | Next Term
  | Move Posix
  | Up
  | Down
  | Throw
  | KeyPress Keyboard.Msg
  | TouchStart String
  | Orient Orientation
