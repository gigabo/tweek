require.def ['rg/debug'], (Debug) ->
  class Rocket
    constructor: (@game, @x, @y) ->
      @thrust = .2
      @rot_ticks = 48
      @north = Math.PI/2
      @slice = 2*Math.PI/@rot_ticks
      @dial  = 0
      @a = @north
      @dx = 0
      @dy = 0
      @length = 20
      @controls = @game.controls

    apply_gravity: () ->
      @dy += .2

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

    move: () ->
      @x += @dx
      @y += @dy

    check_bounds: () ->
      if !(0 < @x < @game.width) or !(0 < @y < @game.height)
        this.splode()

    splode: () ->
      @game.begin_level()

    step: () ->
      this.apply_gravity()
      this.apply_rotation()
      this.apply_thrust()
      this.move()
      this.check_bounds()


