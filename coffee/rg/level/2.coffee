require.def ['rg/level'], (Level) =>

  class Level_2 extends Level
    init: () ->
      @title = "Avoid blue."
      w = @game.width / 2
      h = @game.height / 2
      i = 50
      r = 20
      for goal in [
        [w + i, h + i, r],
        [w - i, h + i, r],
        [w + i, h - i, r],
        [w - i, h - i, r],
      ]
        [x, y, r] = goal
        this.add_goal(x, y, r)

      i = 150
      r = 30

      for barrier in [
        [w - i, h, r],
        [w + i, h, r],
        [w, h - i, r],
        [w, h + i, r],
      ]
        [x, y, r] = barrier
        this.add_barrier(x, y, r)
