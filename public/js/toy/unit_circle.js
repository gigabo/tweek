(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', 'toy2d/canvas', 'toy2d/canvas_scale'], __bind(function(Debug, Canvas, CanvasScale) {
    var PI, Toy;
    PI = Math.PI;
    Toy = function() {
      var canvas;
      canvas = (new Canvas()).jquery();
      new CanvasScale(canvas, .8);
      this.canvas = canvas[0];
      this.degree = 0;
      this.init_canvas(5.0);
      this.start();
      return this;
    };
    Toy.prototype.init_canvas = function(_a) {
      var scale;
      this.width = _a;
      this.ctx = this.canvas.getContext('2d');
      scale = this.canvas.width / this.width;
      this.height = this.canvas.height / scale;
      return this.ctx.setTransform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2);
    };
    Toy.prototype.start = function() {
      return setInterval(__bind(function() {
        return this.step();
      }, this), 33);
    };
    Toy.prototype.step = function() {
      var a, eighth, oa, os, thick, thin, x, y;
      this.ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
      if (++this.degree === 360) {
        this.degree = 0;
      }
      thick = .025;
      thin = .005;
      a = this.degree * 2 * PI / 360;
      x = Math.cos(a);
      y = Math.sin(a);
      this.ctx.lineWidth = thin;
      this.ctx.strokeStyle = "black";
      this.draw_at(0, 0, 0, __bind(function() {
        return this.line(-this.width / 2, 0, this.width / 2, 0);
      }, this));
      this.draw_at(0, 0, 0, __bind(function() {
        return this.line(0, -this.height / 2, 0, this.height / 2);
      }, this));
      this.ctx.lineWidth = thick;
      this.draw_at(0, 0, 0, __bind(function() {
        return this.arc(1, 2 * PI);
      }, this));
      this.set_color(0.75, 0, 0, 1);
      this.draw_at(0, 0, 0, __bind(function() {
        return this.arc(.25, a);
      }, this));
      this.label("Ѳ", Math.cos(a / 2) * .35, Math.sin(a / 2) * .35);
      this.set_color(0, 0.5, 0, 1);
      this.draw_at(0, 0, 0, __bind(function() {
        return this.line(0, 0, x, y);
      }, this));
      oa = -0.15;
      eighth = Math.floor(this.degree / (360 / 8));
      if (eighth % 2 === 1) {
        oa *= -1;
      }
      this.label("1", Math.cos(a + oa) * .5, Math.sin(a + oa) * .5);
      this.set_color(0, 0, 0.75, 1);
      this.draw_at(0, 0, 0, __bind(function() {
        return this.line(0, y, x, y);
      }, this));
      os = .1;
      if (y < 0) {
        os = -os;
      }
      this.label("cos(Ѳ)", x / 2, y + os);
      this.set_color(0.5, 0, 0.5, 1);
      this.draw_at(0, 0, 0, __bind(function() {
        return this.line(x, 0, x, y);
      }, this));
      os = .1;
      if (x < 0) {
        os = -os;
      }
      oa = x < 0 ? PI / 2 : -PI / 2;
      return this.label("sin(Ѳ)", x + os, y / 2, oa);
    };
    Toy.prototype.label = function(t, x, y, a) {
      this.ctx.font = "8pt Verdana";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      a || (a = 0);
      return this.draw_at(x, y, a, __bind(function() {
        return this.scale(0.01, 0.01, __bind(function() {
          this.ctx.transform(1, 0, 0, -1, 0, 0);
          return this.ctx.fillText(t, 0, 0);
        }, this));
      }, this));
    };
    Toy.prototype.set_color = function(r, g, b, a) {
      var c;
      r = Math.floor(r * 255);
      g = Math.floor(g * 255);
      b = Math.floor(b * 255);
      c = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", " + (a) + ")");
      return (this.ctx.strokeStyle = (this.ctx.fillStyle = c));
    };
    Toy.prototype.arc = function(r, a) {
      return this.ctx.arc(0, 0, r, 0, a, false);
    };
    Toy.prototype.line = function(x1, y1, x2, y2) {
      this.ctx.moveTo(x1, y1);
      return this.ctx.lineTo(x2, y2);
    };
    Toy.prototype.draw_at = function(x, y, a, f) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.translate(x, y);
      this.ctx.rotate(a);
      f();
      this.ctx.stroke();
      return this.ctx.restore();
    };
    Toy.prototype.scale = function(x, y, f) {
      this.ctx.save();
      this.ctx.scale(x, y);
      f();
      return this.ctx.restore();
    };
    return Toy;
  }, this));
})();
