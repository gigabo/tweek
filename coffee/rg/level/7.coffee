require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_oops extends Level

    init: () ->
      @messages = [
        "Oops."
      ]

    won: () -> false
