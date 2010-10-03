(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug', 'rg/dialog'], __bind(function(Debug, Dialog) {
    var Transition;
    Transition = function(_a) {
      this.game = _a;
      this.advance = (this.done = false);
      this.dialog = new Dialog(this.game, this.game.width * .75, this.game.height * .75);
      if (!(this.game.level.no_score)) {
        this.dialog.label('left', "Try Again");
      }
      this.dialog.label('right', "On to Level " + (this.game.level_number + 1));
      this.l_was_up = (this.r_was_up = false);
      this.finishing = false;
      return this;
    };
    Transition.prototype.step = function() {
      this.get_controls();
      if (this.dialog.finishing) {
        this.done = this.dialog.done();
      } else {
        if (this.l_down) {
          this.dialog.finishing = true;
        } else if (this.r_down) {
          this.advance = (this.dialog.finishing = true);
        }
      }
      return this.game.level.outro_done() ? this.dialog.step() : this.game.level.outro_step();
    };
    Transition.prototype.draw = function(graphics) {
      return this.game.level.outro_done() ? this.dialog.draw(graphics) : this.game.level.outro_draw(graphics);
    };
    Transition.prototype.get_controls = function() {
      this.l_down = this.game.controls.left;
      this.r_down = this.game.controls.right;
      if (!(this.l_down)) {
        this.l_was_up = true;
      }
      if (!(this.r_down)) {
        this.r_was_up = true;
      }
      if (!(this.l_was_up)) {
        this.l_down = false;
      }
      if (!(this.r_was_up)) {
        this.r_down = false;
      }
      if (this.game.level.no_score) {
        return (this.l_down = false);
      }
    };
    return Transition;
  }, this));
})();
