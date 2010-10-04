require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_1 extends Level
    init: () ->
      @title = "Arrows steer."
      @messages = [ "Turn red to green." ]
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
