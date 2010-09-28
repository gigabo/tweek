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
      return this;
    };
    Performance.prototype.init = function() {
      this.frame_count = 0;
      this.step_time = 50;
      return (this.base_time = (new Date()).getTime());
    };
    Performance.prototype.check = function() {
      var elapsed, grow_threshold, now, shrink_threshold;
      if (++this.frame_count === this.check_frames) {
        now = (new Date()).getTime();
        elapsed = now - this.base_time;
        shrink_threshold = (this.check_frames * this.step_time) * 1.1;
        grow_threshold = (this.check_frames * this.step_time) * 1.05;
        if (elapsed > shrink_threshold) {
          this.res *= .99;
          if (this.res < .2) {
            this.too_slow();
          }
          this.game.graphics.update_canvas_width();
          if (this.check_frames > 1) {
            this.check_frames--;
          }
        } else if (elapsed < grow_threshold && this.res < 1) {
          this.res *= 1.001;
          if (this.res > 1) {
            this.res = 1;
          }
        } else {
          if (this.check_frames < 50) {
            this.check_frames++;
          }
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