var game = undefined;
(function() {
  var canvas, init, performance, trail;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  canvas = undefined;
  trail = undefined;
  performance = undefined;
  init = function() {
    canvas = $("#play_canvas");
    $("#canvas_container").append("<br>Arrows steer.");
    return require(['rg_game'], __bind(function(Game) {
      return (game = new Game(canvas));
    }, this));
  };
  $(document).ready(init);
})();
