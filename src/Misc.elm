module Misc exposing (..)

import Task
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Url exposing (Url)
import Browser exposing (UrlRequest(..))
import Browser.Navigation as Nav
import Json.Decode

goto : a -> Cmd a
goto = Task.perform identity << Task.succeed

perform : Cmd msg -> model -> (model, Cmd msg)
perform cmd model = (model, cmd)

flip : (a -> b -> c) -> b -> a -> c
flip f y x = f x y

composeBy : (b1 -> b2 -> c) -> (a -> b1) -> (a -> b2) -> a -> c
composeBy op f1 f2 x = op (f1 x) (f2 x)

consIf : Bool -> a -> List a -> List a
consIf cond item list = if cond then item :: list else list

appendIf : Bool -> List a -> List a -> List a
appendIf cond items list = if cond then list ++ items else list

mapOrDefault : (a -> b) -> b -> Maybe a -> b
mapOrDefault f b = Maybe.withDefault b << Maybe.map f

type alias NavModel a =
  { a
  | navurl : Url
  , navkey : Nav.Key
  }

resetUrl : NavModel a -> Cmd msg
resetUrl { navkey, navurl } =
  { navurl | fragment = Nothing } |> Url.toString |> Nav.replaceUrl navkey

pushUrl : NavModel a -> Url -> Cmd msg
pushUrl { navkey } url  = url |> Url.toString |> Nav.pushUrl navkey

disableContextMenu : msg -> Html.Attribute msg
disableContextMenu msg =
  Json.Decode.succeed msg
  |> Json.Decode.map
     ( always
       { message         = msg
       , stopPropagation = True
       , preventDefault  = True
       }
     )
  |> Html.Events.custom "contextmenu"
