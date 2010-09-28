require.def ['rg/level'], (Level) =>

  class Level_1 extends Level
    init: () ->
      i = 100
      w = @game.width / 2
      h = @game.height / 2
      r = 30
      for goal in [
        [w + i, h + i, r],
        [w - i, h + i, r],
        [w + i, h - i, r],
        [w - i, h - i, r],
      ]
        [x, y, r] = goal
        this.add_goal(x, y, r)

      i = 300
      w = @game.width
      h = @game.height
      r = 30

      for barrier in [ [w / 2, h / 2, r] ]
        [x, y, r] = barrier
        this.add_barrier(x, y, r)


      @messages = [
        "Blue shapes are barriers.",
        "Don't hit them."
      ]
