require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_4 extends Level

    starting_position: () -> [ 100, @start_y ]

    init: () ->
      @title = "Take your time on the finish."
      @game.player.enable_score('finish')
      w = @game.width / 2
      h = @game.height / 2
      i = 150
      r = 50
      for circle in [
        [w-2*i, h+i, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 240
      r = 90

      for circle in [
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)
