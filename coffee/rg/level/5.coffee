require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_5 extends Level

    starting_position: () -> [ @game.width - 100, @start_y ]

    init: () ->
      @title = "Flip upside-down for a bonus."
      @highlight_score = 'loops'
      w = @game.width / 2
      h = @game.height / 2
      i = 140
      r = 40
      for circle in [
        [w-i, 2*h-i, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 140
      r = 90

      for circle in [
        [w, 2*h-i, r],
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)
