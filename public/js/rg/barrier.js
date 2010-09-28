(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var Goal;
    Goal = function(_a, _b, _c, _d) {
      this.r = _d;
      this.y = _c;
      this.x = _b;
      this.game = _a;
      this.reset();
      return this;
    };
    Goal.prototype.step = function() {
      this.check_hit();
      return this.hit ? this.game.protagonist.splode() : null;
    };
    Goal.prototype.draw = function(graphics) {
      var ctx;
      ctx = graphics.ctx;
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(0, 0, 255, 1)";
      return graphics.circle_stroke(this.x, this.y, this.r);
    };
    Goal.prototype.reset = function() {
      return (this.hit = false);
    };
    Goal.prototype.check_hit = function() {
      var d, dx, dy, p;
      p = this.game.protagonist;
      dx = p.x - this.x;
      dy = p.y - this.y;
      d = Math.sqrt(dx * dx + dy * dy);
      return d <= this.r ? (this.hit = true) : null;
    };
    return Goal;
  }, this));
})();
