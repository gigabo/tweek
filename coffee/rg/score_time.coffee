require.def ['rg/debug'], (Debug) =>
  class ScoreTime
    constructor: (@game) ->
      @x = @game.width / 5
      @step_time = @game.performance.step_time
      this.reset()

    reset:  () ->
      @value = 0
      @in_finish = false
    step:   () -> @value += @step_time unless this.finishing()
    x_pos:  () -> @x
    color:  () -> "rgba(255, 0, 0, 1)"

    finishing: () ->
      if @game.finishing then @in_finish = true
      @in_finish
