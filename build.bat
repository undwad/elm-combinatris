del main.js

set MAKE=elm make src\Main.elm %1 --output main.js

cmd /C %MAKE%

start /B elm reactor
start /B onchange "src/**/*.elm" -- %MAKE%
