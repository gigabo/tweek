require.def [
  'toy2d/debug',
  'toy2d/canvas_scale',
],
(Debug, Scale) =>

  PI = Math.PI

  class Toy
    constructor: (canvas) ->
      new Scale(canvas,.8)
      @canvas = canvas[0]
      @degree = 0
      this.init_canvas(5.0)
      this.start()

    init_canvas: (@width) ->
      @ctx = @canvas.getContext('2d')

      @c_width  = @canvas.width
      @c_height = @canvas.height

      scale = @c_width/@width
      @height = @c_height/scale

      # Origin at center, y-axis positive is up
      # Width as set explicitly, height twice width
      @ctx.setTransform(scale, 0, 0, -scale, @c_width/2, @c_height/2)

    start: () -> setInterval( (() => this.step()), 33)

    step: () ->
      @ctx.clearRect(-@c_width/2, -@c_height/2, @c_width, @c_height)

      if ++@degree == 360 then @degree = 0

      thick = .025
      thin  = .005

      a = @degree * 2 * PI / 360
      x = Math.cos(a)
      y = Math.sin(a)

      @ctx.lineWidth = thin

      # Axes
      @ctx.strokeStyle = "black"
      this.draw_at 0, 0, 0,  () => this.line(-@width/2,0,@width/2,0)
      this.draw_at 0, 0, 0,  () => this.line(0,-@height/2,0,@height/2)

      @ctx.lineWidth = thick

      # Main circle
      this.draw_at 0, 0, 0,  () => this.arc(1, 2*PI)

      # Theta arc
      this.set_color(0.75,0,0,1)
      this.draw_at 0, 0, 0,  () => this.arc(.25, a)

      this.label "Ѳ", Math.cos(a/2)*.35, Math.sin(a/2)*.35

      # Unit vector
      this.set_color(0,0.5,0,1)
      this.draw_at 0, 0, 0,  () => this.line(0,0,x,y)

      oa = -0.15
      eighth = Math.floor(@degree/(360/8))
      if eighth % 2 == 1 then oa *= -1
      this.label "1", Math.cos(a+oa)*.5, Math.sin(a+oa)*.5

      # Cosine
      this.set_color(0,0,0.75,1)
      this.draw_at 0, 0, 0,  () => this.line(0,y,x,y)

      os = .1
      os = -os if y < 0
      this.label "cos(Ѳ)", x/2, y+os

      # Sine
      this.set_color(0.5,0,0.5,1)
      this.draw_at 0, 0, 0,  () => this.line(x,0,x,y)

      os = .1
      os = -os if x < 0
      oa = if x < 0 then PI/2 else -PI/2
      this.label "sin(Ѳ)", x+os, y/2, oa

    label: (t, x, y, a) ->
      @ctx.font          = "8pt Verdana"
      @ctx.textAlign     = "center"
      @ctx.textBaseline  = "middle"
      a ||= 0
      this.draw_at x, y, a,  () =>
        this.scale 0.01, 0.01, () =>
          @ctx.transform(1, 0, 0, -1, 0, 0)
          @ctx.fillText(t, 0, 0)

    set_color: (r,g,b,a) ->
      r = Math.floor(r*255)
      g = Math.floor(g*255)
      b = Math.floor(b*255)
      c = "rgba(#{r}, #{g}, #{b}, #{a})"
      @ctx.strokeStyle = @ctx.fillStyle = c

    arc: (r,a) -> @ctx.arc(0, 0, r, 0, a, false)

    line: (x1,y1,x2,y2) -> @ctx.moveTo(x1, y1); @ctx.lineTo(x2, y2)

    draw_at: (x, y, a, f) ->
      @ctx.save()
      @ctx.beginPath()
      @ctx.translate(x, y)
      @ctx.rotate(a)
      f()
      @ctx.stroke()
      @ctx.restore()

    scale: (x, y, f) -> @ctx.save(); @ctx.scale(x, y); f(); @ctx.restore()
