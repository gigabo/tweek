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
  require.def(['rg/debug', 'rg/space_circle'], __bind(function(Debug, SpaceCircle) {
    var Goal;
    Goal = function() {
      return SpaceCircle.apply(this, arguments);
    };
    __extends(Goal, SpaceCircle);
    Goal.prototype.red = function() {
      return this.hit ? 0 : 255;
    };
    Goal.prototype.green = function() {
      return this.hit ? 255 : 0;
    };
    return Goal;
  }, this));
})();
