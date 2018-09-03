module Main exposing (main)

import Browser
import Browser.Events
import Html
import List
import Array exposing (Array)
import String
import Random
import Tuple
import Task
import Result
import Maybe exposing (Maybe, withDefault)
import Time exposing (Posix)
import Json.Decode as Decode
import Browser.Dom exposing (Viewport)
import Debug exposing (toString, log)

import Port exposing (Size)
import Misc exposing (..)
import Expr exposing (Expr, Term(..))
import Common exposing(..)
import View exposing (..)

main = Browser.element
  { init = init
  , view = view
  , update = update
  , subscriptions = subscriptions
  }

makeCurr : Term -> Curr
makeCurr c =
  { term  = c
  , width = Expr.getWidth [c]
  , x     = 0
  , y     = floor (sizes.height / 2)
  }

nextCurr : Cmd Msg
nextCurr = Random.generate Next <|  Random.weighted (0.0, I) termWeights

init : () -> (Model, Cmd Msg)
init _ = (Model (Array.repeat sizes.height Expr.init) Loaded Nothing I 0 Portrait, Cmd.none)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
    append c n    = Array.indexedMap (\i -> if i == n then Expr.update (Expr.append c) else identity)
    apply         = Array.map (\expr -> if expr.applying > 0 then Expr.update Expr.apply expr else expr)
    incX dx curr  = { curr | x = curr.x + dx }
    incY dy curr  = { curr | y = curr.y + dy }
    canPlay       = List.all ((>) sizes.width << .width) << Array.toList
    canMove x y   = (<) x << (-) sizes.width << withDefault sizes.width << Maybe.map (.width) << Array.get y
    sumScores     = List.sum << List.map (.score) << Array.toList
    restart m     =
      let
        m2 = Tuple.first <| init ()
      in
          { m2 | state = Playing, next = m.next, orient = m.orient }
    resize size m =
      let
        orient =
          if (toFloat size.width / toFloat size.height) >= 4.0 / 3.0 then Landscape
                                                                     else Portrait
        state  =
          if Portrait == orient && Playing == m.state then Paused
                                                      else m.state
      in
        { m | orient = orient, state = state }
    control dy m  =
      case m.curr of
        Just curr ->
          case canMove (curr.x + curr.width) (curr.y + dy) m.exprs of
            True  -> { m | curr = Just (incY dy curr) }
            False -> m
        Nothing   -> m
    move dx m     =
      case m.curr of
        Just curr ->
          case canMove (curr.x + dx + curr.width) curr.y m.exprs of
            True  -> { m | exprs = apply m.exprs,                   curr = Just (incX dx curr) }
            False -> { m | exprs = append curr.term curr.y m.exprs, curr = Nothing             }
        Nothing   -> { m | exprs = apply m.exprs }
  in
    case msg of
      Start       -> (restart model, nextCurr)
      Pause       -> ({ model | state = Paused }, Cmd.none)
      Resume      -> ({ model | state = Playing }, Cmd.none)
      Next c      -> ({ model | curr = Just <| makeCurr model.next, next = c }, Cmd.none)
      Up          -> (control -1 model, Cmd.none)
      Down        -> (control  1 model, Cmd.none)
      Throw       -> (move sizes.width model, Cmd.none)
      Resize size -> (resize size model, Cmd.none)
      Idle        -> (model, Cmd.none)
      Move _      ->
        let
          model1 = move 1 model
          model2 =
            { model1 |
              state = if canPlay model1.exprs then Playing else Finished,
              score = sumScores model1.exprs
            }
        in
          case (model2.curr, model2.state) of
            (Nothing, Playing) -> (model2, nextCurr)
            _                  -> (model2, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
  let
    size =
      let
        decode v =
          case Decode.decodeValue Port.decodeSize v of
            Ok s  -> Resize s
            Err _ -> Idle
      in
        Port.clientSize decode
    rest =
      case model.state of
        Playing ->
          let
            interval = max (intervals.max - intervals.dec * toFloat model.score) intervals.min
            move     = Time.every interval Move
            key      =
              Browser.Events.onKeyDown
              <| Decode.map
                (
                  \code ->
                    case code of
                      "ArrowUp"    -> Up
                      "ArrowDown"  -> Down
                      "ArrowRight" -> Throw
                      _            -> Idle
                )
              <| Decode.field "key" Decode.string
          in
                   [ move, key ]
        _       -> [ ]
  in
    Sub.batch <| [ size ] ++ rest
