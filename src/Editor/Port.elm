port module Editor.Port exposing
  ( writeSlot
  , readSlot
  , readSlotCallback
  , writeSlotNum
  , readSlotNum
  , readSlotNumCallback
  )

import Port exposing (..)

writeSlot : String -> String -> Cmd msg
writeSlot slot code = writeCache ("combinatris_slot" ++ slot, code)

port readSlotCallback : (String -> msg) -> Sub msg
readSlot : String -> Cmd msg
readSlot slot = readCache ("combinatris_slot" ++ slot, "readSlotCallback")

writeSlotNum : String -> Cmd msg
writeSlotNum slot = writeCache ("combinatris_slot_num", slot)

port readSlotNumCallback : (String -> msg) -> Sub msg
readSlotNum : Cmd msg
readSlotNum = readCache ("combinatris_slot_num", "readSlotNumCallback")
