require.def ['rg/debug'], (Debug) =>

  class SpaceCircle
    constructor: (@game, @x, @y, @r) -> this.reset()

    step: () -> if !@hit then this.check_hit()

    red:    () -> 0
    green:  () -> 0
    blue:   () -> 0
    fill:   () -> false

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.lineWidth = 4
      r = this.red()
      g = this.green()
      b = this.blue()
      fill = this.fill()
      if this.fill()
        ctx.fillStyle = "rgba(#{r}, #{g}, #{b}, 1)"
        graphics.circle_fill @x, @y, @r
      else
        ctx.strokeStyle = "rgba(#{r}, #{g}, #{b}, 1)"
        graphics.circle_stroke @x, @y, @r


    done: () -> @hit

    reset: () -> @hit = false

    check_hit: () ->
      for p in [
        @game.level.protagonist.front(), @game.level.protagonist.back()
      ]
        dx = p.x - @x
        dy = p.y - @y
        d = Math.sqrt(dx*dx+dy*dy)
        if d <= @r then @hit = true
