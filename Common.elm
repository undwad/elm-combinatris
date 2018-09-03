module Common exposing (..)

import Array exposing (Array)
import Time exposing (Posix)
-- import Window exposing (Size)

import Expr exposing (..)

sizes       = { width = 30, height = 5 }
space       = "_"
intervals   = { min = 50.0, max = 500.0, dec = 0.5 }
termWeights =
  [ (3.0, I)
  , (3.0, K)
  , (2.0, S)
  , (2.0, Y)
  , (1.0, Scope 2 [])
  , (1.0, Scope 3 [])
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
  = Idle
  | Start
  | Pause
  | Resume
  | Next Term
  | Move Posix
  | Up
  | Down
  | Throw
  -- | Resize Size
