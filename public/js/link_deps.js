(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  $(document).ready(__bind(function() {
    return $(".highlight").find(".s1").each(__bind(function(i, e) {
      var newtext, text;
      text = $(e).text();
      if (text.match(/^'\w(\w|\/)+'$/)) {
        text = text.replace(/^'|'$/g, '');
        newtext = ("'<a href='/docs/coffee/" + (text) + ".html'>" + (text) + "</a>'");
        return $(e).html(newtext);
      }
    }, this));
  }, this));
})();
