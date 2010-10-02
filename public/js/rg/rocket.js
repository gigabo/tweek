(function() {
  require.def(['rg/trail', 'rg/debug'], function(Trail, Debug) {
    var Rocket;
    Rocket = function(_a, _b, _c) {
      this.init_y = _c;
      this.init_x = _b;
      this.game = _a;
      this.thrust = .2;
      this.gravity = .2;
      this.length = 20;
      this.init_y -= this.length / 2;
      this.rot_ticks = 40;
      this.north = Math.PI / 2;
      this.slice = 2 * Math.PI / this.rot_ticks;
      this.controls = this.game.controls;
      this.trail = new Trail(this.game, this);
      this.reset();
      return this;
    };
    Rocket.prototype.reset = function() {
      this.x = this.init_x;
      this.y = this.init_y;
      this.a = this.north;
      this.dial = 0;
      this.dx = 0;
      return (this.dy = 0);
    };
    Rocket.prototype.apply_gravity = function() {
      return this.dy += this.gravity;
    };
    Rocket.prototype.apply_rotation = function() {
      if (this.controls.rotate_l()) {
        this.dial -= 1;
        if (this.dial === -1) {
          this.dial = this.rot_ticks - 1;
        }
      }
      if (this.controls.rotate_r()) {
        this.dial += 1;
        if (this.dial === this.rot_ticks) {
          this.dial = 0;
        }
      }
      return (this.a = this.north + this.slice * this.dial);
    };
    Rocket.prototype.apply_thrust = function() {
      if (this.controls.thrust_on()) {
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
      graphics.line(front.x, front.y, back.x, back.y);
      return this.trail.draw(graphics);
    };
    Rocket.prototype.move = function() {
      this.x += this.dx;
      return this.y += this.dy;
    };
    Rocket.prototype.check_bounds = function() {
      var _a, _b, _c, _d, end;
      _a = []; _c = [this.front(), this.back()];
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        end = _c[_b];
        if (!((0 < end.x) && (end.x < this.game.width)) || !((0 < end.y) && (end.y < this.game.height))) {
          return this.splode();
        }
      }
      return _a;
    };
    Rocket.prototype.splode = function() {
      return this.game.begin_level();
    };
    Rocket.prototype.step = function() {
      this.apply_gravity();
      this.apply_rotation();
      this.apply_thrust();
      this.move();
      this.check_bounds();
      return this.trail.step();
    };
    return Rocket;
  });
})();
