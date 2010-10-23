(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', 'toy2d/canvas', 'toy2d/canvas_scale', '/js/mustache.js'], __bind(function(Debug, Canvas, CanvasScale) {
    var PI, Toy;
    PI = Math.PI;
    Toy = function() {
      this.canvas = new Canvas();
      new CanvasScale(this.canvas.jquery(), .8);
      this.canvas.init_centered(5.0);
      this.width = this.canvas.draw_width;
      this.height = this.canvas.draw_height;
      this.degree = 0;
      this.init_formulae();
      this.init_controls();
      this.start();
      return this;
    };
    Toy.prototype.init_formulae = function() {
      var _a, i;
      this.formulae = [
        {
          name: 'sqrt(a^2-b^2)',
          func: function(a, b) {
            return Math.sqrt((a * a) - (b * b));
          }
        }, {
          name: 'a * sqrt(1-(b^2/a^2))',
          func: function(a, b) {
            return a * Math.sqrt(1 - ((b * b) / (a * a)));
          }
        }, {
          name: 'a',
          func: function(a, b) {
            return a;
          }
        }, {
          name: 'a - b',
          func: function(a, b) {
            return a - b;
          }
        }, {
          name: 'a^2 - b^2',
          func: function(a, b) {
            return a * a - b * b;
          }
        }, {
          name: 'a * cos(b/a)',
          func: function(a, b) {
            return a * Math.cos(b / a);
          }
        }, {
          name: 'a * 2^(a-b) - a',
          func: function(a, b) {
            return a * Math.pow(2, a - b) - a;
          }
        }
      ];
      _a = [];
      for (i = 0; (0 <= this.formulae.length - 1 ? i <= this.formulae.length - 1 : i >= this.formulae.length - 1); (0 <= this.formulae.length - 1 ? i += 1 : i -= 1)) {
        _a.push(this.formulae[i].index = i);
      }
      return _a;
    };
    Toy.prototype.init_controls = function() {
      var f_control, s_control;
      this.current_formula = 0;
      this.current_steps = 10;
      this.steps_values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      $("#controls").append(Mustache.to_html('<select id="steps_selector">\n  {{#steps_values}}\n  <option value="{{.}}">Approximation steps: {{.}}</option>\n  {{/steps_values}}\n</select>\n<select id="formula_selector">\n  {{#formulae}}\n  <option value="{{index}}">Formula: {{name}}</option>\n  {{/formulae}}\n</select>', this));
      f_control = $("#formula_selector");
      f_control.change(__bind(function() {
        return (this.current_formula = f_control.val());
      }, this));
      s_control = $("#steps_selector");
      s_control.val(10);
      return s_control.change(__bind(function() {
        return (this.current_steps = s_control.val());
      }, this));
    };
    Toy.prototype.start = function() {
      return setInterval(__bind(function() {
        return this.step();
      }, this), 33);
    };
    Toy.prototype.step = function() {
      var a, b, fx, theta, thick, thin, x, y;
      this.canvas.clear();
      if (++this.degree === 360) {
        this.degree = 0;
      }
      thick = .025;
      thin = .005;
      theta = this.degree * 2 * PI / 360;
      x = Math.cos(theta);
      y = Math.sin(theta);
      this.canvas.ctx.lineWidth = thin;
      this.canvas.set_color(0, 0, 0, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(-this.width / 2, 0, this.width / 2, 0);
      }, this));
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(0, -this.height / 2, 0, this.height / 2);
      }, this));
      this.canvas.ctx.lineWidth = thick;
      a = 1.5 + x / 2;
      b = 1;
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.ellipse(a, b);
      }, this));
      this.canvas.set_color(0, 0, .7, 1);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(0, -.1, a, -.1);
      }, this));
      this.canvas.label("a", a / 2, -0.2);
      this.canvas.draw_at(0, 0, 0, __bind(function() {
        return this.canvas.line(-.1, 0, -.1, b);
      }, this));
      this.canvas.label("b", -0.2, b / 2);
      fx = this.approximate_focus(a, b);
      this.canvas.set_color(.5, 0, 0, 1);
      this.canvas.draw_at(fx, 0, 0, __bind(function() {
        return this.canvas.arc(thick / 2, 2 * PI);
      }, this));
      this.canvas.label("Sun", fx, 0.1);
      this.canvas.draw_at(-2.4, 1.1, 0, __bind(function() {
        return this.canvas.arc(thick / 2, 2 * PI);
      }, this));
      this.canvas.label_left("Binary Approximation (" + (this.current_steps) + ")", -2.3, 1.1);
      fx = this.formulae[this.current_formula].func(a, b);
      this.canvas.set_color(0, .5, 0, 1);
      this.canvas.draw_at(fx, 0, 0, __bind(function() {
        return this.canvas.arc(thick / 2, 2 * PI);
      }, this));
      this.canvas.label("Sun", fx, 0.1);
      this.canvas.draw_at(-2.4, 0.95, 0, __bind(function() {
        return this.canvas.arc(thick / 2, 2 * PI);
      }, this));
      return this.canvas.label_left("Formula: " + (this.formulae[this.current_formula].name), -2.3, 0.95);
    };
    Toy.prototype.approximate_focus = function(a, b) {
      var _a, dx, i, major, minor, x;
      dx = (x = a / 2);
      major = 2 * a;
      _a = this.current_steps;
      for (i = 0; (0 <= _a ? i < _a : i > _a); (0 <= _a ? i += 1 : i -= 1)) {
        minor = Math.sqrt(b * b + x * x) * 2;
        dx /= 2;
        x += dx * (minor < major ? 1 : -1);
      }
      return x;
    };
    return Toy;
  }, this));
})();
