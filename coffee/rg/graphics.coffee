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

    circle_stroke: (x,y,r) ->
      @ctx.beginPath()
      @ctx.arc(x, y, r, 0, Math.PI*2, true)
      @ctx.closePath()
      @ctx.stroke()

    text: (text, x, y) ->
      @ctx.fillText(text, x, y)


