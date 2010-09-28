require.def () =>
  class Banner
    constructor: (@game, @text) ->
      @a = 1.0
      @f = false

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.font          = "28pt Verdana"
      ctx.textAlign     = "center"
      ctx.textBaseline  = "middle"
      ctx.fillStyle     = "rgba(255, 255, 255, #{@a})"
      graphics.text @text, @game.width/2, @game.height/2

    fade: () -> @f = true
    step: () -> if @f and @a > 0 then @a -= .01
    done: () -> @a <= 0
