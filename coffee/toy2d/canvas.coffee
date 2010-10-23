
require.def ['toy2d/debug', '/js/mustache.js'], (Debug) =>

  PI = Math.PI

  class Canvas
    constructor: (@width, @container) ->
      @width      ||= 1000
      @height       = @width/2
      @container  ||= $("#canvas_container")

      @container.html Mustache.to_html '''
        <canvas id="play_canvas" width={{width}} height={{height}}>
          This toy uses a canvas element,
          which doesn't seem to be supported by your browser.
        </canvas>
      ''', this

      @canvas = $("#play_canvas")
      @ctx = @canvas[0].getContext('2d')
#      @canvas.css("background-color", "red")

    jquery: () -> @canvas
    dom:    () -> @canvas[0]

    init_centered: (@draw_width) ->

      canvas = this.dom()

      scale   = canvas.width/@draw_width
      @draw_height = canvas.height/scale

      # Origin is at the center.  Y-axis positive is up.
      # Width is as set explicitly.  Height is scaled proportionately.
      @ctx.setTransform scale, 0, 0, -scale, canvas.width/2, canvas.height/2

    clear: () ->
      @ctx.clearRect(-@draw_width/2, -@draw_height/2, @draw_width, @draw_height)

    label: (t, x, y, a) ->
      @ctx.font          = "8pt Verdana"
      @ctx.textAlign     = "center"
      @ctx.textBaseline  = "middle"
      this.text_at(t, x, y, a)

    label_left: (t, x, y, a) ->
      @ctx.font          = "8pt Verdana"
      @ctx.textAlign     = "left"
      @ctx.textBaseline  = "middle"
      this.text_at(t, x, y, a)

    text_at: (t, x, y, a) ->
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

    # Draw an ellipse at the origin with axis half-lengths (a, b)
    ellipse: (a, b) ->
      steps = 90
      step_arc = 2*PI/steps

      @ctx.moveTo(a,0)
      for i in [1..steps]
        theta = i * step_arc
        x = a * Math.cos(theta)
        y = b * Math.sin(theta)
        @ctx.lineTo(x, y)
