(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  if (tweek_toy) {
    $(document).ready(__bind(function() {
      return require([("toy/" + (tweek_toy))], __bind(function(T) {
        return new T();
      }, this));
    }, this));
  }
})();
