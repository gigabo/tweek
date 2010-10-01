require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_0 extends Level

    init: () ->
      @title = "Calibrating...."
      @success_message = "Ready!"
      @done  = false
      @no_score = true

    step: () ->
      if !@game.performance.lock and @game.performance.check_frames > 10
        @game.performance.lock = true
        @done = true
      super

    suppress_score: () -> true
