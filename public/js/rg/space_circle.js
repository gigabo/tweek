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
    SpaceCircle.prototype.fill = function() {
      return false;
    };
    SpaceCircle.prototype.draw = function(graphics) {
      var b, ctx, fill, g, r;
      ctx = graphics.ctx;
      ctx.lineWidth = 4;
      r = this.red();
      g = this.green();
      b = this.blue();
      fill = this.fill();
      if (this.fill()) {
        ctx.fillStyle = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", 1)");
        return graphics.circle_fill(this.x, this.y, this.r);
      } else {
        ctx.strokeStyle = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", 1)");
        return graphics.circle_stroke(this.x, this.y, this.r);
      }
    };
    SpaceCircle.prototype.done = function() {
      return this.hit;
    };
    SpaceCircle.prototype.reset = function() {
      return (this.hit = false);
    };
    SpaceCircle.prototype.check_hit = function() {
      var _a, _b, _c, _d, d, dx, dy, p;
      _a = []; _c = [this.game.protagonist.front(), this.game.protagonist.back()];
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        p = _c[_b];
        _a.push((function() {
          dx = p.x - this.x;
          dy = p.y - this.y;
          d = Math.sqrt(dx * dx + dy * dy);
          return d <= this.r ? (this.hit = true) : null;
        }).call(this));
      }
      return _a;
    };
    return SpaceCircle;
  }, this));
})();
