(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/game'], __bind(function(Game) {
    var Wrapper;
    Wrapper = function() {
      new Game();
      return this;
    };
    return Wrapper;
  }, this));
})();
