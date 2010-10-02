(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['rg/debug'], __bind(function(Debug) {
    var Dialog;
    Dialog = function(_a, _b, _c) {
      this.height = _c;
      this.width = _b;
      this.game = _a;
      this.y_hidden = this.height * -1;
      this.y_shown = this.game.height / 2 - this.height / 2;
      this.slide_stride = (this.y_shown - this.y_hidden) / 5;
      this.y_pos = this.y_hidden;
      this.x_pos = this.game.width / 2 - this.width / 2;
      this.corner_radius = this.width / 20;
      this.directions = ['up', 'down', 'left', 'right'];
      this.labels = {};
      return this;
    };
    Dialog.prototype.label = function(direction, value) {
      return (this.labels[direction] = value);
    };
    Dialog.prototype.done = function() {
      return this.y_pos <= this.y_hidden;
    };
    Dialog.prototype.step = function() {
      if (this.finishing) {
        return this.y_pos > this.y_hidden ? this.y_pos -= this.slide_stride : null;
      } else if (this.y_pos < this.y_shown) {
        return this.y_pos += this.slide_stride;
      }
    };
    Dialog.prototype.draw = function(graphics) {
      var _a, _b, _c, _d, align, baseline, ctx, d, direction, label, x, y;
      ctx = graphics.ctx;
      ctx.lineWidth = 5;
      ctx.strokeStyle = "rgba(255, 255, 255, .5)";
      graphics.rect_stroke_rounded(this.x_pos, this.y_pos, this.width, this.height, this.corner_radius);
      ctx.font = "28pt Verdana";
      ctx.fillStyle = "rgba(255, 255, 255, .8)";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      graphics.text("Use Arrow Keys", this.x_pos + this.width / 2, this.y_pos - 10);
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
        direction = _c[_b];
        _a.push((function() {
          if (label = this.labels[direction]) {
            ctx.textAlign = align[direction];
            ctx.textBaseline = baseline[direction];
            graphics.text(label, this.x_pos + x[direction], this.y_pos + y[direction]);
            return graphics.arrow(this.x_pos + x[direction], this.y_pos + y[direction], d, direction);
          }
        }).call(this));
      }
      return _a;
    };
    return Dialog;
  }, this));
})();
