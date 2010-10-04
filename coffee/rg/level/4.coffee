require.def ['rg/level', 'rg/debug'], (Level, Debug) =>

  class Level_4 extends Level

    starting_position: () -> [ 100, @start_y ]

    init: () ->
      @title = "Take your time on the finish."
      @highlight_score = 'finish'
      w = @game.width / 2
      h = @game.height / 2
      i = 50
      r = 20
      for circle in [
        [w, h+i, r],
      ]
        [x, y, r] = circle
        this.add_goal(x, y, r)
