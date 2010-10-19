(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', '/js/mustache.js'], __bind(function(Debug) {
    var Canvas;
    Canvas = function(_a, _b) {
      this.container = _b;
      this.width = _a;
      this.width || (this.width = 1000);
      this.height = this.width / 2;
      this.container || (this.container = $("#canvas_container"));
      this.container.html(Mustache.to_html('<canvas id="play_canvas" width={{width}} height={{height}}>\n  This toy uses a canvas element,\n  which doesn\'t seem to be supported by your browser.\n</canvas>', this));
      this.canvas = $("#play_canvas");
      return this;
    };
    Canvas.prototype.jquery = function() {
      return this.canvas;
    };
    Canvas.prototype.dom = function() {
      return this.canvas[0];
    };
    return Canvas;
  }, this));
})();
