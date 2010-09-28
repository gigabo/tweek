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
      this.messages = ["Calibrating...."];
      this.ready = false;
      return (this.done = false);
    };
    Level_0.prototype.step = function() {
      if (!this.game.performance.lock && this.game.performance.check_frames > 10) {
        this.game.performance.lock = true;
        this.messages = ["Ready!", "(Crash to continue...)"];
        this.ready = true;
      }
      return Level_0.__super__.step.apply(this, arguments);
    };
    Level_0.prototype.begin = function() {
      if (this.ready) {
        this.done = true;
      }
      return Level_0.__super__.begin.apply(this, arguments);
    };
    Level_0.prototype.won = function() {
      return this.done;
    };
    return Level_0;
  }, this));
})();
