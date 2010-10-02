(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var Player;
    Player = function(_a) {
      this.game = _a;
      this.enabled_features = {};
      return this;
    };
    Player.prototype.suppress_feature = function(type) {
      return !this.enabled_features[type];
    };
    Player.prototype.enable_feature = function(type) {
      return (this.enabled_features[type] = true);
    };
    return Player;
  }, this));
})();
