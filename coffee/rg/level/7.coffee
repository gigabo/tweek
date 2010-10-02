require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_7 extends Level

    starting_position: () -> [ 100, @start_y ]

    init: () ->
      @title = "Down arrow cleans things up."
      @game.player.enable_feature('toggle_hud')
      w = @game.width / 2
      h = @game.height / 2
      i = 60
      r = 60
      for circle in [
        [2*w/4*4-i, 2*h-i, r]
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 240
      r = 90

      for circle in [
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)
