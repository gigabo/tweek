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
    var Level_0;
    Level_0 = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_0, Level);
    Level_0.prototype.init = function() {
      this.title = "Calibrating....";
      this.success_message = "Ready!";
      this.done = this.game.performance.lock;
      return (this.no_score = true);
    };
    Level_0.prototype.step = function() {
      if (!this.game.performance.lock && this.game.performance.check_frames > 10) {
        this.game.performance.lock = true;
        this.done = true;
      }
      return Level_0.__super__.step.apply(this, arguments);
    };
    return Level_0;
  }, this));
})();
