(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var Player;
    Player = function(_a) {
      this.game = _a;
      this.enabled_scores = {};
      return this;
    };
    Player.prototype.suppress_score = function(type) {
      return !this.enabled_scores[type];
    };
    Player.prototype.enable_score = function(type) {
      return (this.enabled_scores[type] = true);
    };
    return Player;
  }, this));
})();
