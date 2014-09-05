// Generated by CoffeeScript 1.8.0
(function() {
  require.def((function(_this) {
    return function() {
      var Player;
      return Player = (function() {
        function Player(game) {
          this.game = game;
          this.enabled_features = {};
        }

        Player.prototype.suppress_feature = function(type) {
          return !this.enabled_features[type];
        };

        Player.prototype.enable_feature = function(type) {
          return this.enabled_features[type] = true;
        };

        return Player;

      })();
    };
  })(this));

}).call(this);
