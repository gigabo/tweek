
require.def () =>
  clear: () -> $("#debug").empty()
  out: (v) -> $("#debug").append(v)
