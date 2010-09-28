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
    Graphics.prototype.circle_stroke = function(x, y, r) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
      this.ctx.closePath();
      return this.ctx.stroke();
    };
    Graphics.prototype.text = function(text, x, y) {
      return this.ctx.fillText(text, x, y);
    };
    return Graphics;
  }, this));
})();
