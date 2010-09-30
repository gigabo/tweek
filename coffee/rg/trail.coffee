require.def () =>

  class Trail
    constructor: (@game, @owner) ->
      @pieces = []
      @length = 20
      @controls = @game.controls

    step: () ->
      if @controls.thrust_on()
        ox = @owner.x
        oy = @owner.y
        oa = @owner.a
        ol = @owner.length

        x1 = ox + ol/2*Math.cos(oa)
        y1 = oy + ol/2*Math.sin(oa)
        x2 = ox + ol*Math.cos(oa)
        y2 = oy + ol*Math.sin(oa)

        @pieces.unshift({ x: x1, y: y1, l: 10, a: oa, ttl: @length })

      if (@pieces.length > 0 and @pieces[@pieces.length-1].ttl == 0)
        @pieces.pop()

      i = @length
      for piece in @pieces
        m = i/((@length/10)+1)
        piece.x += m*Math.cos(piece.a)
        piece.y += m*Math.sin(piece.a)
        piece.a += (Math.random()-.5)*.5
        piece.ttl -= 1
        i--

    piece_line: (p) ->
      [
        p.x,
        p.y,
        p.x + p.l*Math.cos(p.a),
        p.y + p.l*Math.sin(p.a)
      ]


    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.lineWidth = @owner.length/10

      for piece in @pieces
        a = piece.ttl/@length
        c = Math.floor(255 * (1-a))
        ctx.strokeStyle = "rgba(255, #{c}, #{c}, #{a})"
        [x1, y1, x2, y2] = this.piece_line piece
        graphics.line x1, y1, x2, y2


