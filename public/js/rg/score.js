(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug', 'rg/score_manager'], __bind(function(Debug, ScoreManager) {
    var Score;
    Score = function(_a, _b) {
      this.type = _b;
      this.game = _a;
      this.off_screen = false;
      this.slide_stride = 10;
      this.wait = 0;
      this.outro_wait = 20;
      this.hud_on_y_pos = this.game.height - 20;
      this.hud_off_y_pos = this.game.height + 20;
      this.y_pos = this.game.hud_on ? this.hud_on_y_pos : this.hud_off_y_pos;
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
      this.dispatch('step');
      return this.highlight ? (this.y_pos = this.hud_on_y_pos) : (this.game.show_hud() ? this.raise() : (this.y_pos < this.hud_off_y_pos ? this.y_pos += this.slide_stride : (this.off_screen = true)));
    };
    Score.prototype.raise = function() {
      if (this.y_pos > this.hud_on_y_pos) {
        this.y_pos -= this.slide_stride;
      }
      return this.y_pos < this.hud_on_y_pos ? (this.y_pos = this.hud_on_y_pos) : null;
    };
    Score.prototype.draw = function(graphics) {
      var ctx;
      if (this.off_screen && !this.game.in_transition() && !this.highlight) {
        return null;
      }
      ctx = graphics.ctx;
      ctx.font = "20pt Verdana";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = this.strategy.color();
      graphics.text(this.strategy.value, this.strategy.x_pos(), this.y_pos);
      if (this.highlight) {
        ctx.strokeStyle = this.strategy.color();
        ctx.lineWidth = 5;
        return graphics.rect_stroke_rounded(this.strategy.x_pos() - 100, this.y_pos - 22, 200, 40, 10);
      }
    };
    Score.prototype.outro_step = function() {
      return this.raise();
    };
    Score.prototype.outro_draw = function(g) {
      return this.draw(g);
    };
    Score.prototype.outro_done = function() {
      return (this.y_pos <= this.hud_on_y_pos) && (this.game.hud_on || this.wait++ > this.outro_wait);
    };
    return Score;
  }, this));
})();
