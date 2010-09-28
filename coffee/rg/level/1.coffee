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

      @messages = [
        "Arrows steer.",
        "Red circles are goals.",
        "Turn them all green to advance."
      ]
