(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var ScoreTime;
    ScoreTime = function(_a) {
      this.game = _a;
      this.x = this.game.width / 5 * 3;
      this.flipflop = true;
      this.step_time = this.game.performance.step_time;
      this.reset();
      return this;
    };
    ScoreTime.prototype.reset = function() {
      this.value = 0;
      return (this.flipflop = true);
    };
    ScoreTime.prototype.step = function() {
      var dial, upside_down;
      dial = this.game.protagonist.dial;
      upside_down = this.game.protagonist.rot_ticks / 2;
      if (dial === 0) {
        return (this.flipflop = true);
      } else if (dial === upside_down && this.flipflop) {
        this.flipflop = false;
        return this.value -= 1000;
      }
    };
    ScoreTime.prototype.x_pos = function() {
      return this.x;
    };
    ScoreTime.prototype.color = function() {
      return "rgba(0, 0, 255, 1)";
    };
    return ScoreTime;
  }, this));
})();
