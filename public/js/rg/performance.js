(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var Performance;
    Performance = function(_a) {
      this.game = _a;
      this.res = 1;
      this.check_frames = 2;
      this.init();
      this.lock = false;
      return this;
    };
    Performance.prototype.init = function() {
      this.frame_count = 0;
      this.step_time = 33;
      return (this.base_time = (new Date()).getTime());
    };
    Performance.prototype.check = function() {
      var elapsed, now, shrink_threshold;
      if (!this.lock && ++this.frame_count === this.check_frames) {
        now = (new Date()).getTime();
        elapsed = now - this.base_time;
        shrink_threshold = (this.check_frames * this.step_time) * 1.1;
        if (elapsed > shrink_threshold) {
          this.res *= .99;
          if (this.res < .3) {
            this.too_slow();
          }
          this.game.graphics.update_canvas_width();
          if (this.check_frames > 1) {
            this.check_frames--;
          }
        } else {
          this.check_frames++;
        }
        return this.init();
      }
    };
    Performance.prototype.too_slow = function() {
      this.game.stop();
      $("#canvas_container").empty();
      return $("#canvas_container").append("Sorry, your browser seems to be too slow to play this game.");
    };
    return Performance;
  }, this));
})();
