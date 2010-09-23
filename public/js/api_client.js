(function() {
  var api_go, init_controls;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  init_controls = function() {
    $("#play_container").append("<input type='text' spellcheck='false' id='api_query'>");
    $("#play_container").append("<input id='api_go' type='button' value='Go'>");
    $("#play_container").append("<pre id='api_result'></pre>");
    $("#api_go").click(api_go);
    $("#api_query").width("90%");
    $("#api_query").focus();
    return $("#api_query").keydown(__bind(function(evt) {
      return evt.keyCode === 13 ? api_go() : null;
    }, this));
  };
  api_go = function() {
    var query;
    query = $("#api_query").val();
    return $.getJSON("/api/json/" + (query), __bind(function(res) {
      var dump;
      dump = $.dump(res);
      $("#api_result").empty();
      return dump.length ? $("#api_result").append("" + (dump) + "\n") : $("#api_result").append("No response.\n");
    }, this));
  };
  $(document).ready(__bind(function() {
    $("#play_canvas").remove();
    return $.getScript("/js/jquery.tweekdump.js", init_controls);
  }, this));
})();
