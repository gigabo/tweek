(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg_controls', 'rg_performance', 'rg_graphics', 'rg_rocket', 'rg_trail', 'rg_debug'], __bind(function(Controls, Performance, Graphics, Rocket, Trail, Debug) {
    var Game;
    Game = function(canvas) {
      this.running = false;
      this.performance = new Performance(this);
      this.graphics = new Graphics(this, canvas);
      this.controls = new Controls(this);
      this.width = this.graphics.width;
      this.height = this.graphics.height;
      this.start_level();
      this.start();
      return this;
    };
    Game.prototype.start = function() {
      this.performance.init();
      this.main_interval = setInterval(__bind(function() {
        return this.step();
      }, this), this.performance.step_time);
      return (this.running = true);
    };
    Game.prototype.stop = function() {
      clearInterval(this.main_interval);
      return (this.running = false);
    };
    Game.prototype.step = function() {
      this.protagonist.step();
      this.trail.step();
      this.draw();
      return this.performance.check();
    };
    Game.prototype.start_level = function() {
      this.protagonist = new Rocket(this, this.width / 2, this.height / 2);
      this.trail || (this.trail = new Trail(this));
      return (this.trail.owner = this.protagonist);
    };
    Game.prototype.draw = function() {
      this.graphics.clear();
      this.protagonist.draw(this.graphics);
      return this.trail.draw(this.graphics);
    };
    return Game;
  }, this));
})();
