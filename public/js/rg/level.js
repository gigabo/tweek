(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/rocket', 'rg/banner', 'rg/goal', 'rg/barrier', 'rg/score_manager', 'rg/score', 'rg/debug'], __bind(function(Rocket, Banner, Goal, Barrier, ScoreManager, Score, Debug) {
    var Level;
    Level = function(_a) {
      this.game = _a;
      this.start_x = this.game.width / 2;
      this.start_y = this.game.height;
      this.goals = [];
      this.barriers = [];
      this.objects = [];
      this.scores = [];
      this.messages = [];
      this.score_manager = new ScoreManager(this.game);
      this.success_message = "Success!";
      this.done = true;
      this.init();
      this.init_protagonist();
      this.init_scores();
      this.set_message();
      this.bundle_objects();
      return this;
    };
    Level.prototype.starting_position = function() {
      return [this.start_x, this.start_y];
    };
    Level.prototype.init_protagonist = function() {
      var _a, x, y;
      _a = this.starting_position();
      x = _a[0];
      y = _a[1];
      return (this.protagonist = new Rocket(this.game, x, y));
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
      var _a, _b, _c, _d, _e, _f, _g, _h, collection, item;
      _a = []; _c = [this.goals, this.barriers, this.scores, [this.protagonist]];
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        collection = _c[_b];
        _a.push((function() {
          _e = []; _g = collection;
          for (_f = 0, _h = _g.length; _f < _h; _f++) {
            item = _g[_f];
            _e.push(this.objects.push(item));
          }
          return _e;
        }).call(this));
      }
      return _a;
    };
    Level.prototype.init_scores = function() {
      var _a, _b, _c, _d, type;
      this.score_manager.reset();
      _a = []; _c = this.score_manager.types();
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        type = _c[_b];
        _a.push((function() {
          if (!(this.suppress_score(type))) {
            return this.add_score(type);
          }
        }).call(this));
      }
      return _a;
    };
    Level.prototype.add_goal = function(x, y, r) {
      return this.goals.push(new Goal(this.game, x, y, r));
    };
    Level.prototype.add_barrier = function(x, y, r) {
      return this.barriers.push(new Barrier(this.game, x, y, r));
    };
    Level.prototype.add_score = function(type) {
      return this.scores.push(new Score(this.game, type));
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
      var _a, _b, _c, _d, _e, _f, _g, _h, collection, item;
      _a = []; _c = [this.goals, this.barriers, this.scores, [this.protagonist]];
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        collection = _c[_b];
        _a.push((function() {
          _e = []; _g = collection;
          for (_f = 0, _h = _g.length; _f < _h; _f++) {
            item = _g[_f];
            _e.push(item.reset());
          }
          return _e;
        })());
      }
      return _a;
    };
    Level.prototype.outro_done = function() {
      var _a, _b, _c, item;
      _b = this.objects;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        item = _b[_a];
        if (item.outro_done && !item.outro_done()) {
          return false;
        }
      }
      return true;
    };
    Level.prototype.outro_step = function() {
      var _a, _b, _c, _d, item;
      _a = []; _c = this.objects;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        item = _c[_b];
        _a.push((function() {
          if (item.outro_step && !item.outro_done()) {
            return item.outro_step();
          }
        })());
      }
      return _a;
    };
    Level.prototype.outro_draw = function(graphics) {
      var _a, _b, _c, _d, item;
      _a = []; _c = this.objects;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        item = _c[_b];
        _a.push((function() {
          if (item.outro_draw) {
            return item.outro_draw(graphics);
          }
        })());
      }
      return _a;
    };
    Level.prototype.suppress_score = function() {
      return false;
    };
    return Level;
  }, this));
})();
