// Generated by CoffeeScript 1.8.0
(function() {
  require.def(['rg/trail', 'rg/debug'], function(Trail, Debug) {
    var Rocket;
    return Rocket = (function() {
      function Rocket(game, init_x, init_y) {
        this.game = game;
        this.init_x = init_x;
        this.init_y = init_y;
        this.thrust = this.game.width / 7000;
        this.gravity = this.thrust * .5;
        this.length = this.game.width / 56;
        this.init_y -= this.length / 2;
        this.rot_ticks = 60;
        this.north = Math.PI / 2;
        this.slice = 2 * Math.PI / this.rot_ticks;
        this.controls = this.game.controls;
        this.trail = new Trail(this.game, this);
        this.reset();
      }

      Rocket.prototype.reset = function() {
        this.x = this.init_x;
        this.y = this.init_y;
        this.a = this.north;
        this.dial = 0;
        this.dx = 0;
        return this.dy = 0;
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
        return this.a = this.north + this.slice * this.dial;
      };

      Rocket.prototype.apply_thrust = function() {
        if (this.controls.thrust_on()) {
          this.dx -= this.thrust * Math.cos(this.a);
          return this.dy -= this.thrust * Math.sin(this.a);
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
        var end, _i, _len, _ref, _ref1, _ref2;
        _ref = [this.front(), this.back()];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          end = _ref[_i];
          if (!((0 < (_ref1 = end.x) && _ref1 < this.game.width)) || !((0 < (_ref2 = end.y) && _ref2 < this.game.height))) {
            return this.splode();
          }
        }
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

    })();
  });

}).call(this);
