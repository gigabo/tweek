require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_oops extends Level

    init: () ->
      @title = "Oops. Something went wrong... :("
      @no_score = true

    won: () -> false
