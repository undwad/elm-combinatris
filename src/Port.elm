port module Port exposing (..)

port writeCache : (String, String) -> Cmd msg
port readCache : (String, String) -> Cmd msg

port captureTouches : Bool -> Cmd msg

port touchCallback : (String -> msg) -> Sub msg
