(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    return {
      clear: function() {
        return $("#debug").empty();
      },
      out: function(v) {
        return $("#debug").append(v);
      }
    };
  }, this));
})();
