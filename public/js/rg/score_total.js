(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug', 'rg/score_manager'], __bind(function(Debug, ScoreManager) {
    var ScoreTotal;
    ScoreTotal = function(_a) {
      this.game = _a;
      this.x = this.game.width / 5 * 4;
      this.step_time = this.game.performance.step_time;
      this.manager = new ScoreManager();
      this.reset();
      return this;
    };
    ScoreTotal.prototype.reset = function() {
      return (this.value = "= 0");
    };
    ScoreTotal.prototype.step = function() {
      return (this.value = ("= " + (this.manager.total())));
    };
    ScoreTotal.prototype.x_pos = function() {
      return this.x;
    };
    ScoreTotal.prototype.color = function() {
      return "rgba(255, 255, 0, 1)";
    };
    return ScoreTotal;
  }, this));
})();
