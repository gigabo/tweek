require.def () =>
  class Player
    constructor: (@game) ->
      @enabled_features = {}
    suppress_feature: (type) -> not @enabled_features[type]
    enable_feature: (type) -> @enabled_features[type] = true
