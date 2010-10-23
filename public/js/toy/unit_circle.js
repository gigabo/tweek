(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', 'toy2d/canvas', 'toy2d/canvas_scale'], __bind(function(Debug, Canvas, CanvasScale) {
    var PI, Toy;
    PI = Math.PI;
    Toy = function() {
      this.canvas = new Canvas();
      new CanvasScale(this.canvas.jquery(), .8);
      this.canvas.init_centered(5.0);
      this.width = this.canvas.draw_width;
      this.height = this.canvas.draw_height;
      this.degree = 0;
      this.start();
      return this;
    };
    Toy.prototype.start = function() {
      return setInterval(__bind(function() {
        return this.step();
      }, this), 33);
    };
    Toy.prototype.step = function() {
      var a, eighth, oa, os, thick, thin, x, y;
      this.canvas.clear();
      if (++this.degree === 360) {
        this.degree = 0;
      }
      thick = .025;
      thin = .005;
      a = this.degree * 2 * PI / 360;
      x = Math.cos(a);
      y = Math.sin(a);
      this.canvas.ctx.lineWidth = thin;
      this.canvas.set_color(0, 0, 0, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(-this.width / 2, 0, this.width / 2, 0);
      }, this));
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(0, -this.height / 2, 0, this.height / 2);
      }, this));
      this.canvas.ctx.lineWidth = thick;
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.arc(1, 2 * PI);
      }, this));
      this.canvas.set_color(0.75, 0, 0, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.arc(.25, a);
      }, this));
      this.canvas.label("Ѳ", Math.cos(a / 2) * .35, Math.sin(a / 2) * .35);
      this.canvas.set_color(0, 0.5, 0, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(0, 0, x, y);
      }, this));
      oa = -0.15;
      eighth = Math.floor(this.degree / (360 / 8));
      if (eighth % 2 === 1) {
        oa *= -1;
      }
      this.canvas.label("1", Math.cos(a + oa) * .5, Math.sin(a + oa) * .5);
      this.canvas.set_color(0, 0, 0.75, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(0, y, x, y);
      }, this));
      os = .1;
      if (y < 0) {
        os = -os;
      }
      this.canvas.label("cos(Ѳ)", x / 2, y + os);
      this.canvas.set_color(0.5, 0, 0.5, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(x, 0, x, y);
      }, this));
      os = .1;
      if (x < 0) {
        os = -os;
      }
      oa = x < 0 ? PI / 2 : -PI / 2;
      return this.canvas.label("sin(Ѳ)", x + os, y / 2, oa);
    };
    return Toy;
  }, this));
})();
