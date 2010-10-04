(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var Dialog, INTRO, MIDRO, OUTRO;
    INTRO = 0;
    MIDRO = 1;
    OUTRO = 2;
    Dialog = function(_a, _b, _c, _d) {
      this.start = _d;
      this.height = _c;
      this.width = _b;
      this.game = _a;
      this.title = "Use Arrow Keys";
      this.init_dimensions();
      this.init_controls();
      return this;
    };
    Dialog.prototype.init_controls = function() {
      var _a, _b, _c, dir;
      this.directions = ['up', 'down', 'left', 'right'];
      this.was_up = {};
      this.options = {};
      _b = this.directions;
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        dir = _b[_a];
        this.was_up[dir] = !this.game.controls[dir];
      }
      return (this.listener = this.game.controls.add_listener(__bind(function() {
        return this.check_controls();
      }, this)));
    };
    Dialog.prototype.check_controls = function() {
      var _a, _b, _c, _d, dir, is_down;
      _a = []; _c = this.directions;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        dir = _c[_b];
        _a.push((function() {
          is_down = this.game.controls[dir];
          if (!(is_down)) {
            this.was_up[dir] = true;
          }
          if (is_down && this.options[dir] && this.was_up[dir]) {
            this.selected = dir;
            this.end = this.opposite[dir];
            this.game.controls.remove_listener(this.listener);
            this.pre_x = (this.pre_y = 99999999);
            this.phase = OUTRO;
            return this.game.start();
          }
        }).call(this));
      }
      return _a;
    };
    Dialog.prototype.set_title = function(_a) {
      this.title = _a;
    };
    Dialog.prototype.option = function(direction, value) {
      return (this.options[direction] = value);
    };
    Dialog.prototype.done = function() {
      return this.x_pos === this.pre_x && this.y_pos === this.pre_y && this.phase === OUTRO;
    };
    Dialog.prototype.started = function() {
      return this.have_stepped;
    };
    Dialog.prototype.step = function() {
      this.have_stepped = true;
      this.pre_x = this.x_pos;
      this.pre_y = this.y_pos;
      switch (this.phase) {
      case INTRO:
        if (this.x_pos > this.show_x) {
          this.x_pos -= this.slide_stride[this.start];
        }
        if (this.x_pos < this.show_x) {
          this.x_pos += this.slide_stride[this.start];
        }
        if (this.y_pos > this.show_y) {
          this.y_pos -= this.slide_stride[this.start];
        }
        if (this.y_pos < this.show_y) {
          this.y_pos += this.slide_stride[this.start];
        }
        return this.x_pos === this.pre_x && this.y_pos === this.pre_y ? (this.phase = MIDRO) : null;
      case MIDRO:
        return this.game.stop();
      case OUTRO:
        if (this.x_pos > this.hide_x[this.end]) {
          this.x_pos -= this.slide_stride[this.end];
        }
        if (this.x_pos < this.hide_x[this.end]) {
          this.x_pos += this.slide_stride[this.end];
        }
        if (this.y_pos > this.hide_y[this.end]) {
          this.y_pos -= this.slide_stride[this.end];
        }
        return this.y_pos < this.hide_y[this.end] ? this.y_pos += this.slide_stride[this.end] : null;
      }
    };
    Dialog.prototype.draw = function(graphics) {
      var _a, _b, _c, _d, align, baseline, ctx, d, dir, option, x, y;
      ctx = graphics.ctx;
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(255, 255, 255, .5)";
      graphics.rect_stroke_rounded(this.x_pos, this.y_pos, this.width, this.height, this.corner_radius);
      ctx.font = "28pt Verdana";
      ctx.fillStyle = "rgba(255, 255, 255, .8)";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      graphics.text(this.title, this.x_pos + this.width / 2, this.y_pos - 10);
      d = 100;
      align = {
        left: "left",
        right: "right",
        up: "center",
        down: "center"
      };
      baseline = {
        left: "middle",
        right: "middle",
        up: "top",
        down: "bottom"
      };
      x = {
        left: d,
        right: this.width - d,
        up: this.width / 2,
        down: this.width / 2
      };
      y = {
        left: this.height / 2,
        right: this.height / 2,
        up: d,
        down: this.height - d
      };
      _a = []; _c = this.directions;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        dir = _c[_b];
        _a.push((function() {
          if (option = this.options[dir]) {
            ctx.textAlign = align[dir];
            ctx.textBaseline = baseline[dir];
            graphics.text(option, this.x_pos + x[dir], this.y_pos + y[dir]);
            return graphics.arrow(this.x_pos + x[dir], this.y_pos + y[dir], d, dir);
          }
        }).call(this));
      }
      return _a;
    };
    Dialog.prototype.init_dimensions = function() {
      if (!(this.start)) {
        this.start = 'top';
      }
      this.end = 'top';
      this.show_y = this.game.height / 2 - this.height / 2;
      this.show_x = this.game.width / 2 - this.width / 2;
      this.hide_y = {
        top: this.height * -1,
        bottom: this.game.height,
        left: this.show_y,
        right: this.show_y
      };
      this.hide_x = {
        top: this.show_x,
        bottom: this.show_x,
        left: this.width * -1,
        right: this.game.width
      };
      this.opposite = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };
      this.slide_frames = 5;
      this.slide_stride = {
        top: (this.show_y - this.hide_y.top) / this.slide_frames,
        left: (this.show_x - this.hide_x.left) / this.slide_frames
      };
      this.slide_stride.bottom = this.slide_stride.top;
      this.slide_stride.right = this.slide_stride.left;
      this.phase = INTRO;
      this.x_pos = this.hide_x[this.start];
      this.y_pos = this.hide_y[this.start];
      return (this.corner_radius = this.width / 20);
    };
    return Dialog;
  }, this));
})();
