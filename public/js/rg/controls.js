(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var Controls;
    Controls = function(_a) {
      this.game = _a;
      this.space = false;
      this.left = false;
      this.right = false;
      this.up = false;
      this.down = false;
      this.init();
      return this;
    };
    Controls.prototype.init = function() {
      $(document).keydown(__bind(function(e) {
        switch (e.keyCode) {
        case 37:
          return (this.left = true);
        case 39:
          return (this.right = true);
        case 38:
          return (this.up = true);
        case 40:
          return (this.down = true);
        case 32:
          return (this.space = true);
        }
      }, this));
      return $(document).keyup(__bind(function(e) {
        switch (e.keyCode) {
        case 37:
          return (this.left = false);
        case 39:
          return (this.right = false);
        case 38:
          return (this.up = false);
        case 40:
          this.down = false;
          return this.game.toggle_hud();
        case 32:
          return (this.space = false);
        case 80:
        case 81:
          return this.game.running ? this.game.stop() : this.game.start();
        }
      }, this));
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
    return Controls;
  }, this));
})();
