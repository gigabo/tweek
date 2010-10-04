require.def ['rg/debug'], (Debug) =>

  INTRO = 0
  MIDRO = 1
  OUTRO = 2

  class Dialog
    constructor: (@game, @width, @height, @start) ->
      @title = "Use Arrow Keys"
      this.init_dimensions()
      this.init_controls()

    init_controls: () ->
      @directions = [ 'up', 'down', 'left', 'right' ]
      @was_up = {}
      @options = {}
      for dir in @directions
        @was_up[dir] = !@game.controls[dir]
      @listener = @game.controls.add_listener () => this.check_controls()

    check_controls: () ->
      for dir in @directions
        is_down = @game.controls[dir]
        @was_up[dir] = true unless is_down
        if is_down and @options[dir] and @was_up[dir]
          @selected = dir
          @end = @opposite[dir]
          @game.controls.remove_listener(@listener)
          @pre_x = @pre_y = 99999999 # Hack much?
          @phase = OUTRO
          @game.start()

    set_title: (@title) ->

    option: (direction, value) ->
      @options[direction] = value

    done: () -> @x_pos == @pre_x and @y_pos == @pre_y and @phase == OUTRO

    started: () -> @have_stepped

    step: () ->
      @have_stepped = true
      @pre_x = @x_pos
      @pre_y = @y_pos
      switch @phase
        when INTRO
          if @x_pos > @show_x then @x_pos -= @slide_stride[@start]
          if @x_pos < @show_x then @x_pos += @slide_stride[@start]
          if @y_pos > @show_y then @y_pos -= @slide_stride[@start]
          if @y_pos < @show_y then @y_pos += @slide_stride[@start]
          if @x_pos == @pre_x and @y_pos == @pre_y then @phase = MIDRO
        when MIDRO then @game.stop()
        when OUTRO
          if @x_pos > @hide_x[@end] then @x_pos -= @slide_stride[@end]
          if @x_pos < @hide_x[@end] then @x_pos += @slide_stride[@end]
          if @y_pos > @hide_y[@end] then @y_pos -= @slide_stride[@end]
          if @y_pos < @hide_y[@end] then @y_pos += @slide_stride[@end]

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

      graphics.text @title, @x_pos + @width/2, @y_pos - 10

      d = 100
      align = {left: "left", right: "right", up: "center", down: "center"}
      baseline = {left: "middle", right: "middle", up: "top", down: "bottom"}
      x = { left: d, right: @width - d, up: @width / 2, down: @width / 2 }
      y = { left: @height / 2, right: @height / 2, up: d, down: @height - d }

      for dir in @directions
        if option = @options[dir]
          ctx.textAlign     = align[dir]
          ctx.textBaseline  = baseline[dir]
          graphics.text option, @x_pos + x[dir], @y_pos + y[dir]
          graphics.arrow @x_pos + x[dir], @y_pos+y[dir], d, dir

    init_dimensions: () ->
      @start = 'top' unless @start
      @end   = 'top'
      @show_y = @game.height / 2 - @height / 2
      @show_x = @game.width / 2 - @width / 2
      @hide_y =
        top     : @height * -1
        bottom  : @game.height
        left    : @show_y
        right   : @show_y
      @hide_x =
        top     : @show_x
        bottom  : @show_x
        left    : @width * -1
        right   : @game.width
      @opposite =
        top     : 'bottom'
        bottom  : 'top'
        left    : 'right'
        right   : 'left'

      @slide_frames = 5
      @slide_stride =
        top  : (@show_y - @hide_y.top)  / @slide_frames
        left : (@show_x - @hide_x.left) / @slide_frames
      @slide_stride.bottom = @slide_stride.top
      @slide_stride.right  = @slide_stride.left

      @phase = INTRO
      @x_pos = @hide_x[@start]
      @y_pos = @hide_y[@start]
      @corner_radius = @width / 20

