require.def ['rg/debug'], (Debug) =>
  class ScoreTime
    constructor: (@game) ->
      @x = @game.width / 5
      @step_time = @game.performance.step_time
      this.reset()

    reset:  () -> @value = 0
    step:   () -> @value += @step_time unless @game.finishing
    x_pos:  () -> @x
    color:  () -> "rgba(255, 0, 0, 1)"

