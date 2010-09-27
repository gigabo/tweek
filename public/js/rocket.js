(function() {
  var Controls, HEIGHT, Performance, Rocket, Trail, WIDTH, canvas, circle, clear, controls, ctx, debug, draw, global_i, init, line, main_interval, performance, protagonist, running, start, start_level, step, stop, trail, update_canvas_width;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  canvas = undefined;
  ctx = undefined;
  WIDTH = undefined;
  HEIGHT = undefined;
  main_interval = undefined;
  protagonist = undefined;
  trail = undefined;
  controls = undefined;
  performance = undefined;
  running = false;
  debug = function(v) {
    $("#debug").empty();
    return $("#debug").append(v);
  };
  global_i = 0;
  Performance = function() {
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
    var elapsed, grow_threshold, now, res, shrink_threshold;
    if (++this.frame_count === this.check_frames) {
      now = (new Date()).getTime();
      elapsed = now - this.base_time;
      shrink_threshold = (this.check_frames * this.step_time) * 1.5;
      grow_threshold = (this.check_frames * this.step_time) * 1.1;
      if (elapsed > shrink_threshold) {
        this.res *= .99;
        update_canvas_width();
        if (this.check_frames > 1) {
          this.check_frames--;
        }
      } else if (elapsed < grow_threshold && this.res < 1) {
        this.res *= 1.01;
        if (this.res > 1) {
          res = 1;
        }
      } else {
        if (this.check_frames < 50) {
          this.check_frames++;
        }
      }
      return this.init();
    }
  };
  Controls = function() {
    this.thrust_on = true;
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
        return (this.thrust_on = false);
      }
    }, this));
    return $(document).keyup(__bind(function(e) {
      switch (e.keyCode) {
      case 37:
        return (this.rot_l = false);
      case 39:
        return (this.rot_r = false);
      case 32:
        return (this.thrust_on = true);
      case 80:
      case 81:
        return running ? stop() : start();
      }
    }, this));
  };
  Rocket = function(_a, _b) {
    this.y = _b;
    this.x = _a;
    this.thrust = .2;
    this.a = Math.PI / 2;
    this.dx = 0;
    this.dy = 0;
    this.length = 20;
    return this;
  };
  Rocket.prototype.apply_gravity = function() {
    return this.dy += .2;
  };
  Rocket.prototype.apply_rotation = function() {
    if (controls.rot_l) {
      this.a -= Math.PI / 24;
    }
    return controls.rot_r ? this.a += Math.PI / 24 : null;
  };
  Rocket.prototype.apply_thrust = function() {
    if (controls.thrust_on) {
      this.dx -= .5 * Math.cos(this.a);
      return this.dy -= .5 * Math.sin(this.a);
    }
  };
  Rocket.prototype.front = function() {
    return {
      x: this.x - this.length / 2 * Math.cos(this.a),
      y: this.y - this.length / 2 * Math.sin(this.a)
    };
  };
  Rocket.prototype.back = function() {
    return {
      x: this.x + this.length / 2 * Math.cos(this.a),
      y: this.y + this.length / 2 * Math.sin(this.a)
    };
  };
  Rocket.prototype.draw = function() {
    var back, front;
    front = this.front();
    back = this.back();
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.lineWidth = this.length / 5;
    return line(front.x, front.y, back.x, back.y);
  };
  Rocket.prototype.move = function() {
    this.x += this.dx;
    return this.y += this.dy;
  };
  Rocket.prototype.check_bounds = function() {
    return !((0 < this.x) && (this.x < WIDTH)) || !((0 < this.y) && (this.y < HEIGHT)) ? this.splode() : null;
  };
  Rocket.prototype.splode = function() {
    return start_level();
  };
  Rocket.prototype.step = function() {
    this.apply_gravity();
    this.apply_rotation();
    this.apply_thrust();
    this.move();
    return this.check_bounds();
  };
  Trail = function() {
    this.pieces = [];
    this.length = 20;
    return this;
  };
  Trail.prototype.step = function() {
    var _a, _b, _c, _d, i, m, oa, ol, ox, oy, piece, x1, x2, y1, y2;
    if (controls.thrust_on) {
      ox = this.owner.x;
      oy = this.owner.y;
      oa = this.owner.a;
      ol = this.owner.length;
      x1 = ox + ol / 2 * Math.cos(oa);
      y1 = oy + ol / 2 * Math.sin(oa);
      x2 = ox + ol * Math.cos(oa);
      y2 = oy + ol * Math.sin(oa);
      this.pieces.unshift({
        x: x1,
        y: y1,
        l: 10,
        a: oa,
        ttl: this.length
      });
    }
    if (this.pieces.length > 0 && this.pieces[this.pieces.length - 1].ttl === 0) {
      this.pieces.pop();
    }
    i = this.length;
    _a = []; _c = this.pieces;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      piece = _c[_b];
      _a.push((function() {
        m = i / ((this.length / 10) + 1);
        piece.x += m * Math.cos(piece.a);
        piece.y += m * Math.sin(piece.a);
        piece.a += (Math.random() - .5) * .5;
        piece.ttl -= 1;
        return i--;
      }).call(this));
    }
    return _a;
  };
  Trail.prototype.piece_line = function(p) {
    return [p.x, p.y, p.x + p.l * Math.cos(p.a), p.y + p.l * Math.sin(p.a)];
  };
  Trail.prototype.draw = function() {
    var _a, _b, _c, _d, _e, a, c, piece, x1, x2, y1, y2;
    ctx.lineWidth = this.owner.length / 10;
    _a = []; _c = this.pieces;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      piece = _c[_b];
      _a.push((function() {
        a = piece.ttl / this.length;
        c = Math.floor(255 * (1 - a));
        ctx.strokeStyle = ("rgba(255, " + (c) + ", " + (c) + ", " + (a) + ")");
        _e = this.piece_line(piece);
        x1 = _e[0];
        y1 = _e[1];
        x2 = _e[2];
        y2 = _e[3];
        return line(x1, y1, x2, y2);
      }).call(this));
    }
    return _a;
  };
  init = function() {
    canvas = $("#play_canvas");
    ctx = canvas[0].getContext("2d");
    canvas.css("background-color", "black");
    canvas.css("margin-top", "1em");
    $("#canvas_container").append("<br>Arrows steer.");
    WIDTH = canvas.width();
    HEIGHT = canvas.height();
    controls = new Controls();
    performance = new Performance();
    update_canvas_width();
    $(window).resize(update_canvas_width);
    start_level();
    return start();
  };
  start_level = function() {
    protagonist = new Rocket(WIDTH / 2, HEIGHT / 2);
    trail || (trail = new Trail());
    return (trail.owner = protagonist);
  };
  start = function() {
    main_interval = setInterval(step, performance.step_time);
    return (running = true);
  };
  stop = function() {
    clearInterval(main_interval);
    return (running = false);
  };
  update_canvas_width = function() {
    var width;
    width = canvas.parent().innerWidth() * performance.res;
    canvas.width(width);
    return canvas.height(width / 2);
  };
  clear = function() {
    return ctx.clearRect(0, 0, WIDTH, HEIGHT);
  };
  draw = function() {
    clear();
    protagonist.draw();
    return trail.draw();
  };
  line = function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    return ctx.closePath();
  };
  circle = function(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    return ctx.fill();
  };
  step = function() {
    protagonist.step();
    trail.step();
    draw();
    return performance.check();
  };
  $(document).ready(init);
})();
