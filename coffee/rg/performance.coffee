require.def () =>

  class Performance
    constructor: (@game) ->
      @res = 1
      @check_frames = 2
      this.init()
      @lock = false

    init: () ->
      @frame_count  = 0
      @step_time    = 33
      @base_time    = (new Date).getTime()

    check: () ->
      if (!@lock and ++@frame_count == @check_frames)
        now = (new Date).getTime()
        elapsed = now - @base_time
        shrink_threshold = (@check_frames * @step_time) * 1.1
        if (elapsed > shrink_threshold)
          @res *= .99
          if @res < .3 then this.too_slow()
          @game.graphics.update_canvas_width()
          if @check_frames > 1
            @check_frames --
        else
          @check_frames ++

        this.init()

    too_slow: () ->
      @game.stop()
      $("#canvas_container").empty()
      $("#canvas_container").
        append("Sorry, your browser seems to be too slow to play this game.")



