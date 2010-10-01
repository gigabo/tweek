require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_6 extends Level

    init: () ->
      @title = "It all adds up."
      @game.player.enable_score('total')
      w = @game.width / 2
      h = @game.height / 2
      i = 120
      r = 30
      for circle in [
        [w-i, h-i, r],
        [w+i, h-i, r],
        [w-i, h+i, r],
        [w+i, h+i, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 240
      r = 90

      for circle in [
        [w, h, r],
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)
