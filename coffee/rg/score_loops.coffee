require.def ['rg/debug'], (Debug) =>
  class ScoreTime
    constructor: (@game) ->
      @x = @game.width / 5 * 3
      @flipflop = false
      @step_time = @game.performance.step_time
      this.reset()

    reset:  () -> @value = @flipflop = 0
    step:   () ->
      dial = @game.protagonist.dial
      upside_down = @game.protagonist.rot_ticks / 2
      if dial == 0 and @flipflop
        @flipflop = false
        @value -= 1000
      else if dial == upside_down
        @flipflop = true

    x_pos:  () -> @x
    color:  () -> "rgba(0, 0, 255, 1)"
