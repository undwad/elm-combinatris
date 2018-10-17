module Misc exposing (..)

import Task
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode

goto : a -> Cmd a
goto = Task.perform identity << Task.succeed

perform : Cmd msg -> model -> (model, Cmd msg)
perform cmd model = (model, cmd)

flip : (a -> b -> c) -> b -> a -> c
flip f y x = f x y

composeBy : (b1 -> b2 -> c) -> (a -> b1) -> (a -> b2) -> a -> c
composeBy op f1 f2 x = op (f1 x) (f2 x)

when : Bool -> Html msg -> Html msg
when cond html = if cond then html else Html.span [] []

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
