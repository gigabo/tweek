require.def ['rg/debug'], (Debug) =>

  class Goal
    constructor: (@game, @x, @y, @r) -> this.reset()

    step: () ->
      if !@hit then this.check_hit()

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.lineWidth = 4
      r = if @hit then 0 else 255
      g = if @hit then 255 else 0
      ctx.strokeStyle = "rgba(#{r}, #{g}, 0, 1)"
      graphics.circle_stroke @x, @y, @r

    done: () -> @hit

    reset: () -> @hit = false

    check_hit: () ->
      p = @game.protagonist
      dx = p.x - @x
      dy = p.y - @y
      d = Math.sqrt(dx*dx+dy*dy)
      if d <= @r then @hit = true
