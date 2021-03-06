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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, circle, h, i, r, w, x, y;
      this.title = "Be quick.";
      this.highlight_score = 'time';
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
      _e = []; _g = [[w, h, r]];
      for (_f = 0, _h = _g.length; _f < _h; _f++) {
        circle = _g[_f];
        _e.push((function() {
          _i = circle;
          x = _i[0];
          y = _i[1];
          r = _i[2];
          return this.add_barrier(x, y, r);
        }).call(this));
      }
      return _e;
    };
    return Level_3;
  }, this));
})();
