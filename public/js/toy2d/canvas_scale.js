(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug'], __bind(function(Debug) {
    var CanvasScale;
    CanvasScale = function(_a, _b) {
      this.scale = _b;
      this.canvas = _a;
      this.scale || (this.scale = 1.0);
      $(window).resize(__bind(function() {
        return this.update_canvas_width();
      }, this));
      this.update_canvas_width();
      return this;
    };
    CanvasScale.prototype.update_canvas_width = function() {
      var width;
      width = this.canvas.parent().innerWidth() * this.scale;
      this.canvas.width(width);
      return this.canvas.height(width / 2);
    };
    return CanvasScale;
  }, this));
})();
