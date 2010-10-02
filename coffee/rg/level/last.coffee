require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_last extends Level

    init: () ->
      @title = "That's all of the levels for now."
      @messages = [ "Thanks for playing." ]
      @no_score = true

    won: () -> false
