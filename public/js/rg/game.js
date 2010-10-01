(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/controls', 'rg/performance', 'rg/graphics', 'rg/player', 'rg/debug'], __bind(function(Controls, Performance, Graphics, Player, Debug) {
    var ADVANCING, FINISHING, Game, IN_LEVEL, OUTRO, UNINITIALIZED;
    UNINITIALIZED = -1;
    IN_LEVEL = 0;
    FINISHING = 1;
    OUTRO = 2;
    ADVANCING = 3;
    Game = function(canvas) {
      this.running = false;
      this.state = UNINITIALIZED;
      this.previous_state = UNINITIALIZED;
      this.performance = new Performance(this);
      this.graphics = new Graphics(this, canvas);
      this.controls = new Controls(this);
      this.player = new Player(this);
      this.width = this.graphics.width;
      this.height = this.graphics.height;
      this.level_number = 0;
      this.max_level = 7;
      this.hud_on = true;
      this.start();
      return this;
    };
    Game.prototype.finishing = function() {
      return this.state === FINISHING;
    };
    Game.prototype.in_outro = function() {
      return this.state === OUTRO;
    };
    Game.prototype.change_state = function(new_state) {
      this.previous_state = this.state;
      return (this.state = new_state);
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
    Game.prototype.level_step = function() {
      if (this.level.won()) {
        this.change_state(FINISHING);
      }
      this.level.step();
      return this.draw();
    };
    Game.prototype.step = function() {
      this.performance.check();
      switch (this.state) {
      case OUTRO:
        return this.outro_step();
      case IN_LEVEL:
      case FINISHING:
        return this.level_step();
      case ADVANCING:
        return this.advance_level();
      default:
        return this.init_level();
      }
    };
    Game.prototype.outro_step = function() {
      if (this.level.outro_done()) {
        return this.change_state(ADVANCING);
      } else {
        this.level.outro_step();
        return this.draw();
      }
    };
    Game.prototype.begin_level = function() {
      if (this.state === FINISHING) {
        return this.change_state(OUTRO);
      } else {
        this.level.begin();
        return this.change_state(IN_LEVEL);
      }
    };
    Game.prototype.advance_level = function() {
      this.level_number += 1;
      if (this.level_number > this.max_level) {
        this.level_number = "last";
      }
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
      switch (this.state) {
      case OUTRO:
        return this.level.outro_draw(this.graphics);
      default:
        return this.level.draw(this.graphics);
      }
    };
    Game.prototype.show_hud = function() {
      switch (this.state) {
      case IN_LEVEL:
      case FINISHING:
        return this.hud_on;
      default:
        return false;
      }
    };
    Game.prototype.toggle_hud = function() {
      return (this.hud_on = this.hud_on ? false : true);
    };
    return Game;
  }, this));
})();
