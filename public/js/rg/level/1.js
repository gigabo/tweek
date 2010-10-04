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
    var Level_1;
    Level_1 = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_1, Level);
    Level_1.prototype.init = function() {
      var _a, _b, _c, _d, _e, goal, h, i, r, w, x, y;
      this.title = "Arrows steer.";
      this.messages = ["Turn red to green."];
      i = 100;
      w = this.game.width / 2;
      h = this.game.height / 2;
      r = 30;
      _a = []; _c = [[w + i, h + i, r], [w - i, h + i, r], [w + i, h - i, r], [w - i, h - i, r]];
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        goal = _c[_b];
        _a.push((function() {
          _e = goal;
          x = _e[0];
          y = _e[1];
          r = _e[2];
          return this.add_goal(x, y, r);
        }).call(this));
      }
      return _a;
    };
    return Level_1;
  }, this));
})();
