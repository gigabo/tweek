(function() {
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  }, __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/level', 'rg/debug'], __bind(function(Level, Debug) {
    var Level_oops;
    Level_oops = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_oops, Level);
    Level_oops.prototype.init = function() {
      this.title = "Oops. Something went wrong... :(";
      return (this.no_score = true);
    };
    Level_oops.prototype.won = function() {
      return false;
    };
    return Level_oops;
  }, this));
})();
