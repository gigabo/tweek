(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var Controls;
    Controls = function(_a) {
      this.game = _a;
      this.t_on = true;
      this.rot_l = false;
      this.rot_r = false;
      this.init();
      return this;
    };
    Controls.prototype.init = function() {
      $(document).keydown(__bind(function(e) {
        switch (e.keyCode) {
        case 37:
          return (this.rot_l = true);
        case 39:
          return (this.rot_r = true);
        case 32:
          return (this.t_on = false);
        }
      }, this));
      return $(document).keyup(__bind(function(e) {
        switch (e.keyCode) {
        case 37:
          return (this.rot_l = false);
        case 39:
          return (this.rot_r = false);
        case 32:
          return (this.t_on = true);
        case 80:
        case 81:
          return this.game.running ? this.game.stop() : this.game.start();
        }
      }, this));
    };
    Controls.prototype.thrust_on = function() {
      return this.t_on;
    };
    Controls.prototype.rotate_l = function() {
      return this.rot_l && !this.game.advancing;
    };
    Controls.prototype.rotate_r = function() {
      return this.rot_r && !this.game.advancing;
    };
    return Controls;
  }, this));
})();
