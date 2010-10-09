(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var ScoreTime;
    ScoreTime = function(_a) {
      this.game = _a;
      this.x = this.game.width / 5;
      this.step_time = this.game.performance.step_time;
      this.reset();
      return this;
    };
    ScoreTime.prototype.reset = function() {
      this.value = 0;
      return (this.in_finish = false);
    };
    ScoreTime.prototype.step = function() {
      if (!(this.finishing())) {
        return this.value += this.step_time;
      }
    };
    ScoreTime.prototype.x_pos = function() {
      return this.x;
    };
    ScoreTime.prototype.color = function() {
      return "rgba(255, 0, 0, 1)";
    };
    ScoreTime.prototype.finishing = function() {
      if (this.game.finishing()) {
        this.in_finish = true;
      }
      return this.in_finish;
    };
    return ScoreTime;
  }, this));
})();