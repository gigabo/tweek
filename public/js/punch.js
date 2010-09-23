(function() {
  var HEIGHT, Halo, WIDTH, api_go, canvas, circle, clear, ctx, dates, draw, draw_grid, draw_halos, draw_key, draw_punchcard, frame, grid, grid_x, grid_y, halo_life, halos, init, init_handle_input, initial_ratio, interval, is_ipad, line, max_encountered, new_halo, step, text, update_canvas_width, user;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  canvas = undefined;
  ctx = undefined;
  user = undefined;
  dates = undefined;
  grid = undefined;
  initial_ratio = undefined;
  interval = undefined;
  WIDTH = undefined;
  HEIGHT = undefined;
  is_ipad = false;
  max_encountered = 0;
  frame = 0;
  halos = [];
  halo_life = 10;
  init = function() {
    init_handle_input();
    canvas = $("#chart_canvas");
    ctx = canvas[0].getContext("2d");
    is_ipad = navigator.userAgent.match(/iPad/i) !== null;
    WIDTH = canvas.width();
    HEIGHT = canvas.height();
    update_canvas_width();
    interval = setInterval(update_canvas_width, 50);
    return api_go();
  };
  update_canvas_width = function() {
    var width;
    width = canvas.parent().innerWidth();
    canvas.width(width);
    return canvas.height(width / 2);
  };
  api_go = function() {
    return $.getJSON("/api/json/punch/" + (user), draw_punchcard);
  };
  draw_punchcard = function(data) {
    dates = data.dates;
    frame = 0;
    grid = _.map(_.range(0, 7), __bind(function(i) {
      return _.map(_.range(0, 24), __bind(function(j) {
        return 0;
      }, this));
    }, this));
    return setInterval(step, 100);
  };
  clear = function() {
    return ctx.clearRect(0, 0, WIDTH, HEIGHT);
  };
  draw = function() {
    var i, j;
    clear();
    i = 0;
    draw_grid();
    draw_key();
    while (i < grid.length) {
      j = 0;
      while (j < grid[i].length) {
        circle(j, i, grid[i][j]);
        j++;
      }
      i++;
    }
    return draw_halos();
  };
  Halo = function(_a, _b, _c, _d) {
    this.ttl = _d;
    this.r = _c;
    this.y = _b;
    this.x = _a;
    return this;
  };
  draw_halos = function() {
    var _a;
    _.each(halos, __bind(function(h) {
      var a;
      a = h.ttl / halo_life;
      ctx.strokeStyle = ("rgba(0, 0, 0, " + (a) + ")");
      circle(h.x, h.y, h.r + (halo_life - h.ttl) * .6, false);
      return h.ttl--;
    }, this));
    _a = [];
    while (halos[0].ttl === 0) {
      _a.push(halos.shift());
    }
    return _a;
  };
  new_halo = function(x, y, r) {
    return halos.push(new Halo(x, y, r, halo_life));
  };
  draw_grid = function() {
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    line(.25, 0, .25, 6.75);
    line(.25, 6.75, 24, 6.75);
    _.each(_.range(0, 7), __bind(function(i) {
      return line(.15, i, .25, i);
    }, this));
    return _.each(_.range(0, 24), __bind(function(i) {
      return line(i + 1, 6.75, i + 1, 6.85);
    }, this));
  };
  draw_key = function() {
    var day_label, hour_label;
    day_label = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    hour_label = ['12am', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '12pm', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    ctx.font = "14pt Verdana";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    _.each(_.range(0, 7), __bind(function(i) {
      return text("" + (day_label[i]), 0, i);
    }, this));
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    return _.each(_.range(0, 24), __bind(function(i) {
      return text("" + (hour_label[i]), i + 1, 7);
    }, this));
  };
  grid_x = function(x) {
    return WIDTH / 26 * (x + 1);
  };
  grid_y = function(y) {
    return HEIGHT / 9 * (y + 1);
  };
  line = function(x1, y1, x2, y2) {
    x1 = grid_x(x1);
    y1 = grid_y(y1);
    x2 = grid_x(x2);
    y2 = grid_y(y2);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    return ctx.closePath();
  };
  text = function(text, x, y) {
    x = grid_x(x);
    y = grid_y(y);
    return is_ipad ? ctx.strokeText(text, x, y) : ctx.fillText(text, x, y);
  };
  circle = function(x, y, r, fill) {
    var cur_mult, max_circle;
    if (fill === undefined) {
      fill = true;
    }
    max_circle = (WIDTH / 25 / 4) - 1;
    cur_mult = max_circle / max_encountered * 2;
    if (max_encountered < max_circle) {
      cur_mult = 2;
    }
    x = grid_x(x + 1);
    y = grid_y(y);
    r = r * cur_mult;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    return fill ? ctx.fill() : ctx.stroke();
  };
  step = function() {
    var hour, wday;
    if (frame < dates.length) {
      wday = dates[frame].wday;
      hour = dates[frame].hour;
      grid[wday][hour]++;
      new_halo(hour, wday, grid[wday][hour]);
      if (grid[wday][hour] > max_encountered) {
        max_encountered = grid[wday][hour];
      }
      frame++;
    }
    return draw();
  };
  init_handle_input = function() {
    var hi;
    hi = $("#handle_input");
    user = hi.val();
    hi.focus(__bind(function() {
      return (hi.val() === user) ? hi.val("") : null;
    }, this));
    return hi.focusout(__bind(function() {
      return (hi.val() === "") ? hi.val(user) : null;
    }, this));
  };
  $(document).ready(init);
})();
