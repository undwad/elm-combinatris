module Editor.Data exposing (..)

slots = List.range 1 5 |> List.map String.fromInt

placeholder = """
[**Start composing**](#NEW) your own set of combinators.

Or select one of the well-known computational systems:

  [**SKIY**](#SKIY) or [**BCKWY**](#BCKWY).

Or try playing [**this**](#GAME1) well-balanced example.

Read more about combinatory logic in [**Wikipedia**](https://en.wikipedia.org/wiki/Combinatory_logic).

Annotating combinators with color and optional weight (see examples above) allows to play the [**Combinatris**](http://dirk.rave.org/combinatris/how-to-play.html) game.

Unlike the original game, expressions don't reduce completely at once, but step by step, so that you could stop infinite loops.
Scoring also is slightly different but intuitive.

Use arrow keys or screen buttons to play the game.

The project is coded in [**Elm**](http://elm-lang.org/) language.

The project is open source on [**GitHub**](https://github.com/undwad/elm-combinatris).
"""

exampleSKIY = String.trim """
Ix   = x      -- #0074D9 %3
Kxy  = x      -- #85144b %2
Sxyz = xz(yz) -- #3D9970 %2
Yx   = x(Yx)  -- #f00    %2

B = S(KS)K
C = S(BBS)(KK)
W = SS(SK)
"""

exampleBCKWY = String.trim """
Bxyz = x(yz) -- #FF851B %1
Cxyz = xzy   -- #B10DC9 %1
Kxy  = x     -- #85144b %3
Wxy  = xyy   -- #39CCCC %1
Yx   = x(Yx) -- #f00    %1

S = B(BW)(BBC)
I = SKK
"""

exampleGAME1 = String.trim """
Bxyz = x(yz) -- #FF851B %3
Cxyz = xzy   -- #B10DC9 %3
Kxy  = x     -- #85144b %7
Wxy  = xyy   -- #39CCCC %2
Yx   = (Yx)x -- #f00    %2

S = B(BW)(BBC)
I = SKK      -- #00f    %2
"""
