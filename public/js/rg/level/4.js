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
    var Level_4;
    Level_4 = function() {
      return Level.apply(this, arguments);
    };
    __extends(Level_4, Level);
    Level_4.prototype.starting_position = function() {
      return [100, this.start_y];
    };
    Level_4.prototype.init = function() {
      var _a, _b, _c, _d, _e, circle, h, i, r, w, x, y;
      this.title = "Take your time on the finish.";
      this.game.player.enable_feature('score_finish');
      w = this.game.width / 2;
      h = this.game.height / 2;
      i = 50;
      r = 20;
      _a = []; _c = [[w, h + i, r]];
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        circle = _c[_b];
        _a.push((function() {
          _e = circle;
          x = _e[0];
          y = _e[1];
          r = _e[2];
          return this.add_goal(x, y, r);
        }).call(this));
      }
      return _a;
    };
    return Level_4;
  }, this));
})();
