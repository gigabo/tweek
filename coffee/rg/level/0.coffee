require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_0 extends Level

    init: () ->
      @messages = ["Calibrating...."]
      @ready = false
      @done  = false

    step: () ->
      if !@game.performance.lock and @game.performance.check_frames > 10
        @game.performance.lock = true
        @messages = ["Ready!", "(Crash to continue...)"]
        @ready = true
      super

    begin: () ->
      if @ready then @done = true
      super

    won: () -> @done
