require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_3 extends Level
    init: () ->
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

      @messages = [
        "Be quick.",
      ]

    suppress_score: (type) -> if type == 'time' then false else true

