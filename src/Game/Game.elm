module Game.Game exposing (init, update, subscribe)

import Browser.Events
import Html
import List
import Array exposing (Array)
import String exposing (fromInt, fromFloat)
import Random
import Tuple
import Task
import Result
import Html exposing (Html)
import Maybe exposing (Maybe, withDefault)
import Time exposing (Posix)
import Json.Decode as Decode
import Dict exposing (Dict)
import Browser.Dom exposing (Viewport)
import Keyboard exposing (Key)
import Keyboard.Arrows as Arrows exposing (Arrows)
import Browser.Navigation as Nav

import Lang.Types exposing (..)
import Lang.Lang exposing (..)
import Lang.Game exposing (..)
import Lang.Show exposing (..)
import Editor.TextStyle exposing (Styles)
import Editor.CodeArea as CodeArea
import Game.Types exposing(..)
import Game.View exposing (..)
import Misc exposing (..)

-- import Debug exposing (toString, log)

makeCurr : Model -> Term -> Curr
makeCurr model term =
  let
    html = showTerm term |> viewString model.theme
    decl =
      case term of
        Comb _ comb   ->
          case Dict.get comb model.lang of
            Just decl1 -> showDecl decl1 |> viewString model.theme
            _         -> []
        _             -> []
  in
    { term  = term
    , html  = html
    , width = List.length html
    , x     = 0
    , y     = floor (toFloat model.height / 2)
    , decl  = decl
    }

makeRow : Row
makeRow = Row [] [] 0 0 False

updateRow : Model -> Row -> Row
updateRow model row =
  let
    code = showExpr row.expr
    expr = makeExpr model.lang ((==) "_") code |> Result.withDefault row.expr
    offsets =
      if canInsertTerm expr then []
      else getReductionOffsets model.lang expr
    strong =
      if canReduceLeft offsets expr then offsets
      else []
    theme = model.theme
    html  = viewString { theme | strong = strong } code
    width = List.length html
    score = row.score + max 0 (row.width - width) * scoreFactor model
  in
    { row
    | expr = expr
    , html = html
    , width = width
    , score = score
    , canReduce = (not << List.isEmpty) strong
    }

prependRow : Term -> Model -> Row -> Row
prependRow term model row =
  let
    expr = prependTerm term model.lang row.expr
  in
    { row | expr = expr } |> updateRow model

reduceRow : Model -> Row -> Row
reduceRow model row =
  let
    expr =
      if row.canReduce then reduceLeft model.lang row.expr
                       else row.expr
  in
    { row | expr = expr } |> updateRow model

nextCurr : Weights -> Cmd Msg
nextCurr = Random.weighted (0.0, Scope 0 [] 0) >> Random.generate Next

init : Styles -> Weights -> Lang -> (Model, Cmd Msg)
init styles weights lang =
  { state    = Playing
  , theme    =
    { class       = "dummyarea"
    , code        = ""
    , scroll      = CodeArea.Scroll 0 0
    , numlines    = False
    , maxline     = 1
    , highlight   = -1
    , strong      = []
    , styles      = styles
    , opacity     = True
    , placeholder = ""
    }
  , weights  = weights
  , lang     = lang
  , rows     = Array.repeat config.height makeRow
  , curr     = Nothing
  , next     = Nothing
  , score    = 0
  , width    = config.width
  , height   = config.height
  , interval = config.interval
  , keys     = []
  , arrows   = Arrows 0 0
  }
  |> perform Cmd.none

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
    prepend c n   = Array.indexedMap (\i -> if i == n then prependRow c model else identity)
    reduce        = Array.map (reduceRow model)
    incX dx curr  = { curr | x = curr.x + dx }
    incY dy curr  = { curr | y = curr.y + dy }
    canPlay       = List.all ((>) model.width << .width) << Array.toList
    canMove x y   = (<) x << (-) model.width << withDefault model.width << Maybe.map (.width) << Array.get y
    sumScores     = List.sum << List.map (.score) << Array.toList
    control dy m  =
      case m.curr of
        Just curr ->
          case canMove (curr.x + curr.width) (curr.y + dy) m.rows of
            True  -> { m | curr = Just (incY dy curr) }
            False -> m
        Nothing   -> m
    move dx m     =
      case m.curr of
        Just curr ->
          case canMove (curr.x + dx + curr.width) curr.y m.rows of
            True  -> { m | rows = reduce m.rows,                   curr = Just (incX dx curr) }
            False -> { m | rows = prepend curr.term curr.y m.rows, curr = Nothing             }
        Nothing   -> { m | rows = reduce m.rows }
    keyboard msg1 m1 =
      let
        keys   = Keyboard.update msg1 m1.keys
        arrows = Arrows.arrows keys
        m2     = { m1 | keys = keys, arrows = arrows }
      in
        if      arrows.y > 0 then update Up m2
        else if arrows.y < 0 then update Down m2
        else if arrows.x > 0 then update Throw m2
        else                      m2 |> perform Cmd.none
  in
    case msg of
      Idle        -> model |> perform Cmd.none
      Start       -> init model.theme.styles model.weights model.lang
      Pause       -> { model | state = Paused } |> perform Cmd.none
      Resume      -> { model | state = Playing } |> perform Cmd.none
      Next c      -> { model | curr = model.next, next = Just (makeCurr model c) } |> perform Cmd.none
      Up          -> model |> control -1       |> perform Cmd.none
      Down        -> model |> control  1       |> perform Cmd.none
      Throw       -> model |> move model.width |> perform Cmd.none
      KeyMsg msg1 -> model |> keyboard msg1
      Return      -> model |> perform (Nav.load "#edit")
      Move _      ->
        let
          model1 = move 1 model
          model2 =
            { model1
            | state    = if canPlay model1.rows then Playing else Finished
            , score    = sumScores model1.rows
            , interval = model.interval - model.interval / toFloat (scoreFactor model) / 1000
            }
        in
          case (model2.curr, model2.state) of
            (Nothing, Playing) -> model2 |> perform (nextCurr model.weights)
            _                  -> model2 |> perform Cmd.none

subscribe : Model -> Sub Msg
subscribe model =
  case model.state of
    Playing ->
      Sub.batch
      [ Time.every model.interval Move
      , Sub.map KeyMsg Keyboard.subscriptions
      ]
    _ -> Sub.none
