require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_4 extends Level

    starting_position: () -> [ 100, @start_y ]

    init: () ->
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

      @messages = [
        "Take your time on the finish.",
      ]

    suppress_score: (type) ->
      if type == 'time' or type == 'finish'
        false
      else
        true
