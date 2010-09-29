(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var SpaceCircle;
    SpaceCircle = function(_a, _b, _c, _d) {
      this.r = _d;
      this.y = _c;
      this.x = _b;
      this.game = _a;
      this.reset();
      return this;
    };
    SpaceCircle.prototype.step = function() {
      return !this.hit ? this.check_hit() : null;
    };
    SpaceCircle.prototype.red = function() {
      return 0;
    };
    SpaceCircle.prototype.green = function() {
      return 0;
    };
    SpaceCircle.prototype.blue = function() {
      return 0;
    };
    SpaceCircle.prototype.draw = function(graphics) {
      var b, ctx, g, r;
      ctx = graphics.ctx;
      ctx.lineWidth = 4;
      r = this.red();
      g = this.green();
      b = this.blue();
      ctx.strokeStyle = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", 1)");
      return graphics.circle_stroke(this.x, this.y, this.r);
    };
    SpaceCircle.prototype.done = function() {
      return this.hit;
    };
    SpaceCircle.prototype.reset = function() {
      return (this.hit = false);
    };
    SpaceCircle.prototype.check_hit = function() {
      var d, dx, dy, p;
      p = this.game.protagonist;
      dx = p.x - this.x;
      dy = p.y - this.y;
      d = Math.sqrt(dx * dx + dy * dy);
      return d <= this.r ? (this.hit = true) : null;
    };
    return SpaceCircle;
  }, this));
})();
