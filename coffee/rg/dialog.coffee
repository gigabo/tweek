require.def ['rg/debug'], (Debug) =>

  class Dialog
    constructor: (@game, @width, @height) ->
      @y_hidden = @height * -1
      @y_shown  = @game.height / 2 - @height / 2
      @slide_stride = (@y_shown - @y_hidden) / 5
      @y_pos = @y_hidden
      @x_pos = @game.width / 2 - @width / 2
      @corner_radius = @width / 20
      @directions = [ 'up', 'down', 'left', 'right' ]
      @labels = { }

    label: (direction, value) ->
      @labels[direction] = value

    done: () -> @y_pos <= @y_hidden
    step: () ->
      if @finishing
        if @y_pos > @y_hidden then @y_pos -= @slide_stride
      else if @y_pos < @y_shown then @y_pos += @slide_stride

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.lineWidth = 5
      ctx.strokeStyle = "rgba(255, 255, 255, .5)"
      graphics.rect_stroke_rounded(
        @x_pos, @y_pos, @width, @height, @corner_radius)

      ctx.font          = "28pt Verdana"
      ctx.fillStyle     = "rgba(255, 255, 255, .8)"
      ctx.textAlign     = "center"
      ctx.textBaseline  = "bottom"

      graphics.text "Use Arrow Keys", @x_pos + @width/2, @y_pos - 10

      d = 100
      align = {left: "left", right: "right", up: "center", down: "center"}
      baseline = {left: "middle", right: "middle", up: "top", down: "bottom"}
      x = { left: d, right: @width - d, up: @width / 2, down: @width / 2 }
      y = { left: @height / 2, right: @height / 2, up: d, down: @height - d }

      for direction in @directions
        if label = @labels[direction]
          ctx.textAlign     = align[direction]
          ctx.textBaseline  = baseline[direction]
          graphics.text label, @x_pos + x[direction], @y_pos + y[direction]
          graphics.arrow @x_pos + x[direction], @y_pos+y[direction], d,
            direction
