require.def ['rg/debug'], (Debug) =>

  class Goal
    constructor: (@game, @x, @y, @r) -> this.reset()

    step: () ->
      this.check_hit()
      if @hit then @game.protagonist.splode()

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.lineWidth = 4
      ctx.strokeStyle = "rgba(0, 0, 255, 1)"
      graphics.circle_stroke @x, @y, @r

    reset: () -> @hit = false

    check_hit: () ->
      p = @game.protagonist
      dx = p.x - @x
      dy = p.y - @y
      d = Math.sqrt(dx*dx+dy*dy)
      if d <= @r then @hit = true
