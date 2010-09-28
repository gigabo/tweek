require.def () =>

  class Performance
    constructor: (@game) ->
      @res = 1
      @check_frames = 2
      this.init()

    init: () ->
      @frame_count  = 0
      @step_time    = 50
      @base_time    = (new Date).getTime()

    check: () ->
      if (++@frame_count == @check_frames)
        now = (new Date).getTime()
        elapsed = now - @base_time
        shrink_threshold = (@check_frames * @step_time) * 1.1
        grow_threshold   = (@check_frames * @step_time) * 1.05
        if (elapsed > shrink_threshold)
          @res *= .99
          if @res < .2
            this.too_slow()
          @game.graphics.update_canvas_width()
          if @check_frames > 1
            @check_frames --
        else if elapsed < grow_threshold and @res < 1
          @res *= 1.001
          if @res > 1 then @res = 1
        else
          if @check_frames < 50
            @check_frames ++

        this.init()

    too_slow: () ->
      @game.stop()
      $("#canvas_container").empty()
      $("#canvas_container").
        append("Sorry, your browser seems to be too slow to play this game.")



