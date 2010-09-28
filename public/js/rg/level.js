(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/banner', 'rg/goal', 'rg/barrier', 'rg/debug'], __bind(function(Banner, Goal, Barrier, Debug) {
    var Level;
    Level = function(_a) {
      this.game = _a;
      this.start_x = this.game.width / 2;
      this.start_y = this.game.height;
      this.goals = [];
      this.barriers = [];
      this.objects = [];
      this.messages = [];
      this.success_message = "Success!";
      this.done = true;
      this.init();
      this.set_message();
      this.bundle_objects();
      return this;
    };
    Level.prototype.starting_position = function() {
      return [this.start_x, this.start_y];
    };
    Level.prototype.set_message = function() {
      if (this.messages && this.messages.length) {
        this.message_banner = new Banner(this.game, this.messages.shift());
        return this.message_banner.fade();
      } else {
        return (this.message_banner = undefined);
      }
    };
    Level.prototype.bundle_objects = function() {
      var _a, _b, _c, _d, _e, _f, _g, barrier, goal;
      _b = this.goals;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        goal = _b[_a];
        this.objects.push(goal);
      }
      _d = []; _f = this.barriers;
      for (_e = 0, _g = _f.length; _e < _g; _e++) {
        barrier = _f[_e];
        _d.push(this.objects.push(barrier));
      }
      return _d;
    };
    Level.prototype.add_goal = function(x, y, r) {
      return this.goals.push(new Goal(this.game, x, y, r));
    };
    Level.prototype.add_barrier = function(x, y, r) {
      return this.barriers.push(new Barrier(this.game, x, y, r));
    };
    Level.prototype.step = function() {
      var _a, _b, _c, obj;
      _b = this.objects;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        obj = _b[_a];
        obj.step();
      }
      if (this.message_banner) {
        this.message_banner.step();
        return this.message_banner.done() ? this.set_message() : null;
      }
    };
    Level.prototype.draw = function(graphics) {
      var _a, _b, _c, obj;
      _b = this.objects;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        obj = _b[_a];
        obj.draw(graphics);
      }
      return this.message_banner ? this.message_banner.draw(graphics) : null;
    };
    Level.prototype.won = function() {
      var _a, _b, _c, goal;
      if (this.done) {
        _b = this.goals;
        for (_a = 0, _c = _b.length; _a < _c; _a++) {
          goal = _b[_a];
          if (!goal.done()) {
            return false;
          }
        }
        this.messages = [this.success_message];
        this.set_message();
        return true;
      }
    };
    Level.prototype.begin = function() {
      var _a, _b, _c, _d, _e, _f, _g, barrier, goal;
      _b = this.goals;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        goal = _b[_a];
        goal.reset();
      }
      _d = []; _f = this.barriers;
      for (_e = 0, _g = _f.length; _e < _g; _e++) {
        barrier = _f[_e];
        _d.push(barrier.reset());
      }
      return _d;
    };
    return Level;
  }, this));
})();
