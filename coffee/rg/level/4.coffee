require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_4 extends Level

    starting_position: () -> [ 100, @start_y ]

    init: () ->
      w = @game.width / 2
      h = @game.height / 2
      i = 120
      r = 20
      for circle in [
        [w-i, h+i, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)

      i = 240
      r = 90

      for circle in [
      ]
        [x, y, r] = circle
        this.add_barrier(x, y, r)

      @messages = [
        "A nice long finish is important.",
      ]

    suppress_score: (type) ->
      if type == 'time' or type == 'finish'
        false
      else
        true
