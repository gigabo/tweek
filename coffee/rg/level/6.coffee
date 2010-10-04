require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_6 extends Level

    init: () ->
      @title = "It adds up."
      @highlight_score = 'total'
      w = @game.width / 2
      h = @game.height / 2
      i = 240
      r = 30
      for circle in [
        [w-i, h, r],
        [w+i, h, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 240
      r = 120

      for circle in [
        [w, h, r],
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)
