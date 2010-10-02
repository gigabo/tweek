require.def ['rg/debug'], (Debug) =>

  class Graphics
    constructor: (@game,@canvas) ->

      @ctx    = @canvas[0].getContext("2d")
      @width  = @canvas.width()
      @height = @canvas.height()

      @canvas.css("background-color", "black")
      @canvas.css("margin-top", "1em")
      @canvas.css("margin-bottom", "1em")

      this.update_canvas_width()

      $(window).resize () => this.update_canvas_width()



    update_canvas_width: () ->
      width = @canvas.parent().innerWidth() * @game.performance.res
      @canvas.width(width)
      @canvas.height(width/2)

    clear: () ->
      @ctx.clearRect(0, 0, @width, @height)

    line: (x1, y1, x2, y2) ->
      @ctx.beginPath()
      @ctx.moveTo(x1, y1)
      @ctx.lineTo(x2, y2)
      @ctx.stroke()
      @ctx.closePath()

    circle_fill: (x,y,r) ->
      @ctx.beginPath()
      @ctx.arc(x, y, r, 0, Math.PI*2, true)
      @ctx.closePath()
      @ctx.fill()

    arc_stroke: (x, y, r, a1, a2) ->
      @ctx.beginPath()
      @ctx.arc(x, y, r, a1, a2, true)
      @ctx.closePath()
      @ctx.stroke()

    circle_stroke: (x,y,r) ->
      @ctx.beginPath()
      @ctx.arc(x, y, r, 0, Math.PI*2, true)
      @ctx.closePath()
      @ctx.stroke()

    text: (text, x, y) ->
      @ctx.fillText(text, x, y)

    rect_fill: (x,y,w,h) ->
      @ctx.beginPath()
      @ctx.rect(x,y,w,h)
      @ctx.closePath()
      @ctx.fill()

    rect_stroke: (x,y,w,h) ->
      @ctx.beginPath()
      @ctx.rect(x,y,w,h)
      @ctx.closePath()
      @ctx.stroke()

    rect_stroke_rounded: (x1, y1, w, h, r) ->
      x2 = x1 + w
      y2 = y1 + h

      EAST = 0
      WEST = Math.PI
      NORTH = Math.PI / 2 * 3
      SOUTH = Math.PI / 2

      @ctx.beginPath()
      @ctx.moveTo(x1+r, y1)
      @ctx.lineTo(x2-r, y1)
      @ctx.arc(x2-r, y1+r, r, NORTH, EAST, false)
      @ctx.lineTo(x2, y2-r)
      @ctx.arc(x2-r, y2-r, r, EAST, SOUTH, false)
      @ctx.lineTo(x1+r, y2)
      @ctx.arc(x1+r, y2-r, r, SOUTH, WEST, false)
      @ctx.lineTo(x1, y1+r)
      @ctx.arc(x1+r, y1+r, r, WEST, NORTH, false)
      @ctx.closePath()
      @ctx.stroke()

    arrow: (x, y, s, d) ->
      points = {
        left:   [[-.75,    0],[-.25, -.25],[-.25,  .25]]
        right:  [[ .75,    0],[ .25, -.25],[ .25,  .25]]
        up:     [[   0, -.75],[-.25, -.25],[ .25, -.25]]
        down:   [[   0,  .75],[-.25,  .25],[ .25,  .25]]
      }

      @ctx.beginPath()
      i = 0
      for point in points[d]
        [x1, y1] = point
        x2 = x + x1 * s
        y2 = y + y1 * s
        if i++ == 0 then @ctx.moveTo(x2, y2)
        else @ctx.lineTo(x2, y2)
      @ctx.closePath()
      @ctx.fill()
