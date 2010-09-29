(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/score_time', 'rg/debug'], __bind(function(ScoreTime, Debug) {
    var ScoreManager, all_scores;
    all_scores = [];
    ScoreManager = function(_a) {
      this.game = _a;
      return this;
    };
    ScoreManager.prototype.types = function() {
      return ['time', 'finish', 'loops', 'total'];
    };
    ScoreManager.prototype.register = function(score) {
      return all_scores.push(score);
    };
    ScoreManager.prototype.reset = function() {
      return (all_scores = []);
    };
    ScoreManager.prototype.total = function() {
      var _a, _b, _c, score, total;
      total = 0;
      _b = all_scores;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        score = _b[_a];
        total += score.value();
      }
      return total;
    };
    return ScoreManager;
  }, this));
})();
