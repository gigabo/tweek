require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_last extends Level

    init: () ->
      @messages = [
        "That's all of the levels for now.",
        "Thanks for playing."
      ]

    won: () -> false
