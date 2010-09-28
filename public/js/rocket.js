(function() {
  var init;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  init = function() {
    var canvas;
    canvas = $("#play_canvas");
    $("#canvas_container").append("<br>Arrows steer.");
    return require(['rg_game'], __bind(function(Game) {
      return new Game(canvas);
    }, this));
  };
  $(document).ready(init);
})();
