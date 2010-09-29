require.def ['rg/debug', 'rg/score_manager'], (Debug, ScoreManager) =>
  class ScoreTotal
    constructor: (@game) ->
      @x = @game.width / 5 * 4
      @step_time = @game.performance.step_time
      @manager = new ScoreManager
      this.reset()

    reset:  () -> @value = "= 0"
    step:   () -> @value = "= #{@manager.total()}"
    x_pos:  () -> @x
    color:  () -> "rgba(255, 255, 0, 1)"

