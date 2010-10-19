
require.def ['toy2d/debug', '/js/mustache.js'], (Debug) =>
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
#      @canvas.css("background-color", "red")

    jquery: () -> @canvas
    dom:    () -> @canvas[0]

