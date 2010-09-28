(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/controls', 'rg/performance', 'rg/graphics', 'rg/rocket', 'rg/trail', 'rg/debug'], __bind(function(Controls, Performance, Graphics, Rocket, Trail, Debug) {
    var Game;
    Game = function(canvas) {
      this.running = false;
      this.performance = new Performance(this);
      this.graphics = new Graphics(this, canvas);
      this.controls = new Controls(this);
      this.trail = new Trail(this);
      this.width = this.graphics.width;
      this.height = this.graphics.height;
      this.level_number = 0;
      this.start();
      return this;
    };
    Game.prototype.start = function() {
      if (!this.running) {
        this.performance.init();
        this.main_interval = setInterval(__bind(function() {
          return this.step();
        }, this), this.performance.step_time);
        return (this.running = true);
      }
    };
    Game.prototype.stop = function() {
      if (this.running) {
        clearInterval(this.main_interval);
        return (this.running = false);
      }
    };
    Game.prototype.step = function() {
      if (this.level_running) {
        this.protagonist.step();
        this.trail.step();
        this.level.step();
        this.draw();
        this.performance.check();
        return this.level.won() ? this.advance_level() : null;
      } else {
        return this.init_level();
      }
    };
    Game.prototype.begin_level = function() {
      var _a, x, y;
      this.level.begin();
      _a = this.level.starting_position();
      x = _a[0];
      y = _a[1];
      this.protagonist = new Rocket(this, x, y);
      this.trail.owner = this.protagonist;
      return (this.level_running = true);
    };
    Game.prototype.advance_level = function() {
      this.level_number += 1;
      return this.init_level();
    };
    Game.prototype.init_level = function() {
      this.stop();
      return require([("rg/level/" + (this.level_number))], __bind(function(Level) {
        this.level = new Level(this);
        this.begin_level();
        return this.start();
      }, this));
    };
    Game.prototype.draw = function() {
      this.graphics.clear();
      this.protagonist.draw(this.graphics);
      this.trail.draw(this.graphics);
      return this.level.draw(this.graphics);
    };
    return Game;
  }, this));
})();
