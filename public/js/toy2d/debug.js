// Generated by CoffeeScript 1.8.0
(function() {
  require.def((function(_this) {
    return function() {
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
          return $("#" + ID).empty();
        },
        out: function(v) {
          return $("#" + ID).append(v);
        }
      };
    };
  })(this));

}).call(this);
