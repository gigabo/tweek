require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_3 extends Level
    init: () ->
      @title = "Be quick."
      @game.player.enable_feature('score_time')
      w = @game.width / 2
      h = @game.height / 2
      i = 120
      r = 20
      for circle in [
        [w, h-i, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 20
      r = 90

      for circle in [
        [w, h, r],
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)
