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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, barrier, goal, h, i, r, w, x, y;
      this.title = "Blue shapes are barriers.";
      this.messages = ["Don't hit them."];
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
      i = 250;
      r = 30;
      _e = []; _g = [[w - i, h, r], [w + i, h, r], [w, h - i, r], [w, h + i, r]];
      for (_f = 0, _h = _g.length; _f < _h; _f++) {
        barrier = _g[_f];
        _e.push((function() {
          _i = barrier;
          x = _i[0];
          y = _i[1];
          r = _i[2];
          return this.add_barrier(x, y, r);
        }).call(this));
      }
      return _e;
    };
    Level_2.prototype.suppress_score = function() {
      return true;
    };
    return Level_2;
  }, this));
})();
