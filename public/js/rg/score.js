(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug', 'rg/score_manager'], __bind(function(Debug, ScoreManager) {
    var Score;
    Score = function(_a, _b) {
      this.type = _b;
      this.game = _a;
      this.hidden = false;
      this.off_screen = false;
      this.waiting = 0;
      this.wait = 50;
      this.slide_stride = 10;
      this.outro_stride = 20;
      this.hud_on_y_pos = this.game.height - 20;
      this.hud_off_y_pos = this.game.height + 20;
      this.y_pos = this.game.show_hud() ? this.hud_on_y_pos : this.hud_off_y_pos;
      this.queue = [];
      this.manager = new ScoreManager();
      if (this.type !== 'total') {
        this.manager.register(this);
      }
      this.load_strategy();
      return this;
    };
    Score.prototype.load_strategy = function() {
      return require([("rg/score_" + (this.type))], __bind(function(Strategy) {
        return (this.strategy = new Strategy(this.game));
      }, this));
    };
    Score.prototype.value = function() {
      return this.strategy.value;
    };
    Score.prototype.hide = function() {
      return (this.hidden = true);
    };
    Score.prototype.dispatch = function(method) {
      var catchup;
      if (this.strategy) {
        if (this.queue) {
          while (catchup = this.queue.shift()) {
            this.strategy[catchup]();
          }
          this.queue = false;
        }
        return this.strategy[method]();
      } else {
        return this.queue.push(method);
      }
    };
    Score.prototype.reset = function() {
      return this.dispatch('reset');
    };
    Score.prototype.step = function() {
      this.off_screen = false;
      if (this.game.show_hud()) {
        if (this.y_pos > this.hud_on_y_pos) {
          this.y_pos -= this.slide_stride;
        }
      } else {
        if (this.y_pos < this.hud_off_y_pos) {
          this.y_pos += this.slide_stride;
        } else {
          this.off_screen = true;
        }
      }
      return this.dispatch('step');
    };
    Score.prototype.draw = function(graphics) {
      var ctx;
      if (this.hidden || (this.off_screen && !this.game.in_transition())) {
        return null;
      }
      ctx = graphics.ctx;
      ctx.font = "20pt Verdana";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this.strategy.color();
      return graphics.text(this.strategy.value, this.strategy.x_pos(), this.y_pos);
    };
    Score.prototype.outro_step = function() {
      if (this.waiting === 0) {
        return this.y_pos -= this.outro_stride;
      }
    };
    Score.prototype.outro_draw = function(g) {
      return this.draw(g);
    };
    Score.prototype.outro_done = function() {
      return this.hidden || ((this.y_pos < this.game.height / 2) && (++this.waiting >= this.wait));
    };
    return Score;
  }, this));
})();
