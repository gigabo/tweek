// Generated by CoffeeScript 1.8.0
(function() {
  require.def(['rg/debug', 'rg/score_manager'], (function(_this) {
    return function(Debug, ScoreManager) {
      var ScoreTotal;
      return ScoreTotal = (function() {
        function ScoreTotal(game) {
          this.game = game;
          this.x = this.game.width / 5 * 4;
          this.step_time = this.game.performance.step_time;
          this.manager = new ScoreManager;
          this.reset();
        }

        ScoreTotal.prototype.reset = function() {
          return this.value = "= 0";
        };

        ScoreTotal.prototype.step = function() {
          return this.value = "= " + (this.manager.total());
        };

        ScoreTotal.prototype.x_pos = function() {
          return this.x;
        };

        ScoreTotal.prototype.color = function() {
          return "rgba(255, 255, 0, 1)";
        };

        return ScoreTotal;

      })();
    };
  })(this));

}).call(this);
