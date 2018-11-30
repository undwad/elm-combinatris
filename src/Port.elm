port module Port exposing (..)

port writeCache : (String, String) -> Cmd msg
port readCache : (String, String) -> Cmd msg

port preventDefaultTouchStart : Bool -> Cmd msg

port touchStartCallback : (String -> msg) -> Sub msg
