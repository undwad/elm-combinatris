module Common exposing (..)

import Array exposing (Array)
import Time exposing (Time)
import Window exposing (Size)

import Expr exposing (..)

width       = 30
height      = 5
space       = "_"
minInterval = 50.0
maxInterval = 500.0
decInterval = 0.5
termWeights =
  [ (I, 3)
  , (K, 3)
  , (S, 2)
  , (Y, 2)
  , (Scope 2 [], 1)
  , (Scope 3 [], 1)
  ]

type alias Curr =
  { term  : Term
  , width : Int
  , x     : Int
  , y     : Int
  }

type State = Loaded | Finished | Playing | Paused

type Orientation = Portrait | Landscape

type alias Model =
  { exprs  : Array Expr
  , state  : State
  , curr   : Maybe Curr
  , next   : Term
  , score  : Int
  , orient : Orientation
  }

type Msg
  = Resize Size
  | Start
  | Pause
  | Resume
  | Next Term
  | Move Time
  | Up
  | Down
  | Throw
  | Idle
