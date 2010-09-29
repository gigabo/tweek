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
    var Level_1;
    Level_1 = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_1, Level);
    Level_1.prototype.init = function() {
      var _a, _b, _c, _d, _e, _f, _g, _h, barrier, goal, h, i, r, w, x, y;
      i = 100;
      w = this.game.width / 2;
      h = this.game.height / 2;
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
      w = this.game.width / 2;
      h = this.game.height / 2;
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
    return Level_1;
  }, this));
})();
