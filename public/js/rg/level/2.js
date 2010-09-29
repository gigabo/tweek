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
  require.def(['rg/level'], __bind(function(Level) {
    var Level_2;
    Level_2 = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_2, Level);
    Level_2.prototype.init = function() {
      var _a, _b, _c, _d, _e, _f, _g, _h, barrier, goal, h, i, r, w, x, y;
      w = this.game.width / 2;
      h = this.game.height / 2;
      i = 100;
      r = 30;
      _b = [[w + i, h + i, r], [w - i, h + i, r], [w + i, h - i, r], [w - i, h - i, r]];
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        goal = _b[_a];
        _d = goal;
        x = _d[0];
        y = _d[1];
        r = _d[2];
        this.add_goal(x, y, r);
      }
      i = 50;
      r = 30;
      _f = [[w - i, h, r], [w + i, h, r], [w, h - i, r], [w, h + i, r]];
      for (_e = 0, _g = _f.length; _e < _g; _e++) {
        barrier = _f[_e];
        _h = barrier;
        x = _h[0];
        y = _h[1];
        r = _h[2];
        this.add_barrier(x, y, r);
      }
      return (this.messages = ["Blue circles are barriers.", "Don't hit them."]);
    };
    Level_2.prototype.suppress_score = function() {
      return true;
    };
    return Level_2;
  }, this));
})();
