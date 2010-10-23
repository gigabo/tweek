require.def [
  'toy2d/debug',
  'toy2d/canvas',
  'toy2d/canvas_scale',
],
(Debug, Canvas, CanvasScale) =>

  PI = Math.PI

  class Toy
    constructor: () ->
      @canvas = new Canvas
      new CanvasScale(@canvas.jquery(),.8)
      @canvas.init_centered(5.0)
      @width  = @canvas.draw_width
      @height = @canvas.draw_height
      @degree = 0
      this.start()

    start: () -> setInterval( (() => this.step()), 33)

    step: () ->
      @canvas.clear()

      if ++@degree == 360 then @degree = 0

      thick = .025
      thin  = .005

      a = @degree * 2 * PI / 360
      x = Math.cos(a)
      y = Math.sin(a)

      @canvas.ctx.lineWidth = thin

      # Axes
      @canvas.set_color(0,0,0,1)
      @canvas.draw_at 0, 0, 0,  () => @canvas.line(-@width/2,0,@width/2,0)
      @canvas.draw_at 0, 0, 0,  () => @canvas.line(0,-@height/2,0,@height/2)

      @canvas.ctx.lineWidth = thick

      # Main circle
      @canvas.draw_at 0, 0, 0,  () => @canvas.arc(1, 2*PI)

      # Theta arc
      @canvas.set_color(0.75,0,0,1)
      @canvas.draw_at 0, 0, 0,  () => @canvas.arc(.25, a)

      @canvas.label "Ѳ", Math.cos(a/2)*.35, Math.sin(a/2)*.35

      # Unit vector
      @canvas.set_color(0,0.5,0,1)
      @canvas.draw_at 0, 0, 0,  () => @canvas.line(0,0,x,y)

      oa = -0.15
      eighth = Math.floor(@degree/(360/8))
      if eighth % 2 == 1 then oa *= -1
      @canvas.label "1", Math.cos(a+oa)*.5, Math.sin(a+oa)*.5

      # Cosine
      @canvas.set_color(0,0,0.75,1)
      @canvas.draw_at 0, 0, 0,  () => @canvas.line(0,y,x,y)

      os = .1
      os = -os if y < 0
      @canvas.label "cos(Ѳ)", x/2, y+os

      # Sine
      @canvas.set_color(0.5,0,0.5,1)
      @canvas.draw_at 0, 0, 0,  () => @canvas.line(x,0,x,y)

      os = .1
      os = -os if x < 0
      oa = if x < 0 then PI/2 else -PI/2
      @canvas.label "sin(Ѳ)", x+os, y/2, oa
