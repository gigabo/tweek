(function() {
  require.def(['rg_debug'], function(Debug) {
    var Rocket;
    Rocket = function(_a, _b, _c) {
      this.y = _c;
      this.x = _b;
      this.game = _a;
      this.thrust = .2;
      this.a = Math.PI / 2;
      this.dx = 0;
      this.dy = 0;
      this.length = 20;
      this.controls = this.game.controls;
      return this;
    };
    Rocket.prototype.apply_gravity = function() {
      return this.dy += .2;
    };
    Rocket.prototype.apply_rotation = function() {
      if (this.controls.rot_l) {
        this.a -= Math.PI / 24;
      }
      return this.controls.rot_r ? this.a += Math.PI / 24 : null;
    };
    Rocket.prototype.apply_thrust = function() {
      if (this.controls.thrust_on) {
        this.dx -= .5 * Math.cos(this.a);
        return this.dy -= .5 * Math.sin(this.a);
      }
    };
    Rocket.prototype.front = function() {
      return {
        x: this.x - this.length / 2 * Math.cos(this.a),
        y: this.y - this.length / 2 * Math.sin(this.a)
      };
    };
    Rocket.prototype.back = function() {
      return {
        x: this.x + this.length / 2 * Math.cos(this.a),
        y: this.y + this.length / 2 * Math.sin(this.a)
      };
    };
    Rocket.prototype.draw = function(graphics) {
      var back, ctx, front;
      ctx = graphics.ctx;
      front = this.front();
      back = this.back();
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.lineWidth = this.length / 5;
      return graphics.line(front.x, front.y, back.x, back.y);
    };
    Rocket.prototype.move = function() {
      this.x += this.dx;
      return this.y += this.dy;
    };
    Rocket.prototype.check_bounds = function() {
      return !((0 < this.x) && (this.x < this.game.width)) || !((0 < this.y) && (this.y < this.game.height)) ? this.splode() : null;
    };
    Rocket.prototype.splode = function() {
      return this.game.start_level();
    };
    Rocket.prototype.step = function() {
      this.apply_gravity();
      this.apply_rotation();
      this.apply_thrust();
      this.move();
      return this.check_bounds();
    };
    return Rocket;
  });
})();