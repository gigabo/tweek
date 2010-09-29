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
    var Level_last;
    Level_last = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_last, Level);
    Level_last.prototype.init = function() {
      return (this.messages = ["That's all of the levels for now.", "Thanks for playing."]);
    };
    Level_last.prototype.won = function() {
      return false;
    };
    Level_last.prototype.suppress_score = function() {
      return true;
    };
    return Level_last;
  }, this));
})();
