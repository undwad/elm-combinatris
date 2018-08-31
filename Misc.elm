module Misc exposing (..)

import Task
import List
import Array
import Tuple
import Random
import Debug

goto : a -> Cmd a
goto = Task.perform identity << Task.succeed

weightedRandomGenerator : a -> List (a, Int) -> Random.Generator a
weightedRandomGenerator def list =
  let
    sum = List.sum <| List.map (Tuple.second) <| list
    fromInt list min i =
      case list of
        (val, weight)::rest ->
          if i >= min && i < min + weight then val
          else fromInt rest (min + weight) i
        []                  -> def
  in
    Random.map (fromInt list 0) <| Random.int 0 sum
