require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_last extends Level

    init: () ->
      @messages = [
        "Oops."
      ]

    won: () -> false
