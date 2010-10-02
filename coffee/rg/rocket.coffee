require.def ['rg/trail', 'rg/debug'], (Trail, Debug) ->
  class Rocket
    constructor: (@game, @init_x, @init_y) ->
      @thrust = .2
      @gravity = .2
      @length = 20
      @init_y -= @length/2
      @rot_ticks = 40
      @north = Math.PI/2
      @slice = 2*Math.PI/@rot_ticks
      @controls = @game.controls
      @trail = new Trail(@game, this)
      this.reset()

    reset: () ->
      @x = @init_x
      @y = @init_y
      @a = @north
      @dial = 0
      @dx = 0
      @dy = 0

    apply_gravity: () ->
      @dy += @gravity

    apply_rotation: () ->
      if @controls.rotate_l()
        @dial -= 1
        if @dial == -1 then @dial = @rot_ticks-1
      if @controls.rotate_r()
        @dial += 1
        if @dial == @rot_ticks then @dial = 0

      @a = @north+@slice*@dial

    apply_thrust: () ->
      if @controls.thrust_on()
        @dx -= .5*Math.cos(@a)
        @dy -= .5*Math.sin(@a)

    front: () ->
      {
        x: @x - @length/2*Math.cos(@a),
        y: @y - @length/2*Math.sin(@a)
      }

    back: () ->
      {
        x: @x + @length/2*Math.cos(@a),
        y: @y + @length/2*Math.sin(@a)
      }

    draw: (graphics) ->
      ctx = graphics.ctx
      front = this.front()
      back  = this.back()
      ctx.strokeStyle = "rgba(255, 255, 255, 1)"
      ctx.lineWidth = @length/5
      graphics.line front.x, front.y, back.x, back.y
      @trail.draw(graphics)

    move: () ->
      @x += @dx
      @y += @dy

    check_bounds: () ->
      for end in [this.front(), this.back()]
        if !(0 < end.x < @game.width) or !(0 < end.y < @game.height)
          return this.splode()

    splode: () -> @game.begin_level()

    step: () ->
      this.apply_gravity()
      this.apply_rotation()
      this.apply_thrust()
      this.move()
      this.check_bounds()
      @trail.step()


