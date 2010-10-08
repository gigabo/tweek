(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var ID;
    ID = 'debug';
    return {
      id: function(id) {
        if (id) {
          ID = id;
        }
        return ID;
      },
      clear: function() {
        return $("#" + (ID)).empty();
      },
      out: function(v) {
        return $("#" + (ID)).append(v);
      }
    };
  }, this));
})();
