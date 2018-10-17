module Editor.Types exposing (..)

import Browser exposing (UrlRequest)
import Url exposing (Url)
import Tuple exposing (pair)
import Lang.Types exposing (..)
import Lang.Game exposing (Weights)
import Html exposing (Html)
import Editor.CodeArea as CodeArea

type ReduceMode = Normal | Left

type Msg
  = Idle
  | LangArea CodeArea.Msg
  | ExprArea CodeArea.Msg
  | ReduceExpr ReduceMode
  | PrependNext Term
  | RandomTerm
  | ReadCache
  | ChangeSlot String

type alias Model =
  { langCode      : CodeArea.Model
  , exprCode      : CodeArea.Model
  , langRes       : Result Error Lang
  , exprRes       : Result Error Expr
  , termWeights   : Weights
  , nextTerm      : Maybe Term
  , slot          : String
  }
