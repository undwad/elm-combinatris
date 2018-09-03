module Misc exposing (..)

import Task
import List
import Array
import Tuple
import Random
import Debug exposing (toString, log)

goto : a -> Cmd a
goto = Task.perform identity << Task.succeed
