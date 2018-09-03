port module Port exposing (..)

import Json.Decode as Decode

type alias Size = { width: Int, height: Int }

port clientSize : (Decode.Value -> msg) -> Sub msg

decodeSize : Decode.Decoder Size
decodeSize =
  Decode.map2 Size
    (Decode.field "width" Decode.int)
    (Decode.field "height" Decode.int)
