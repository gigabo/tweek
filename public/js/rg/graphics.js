(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var Graphics;
    Graphics = function(_a, _b) {
      this.canvas = _b;
      this.game = _a;
      this.ctx = this.canvas[0].getContext("2d");
      this.width = this.canvas.width();
      this.height = this.canvas.height();
      this.canvas.css("background-color", "black");
      this.canvas.css("margin-top", "1em");
      this.canvas.css("margin-bottom", "1em");
      this.update_canvas_width();
      $(window).resize(__bind(function() {
        return this.update_canvas_width();
      }, this));
      return this;
    };
    Graphics.prototype.update_canvas_width = function() {
      var width;
      width = this.canvas.parent().innerWidth() * this.game.performance.res;
      if (width > 1000) {
        width = 1000;
      }
      this.canvas.width(width);
      return this.canvas.height(width / 2);
    };
    Graphics.prototype.clear = function() {
      return this.ctx.clearRect(0, 0, this.width, this.height);
    };
    Graphics.prototype.line = function(x1, y1, x2, y2) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      return this.ctx.closePath();
    };
    Graphics.prototype.circle_fill = function(x, y, r) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      return this.ctx.fill();
    };
    Graphics.prototype.arc_stroke = function(x, y, r, a1, a2) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, a1, a2, true);
      this.ctx.closePath();
      return this.ctx.stroke();
    };
    Graphics.prototype.circle_stroke = function(x, y, r) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      return this.ctx.stroke();
    };
    Graphics.prototype.text = function(text, x, y) {
      return this.ctx.fillText(text, x, y);
    };
    Graphics.prototype.rect_fill = function(x, y, w, h) {
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.closePath();
      return this.ctx.fill();
    };
    Graphics.prototype.rect_stroke = function(x, y, w, h) {
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.closePath();
      return this.ctx.stroke();
    };
    Graphics.prototype.rect_stroke_rounded = function(x1, y1, w, h, r) {
      var EAST, NORTH, SOUTH, WEST, x2, y2;
      x2 = x1 + w;
      y2 = y1 + h;
      EAST = 0;
      WEST = Math.PI;
      NORTH = Math.PI / 2 * 3;
      SOUTH = Math.PI / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1 + r, y1);
      this.ctx.lineTo(x2 - r, y1);
      this.ctx.arc(x2 - r, y1 + r, r, NORTH, EAST, false);
      this.ctx.lineTo(x2, y2 - r);
      this.ctx.arc(x2 - r, y2 - r, r, EAST, SOUTH, false);
      this.ctx.lineTo(x1 + r, y2);
      this.ctx.arc(x1 + r, y2 - r, r, SOUTH, WEST, false);
      this.ctx.lineTo(x1, y1 + r);
      this.ctx.arc(x1 + r, y1 + r, r, WEST, NORTH, false);
      this.ctx.closePath();
      return this.ctx.stroke();
    };
    Graphics.prototype.arrow = function(x, y, s, d) {
      var _a, _b, _c, _d, i, point, points, x1, x2, y1, y2;
      points = {
        left: [[-.75, 0], [-.25, -.25], [-.25, .25]],
        right: [[.75, 0], [.25, -.25], [.25, .25]],
        up: [[0, -.75], [-.25, -.25], [.25, -.25]],
        down: [[0, .75], [-.25, .25], [.25, .25]]
      };
      this.ctx.beginPath();
      i = 0;
      _b = points[d];
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        point = _b[_a];
        _d = point;
        x1 = _d[0];
        y1 = _d[1];
        x2 = x + x1 * s;
        y2 = y + y1 * s;
        if (i++ === 0) {
          this.ctx.moveTo(x2, y2);
        } else {
          this.ctx.lineTo(x2, y2);
        }
      }
      this.ctx.closePath();
      return this.ctx.fill();
    };
    return Graphics;
  }, this));
})();
