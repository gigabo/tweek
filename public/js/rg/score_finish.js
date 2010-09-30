(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var ScoreTime;
    ScoreTime = function(_a) {
      this.game = _a;
      this.x = this.game.width / 5 * 2;
      this.step_time = this.game.performance.step_time;
      this.reset();
      return this;
    };
    ScoreTime.prototype.reset = function() {
      return (this.value = 0);
    };
    ScoreTime.prototype.step = function() {
      if (this.game.finishing()) {
        return this.value -= this.step_time;
      }
    };
    ScoreTime.prototype.x_pos = function() {
      return this.x;
    };
    ScoreTime.prototype.color = function() {
      return "rgba(0, 255, 0, 1)";
    };
    return ScoreTime;
  }, this));
})();
