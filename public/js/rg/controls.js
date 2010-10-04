(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var Controls;
    Controls = function(_a) {
      this.game = _a;
      this.init();
      return this;
    };
    Controls.prototype.add_listener = function(f) {
      var id;
      id = this.listener_id_seq++;
      this.listeners[id] = f;
      return id;
    };
    Controls.prototype.remove_listener = function(id) {
      return delete this.listeners[id];
    };
    Controls.prototype.handle_event = function(key, down) {
      var _a, _b, _c, _d, listener, mapped;
      mapped = this.map[key];
      this[mapped] = down;
      if (!(down)) {
        switch (mapped) {
        case 'down':
          this.game.toggle_hud();
          break;
        case 'p':
        case 'q':
          if (this.game.running) {
            this.game.stop();
          } else {
            this.game.start();
          }
          break;
        }
      }
      _a = []; _c = _(this.listeners).values();
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        listener = _c[_b];
        _a.push(listener());
      }
      return _a;
    };
    Controls.prototype.thrust_on = function() {
      return !this.space;
    };
    Controls.prototype.rotate_l = function() {
      return this.left && !this.game.finishing();
    };
    Controls.prototype.rotate_r = function() {
      return this.right && !this.game.finishing();
    };
    Controls.prototype.init = function() {
      this.init_map();
      this.listeners = {};
      this.listener_id_seq = 0;
      $(document).keydown(__bind(function(e) {
        return this.handle_event(e.keyCode, true);
      }, this));
      return $(document).keyup(__bind(function(e) {
        return this.handle_event(e.keyCode, false);
      }, this));
    };
    Controls.prototype.init_map = function() {
      this.space = false;
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
      this.p = (this.q = false);
      return (this.map = {
        37: 'left',
        39: 'right',
        38: 'up',
        40: 'down',
        32: 'space',
        80: 'p',
        81: 'q'
      });
    };
    return Controls;
  }, this));
})();
