port module Port exposing
  ( writeCache
  , readCache
  )

port writeCache : (String, String) -> Cmd msg
port readCache : (String, String) -> Cmd msg
