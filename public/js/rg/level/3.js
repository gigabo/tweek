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
    var Level_3;
    Level_3 = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_3, Level);
    Level_3.prototype.init = function() {
      var _a, _b, _c, _d, _e, _f, _g, _h, circle, h, i, r, w, x, y;
      w = this.game.width / 2;
      h = this.game.height / 2;
      i = 120;
      r = 20;
      _b = [[w, h - i, r]];
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        circle = _b[_a];
        _d = circle;
        x = _d[0];
        y = _d[1];
        r = _d[2];
        this.add_goal(x, y, r);
      }
      i = 20;
      r = 90;
      _f = [[w, h, r]];
      for (_e = 0, _g = _f.length; _e < _g; _e++) {
        circle = _f[_e];
        _h = circle;
        x = _h[0];
        y = _h[1];
        r = _h[2];
        this.add_barrier(x, y, r);
      }
      return (this.messages = ["Be quick."]);
    };
    Level_3.prototype.suppress_score = function(type) {
      return type === 'time' ? false : true;
    };
    return Level_3;
  }, this));
})();
