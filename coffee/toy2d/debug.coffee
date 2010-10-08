
require.def () =>
  ID = 'debug'
  id: (id) -> ID = id if id; ID
  clear: () -> $("##{ID}").empty()
  out: (v) -> $("##{ID}").append(v)
