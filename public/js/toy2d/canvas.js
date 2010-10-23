(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', '/js/mustache.js'], __bind(function(Debug) {
    var Canvas, PI;
    PI = Math.PI;
    Canvas = function(_a, _b) {
      this.container = _b;
      this.width = _a;
      this.width || (this.width = 1000);
      this.height = this.width / 2;
      this.container || (this.container = $("#canvas_container"));
      this.container.html(Mustache.to_html('<canvas id="play_canvas" width={{width}} height={{height}}>\n  This toy uses a canvas element,\n  which doesn\'t seem to be supported by your browser.\n</canvas>', this));
      this.canvas = $("#play_canvas");
      this.ctx = this.canvas[0].getContext('2d');
      return this;
    };
    Canvas.prototype.jquery = function() {
      return this.canvas;
    };
    Canvas.prototype.dom = function() {
      return this.canvas[0];
    };
    Canvas.prototype.init_centered = function(_a) {
      var canvas, scale;
      this.draw_width = _a;
      canvas = this.dom();
      scale = canvas.width / this.draw_width;
      this.draw_height = canvas.height / scale;
      return this.ctx.setTransform(scale, 0, 0, -scale, canvas.width / 2, canvas.height / 2);
    };
    Canvas.prototype.clear = function() {
      return this.ctx.clearRect(-this.draw_width / 2, -this.draw_height / 2, this.draw_width, this.draw_height);
    };
    Canvas.prototype.label = function(t, x, y, a) {
      this.ctx.font = "8pt Verdana";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      return this.text_at(t, x, y, a);
    };
    Canvas.prototype.label_left = function(t, x, y, a) {
      this.ctx.font = "8pt Verdana";
      this.ctx.textAlign = "left";
      this.ctx.textBaseline = "middle";
      return this.text_at(t, x, y, a);
    };
    Canvas.prototype.text_at = function(t, x, y, a) {
      a || (a = 0);
      return this.draw_at(x, y, a, __bind(function() {
        return this.scale(0.01, 0.01, __bind(function() {
          this.ctx.transform(1, 0, 0, -1, 0, 0);
          return this.ctx.fillText(t, 0, 0);
        }, this));
      }, this));
    };
    Canvas.prototype.set_color = function(r, g, b, a) {
      var c;
      r = Math.floor(r * 255);
      g = Math.floor(g * 255);
      b = Math.floor(b * 255);
      c = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", " + (a) + ")");
      return (this.ctx.strokeStyle = (this.ctx.fillStyle = c));
    };
    Canvas.prototype.arc = function(r, a) {
      return this.ctx.arc(0, 0, r, 0, a, false);
    };
    Canvas.prototype.line = function(x1, y1, x2, y2) {
      this.ctx.moveTo(x1, y1);
      return this.ctx.lineTo(x2, y2);
    };
    Canvas.prototype.draw_at = function(x, y, a, f) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(x, y);
      this.ctx.rotate(a);
      f();
      this.ctx.stroke();
      return this.ctx.restore();
    };
    Canvas.prototype.scale = function(x, y, f) {
      this.ctx.save();
      this.ctx.scale(x, y);
      f();
      return this.ctx.restore();
    };
    Canvas.prototype.ellipse = function(a, b) {
      var _a, i, step_arc, steps, theta, x, y;
      steps = 90;
      step_arc = 2 * PI / steps;
      this.ctx.moveTo(a, 0);
      _a = [];
      for (i = 1; (1 <= steps ? i <= steps : i >= steps); (1 <= steps ? i += 1 : i -= 1)) {
        _a.push((function() {
          theta = i * step_arc;
          x = a * Math.cos(theta);
          y = b * Math.sin(theta);
          return this.ctx.lineTo(x, y);
        }).call(this));
      }
      return _a;
    };
    return Canvas;
  }, this));
})();
