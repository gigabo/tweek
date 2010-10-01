require.def () =>
  class Player
    constructor: (@game) ->
      @enabled_scores = {}
    suppress_score: (type) -> not @enabled_scores[type]
    enable_score: (type) -> @enabled_scores[type] = true
