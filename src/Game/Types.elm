module Game.Types exposing (..)

import Array exposing (Array)
import Time exposing (Posix)
import Html exposing (Html)
import Keyboard exposing (Key)
import Keyboard.Arrows exposing (Arrows)

import Lang.Types exposing (..)
import Lang.Game exposing (Weights)
import Editor.CodeArea as CodeArea

config =
  { width    = 30
  , height   = 5
  , interval = 700.0
  }

scoreFactor : Model -> Int
scoreFactor model =
  if      model.interval < 100 then 10
  else if model.interval < 300 then 3
  else if model.interval < 500 then 2
                               else 1

type alias Theme = CodeArea.Model

type State = Playing | Paused | Finished

type alias Curr =
  { term  : Term
  , html  : List (Html Msg)
  , width : Int
  , x     : Int
  , y     : Int
  , decl  : List (Html Msg)
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
  | KeyMsg Keyboard.Msg
  | Return
