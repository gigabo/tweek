require.def [
  'toy2d/debug',
  'toy2d/canvas',
  'toy2d/canvas_scale',
  '/js/mustache.js',
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
      this.init_formulae()
      this.init_controls()
      this.start()

    init_formulae: () ->
      @formulae = [
        # This is what I found when I read the wikipedia article on ellipses
        # more carefully :)
        {
          name: 'sqrt(a^2-b^2)',
          func: (a, b) -> Math.sqrt((a*a)-(b*b))
        },
        # This is what I came up with given the formula for the eccentricity
        # of an ellipse: sqrt(1-(b/a)^2)
        {
          name: 'a * sqrt(1-(b^2/a^2))',
          func: (a, b) -> a * Math.sqrt(1-((b*b)/(a*a)))
        },
        {
          name: 'a',
          func: (a, b) -> a
        },
        {
          name: 'a - b',
          func: (a, b) -> a - b
        },
        {
          name: 'a^2 - b^2',
          func: (a, b) -> a*a - b*b
        },
        {
          name: 'a * cos(b/a)',
          func: (a, b) -> a*Math.cos(b/a)
        },
        {
          name: 'a * 2^(a-b) - a',
          func: (a, b) -> a*Math.pow(2, (a-b))-a
        },
      ]
      for i in [0..@formulae.length-1]
        @formulae[i].index=i

    init_controls: () ->
      @current_formula = 0
      @current_steps   = 10
      @steps_values = [1..20]
      $("#controls").append Mustache.to_html '''
        <select id="steps_selector">
          {{#steps_values}}
          <option value="{{.}}">Approximation steps: {{.}}</option>
          {{/steps_values}}
        </select>
        <select id="formula_selector">
          {{#formulae}}
          <option value="{{index}}">Formula: {{name}}</option>
          {{/formulae}}
        </select>
      ''', this
      f_control= $("#formula_selector")
      f_control.change () => @current_formula = f_control.val()
      s_control= $("#steps_selector")
      s_control.val(10)
      s_control.change () => @current_steps = s_control.val()

    start: () -> setInterval( (() => this.step()), 33)

    step: () ->
      @canvas.clear()

      if ++@degree == 360 then @degree = 0

      thick = .025
      thin  = .005

      theta = @degree * 2 * PI / 360
      x = Math.cos(theta)
      y = Math.sin(theta)

      @canvas.ctx.lineWidth = thin

      # Axes
      @canvas.set_color(0,0,0,1)
      @canvas.draw_at 0, 0, 0, () => @canvas.line(-@width/2,0,@width/2,0)
      @canvas.draw_at 0, 0, 0, () => @canvas.line(0,-@height/2,0,@height/2)

      @canvas.ctx.lineWidth = thick

      a = 1.5+x/2
      b = 1
      @canvas.draw_at 0, 0, 0, () => @canvas.ellipse(a, b)

      # Ellipse Axes
      @canvas.set_color(0,0,.7,1)
      @canvas.draw_at 0, 0, 0, () => @canvas.line(0,-.1,a,-.1)
      @canvas.label "a", a/2, -0.2
      @canvas.draw_at 0, 0, 0, () => @canvas.line(-.1,0,-.1,b)
      @canvas.label "b", -0.2, b/2

      # First, draw an approximation of focus position.
      fx = this.approximate_focus(a, b)
      @canvas.set_color(.5,0,0,1)
      @canvas.draw_at fx, 0, 0,  () => @canvas.arc(thick/2, 2*PI)
      @canvas.label "Sun", fx, 0.1
      @canvas.draw_at(-2.4, 1.1, 0, () => @canvas.arc(thick/2, 2*PI))
      @canvas.label_left "Binary Approximation (#{@current_steps})", -2.3, 1.1

      # Then try to find a formula to match it.

      fx = @formulae[@current_formula].func(a,b)

      @canvas.set_color(0,.5,0,1)
      @canvas.draw_at fx, 0, 0,  () => @canvas.arc(thick/2, 2*PI)
      @canvas.label "Sun", fx, 0.1
      @canvas.draw_at(-2.4, 0.95, 0, () => @canvas.arc(thick/2, 2*PI))
      @canvas.label_left "Formula: #{@formulae[@current_formula].name}", -2.3, 0.95

    # I didn't know how to derive the position of foci from the axis lengths
    # of my ellipse, so I decided to first approximate, and then see if I
    # could figure out a simple formula that would match the approximation and
    # eliminate the need for it.  This approximation uses the fact that the
    # sum of distances from all points on the ellipse to the foci are the
    # same.  This method assumes that the major axis lays along the X-axis.
    # It starts with a candidate focus halfway between the center of the
    # ellipse and the positive-X intersection with the major axis, and then
    # does a binary searh for 10 steps.  I initially made the number of steps
    # dynamic and then tried various values to find the lowest that gave a
    # smooth animation. :D
    approximate_focus: (a, b) ->

      # x is our candidate focus position (on the x axis)
      # dx is how far we move the candidate focus each step
      dx = x = a / 2

      # Sum of distances from foci to point on major axis.
      # This is always just 2 * semimajor axis length:
      #   Foci are P1:[x, 0] and P2:[-x, 0].
      #   Point on major axis is [a, 0]
      #   P1 distance is a-x
      #   P2 distance is a+x
      #   Sum of distances is a+x+a-x = a+a+x-x = 2*a
      major = 2*a

      for i in [0...@current_steps]

        # The sum of distances from foci to point on minor axis.
        # Each focal distance is the hypotenuse of a right triangle
        # with legs on the X and Y axes, which lets us easily calculate
        # using the Pythagorean theorem.
        minor = Math.sqrt(b*b+x*x)*2

        # This is a binary search.  Each step we'll move half as far
        # as we did previously.
        dx /= 2

        x += dx * if minor < major then 1 else -1

      x
