
require.def ['toy2d/debug'], (Debug) =>
  class CanvasScale
    constructor: (@canvas, @scale) ->
      @scale ||= 1.0
      $(window).resize () => this.update_canvas_width()
      this.update_canvas_width()

    update_canvas_width: () ->
      width = @canvas.parent().innerWidth() * @scale
      @canvas.width(width)
      @canvas.height(width/2)

