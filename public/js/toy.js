(function() {
  var t;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  if (t = tweek_toy) {
    $(document).ready(__bind(function() {
      return require([("toy/" + (t))], __bind(function(T) {
        return new T($("#play_canvas"));
      }, this));
    }, this));
  }
})();
