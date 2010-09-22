(function() {
  var Halo, api_go, canvas, circle, clear, ctx, dates, draw, draw_halos, draw_punchcard, frame, grid, halo_life, halos, height, init, init_handle_input, initial_ratio, max_encountered, new_halo, step, update_canvas_width, user, width;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  canvas = undefined;
  ctx = undefined;
  user = undefined;
  dates = undefined;
  grid = undefined;
  initial_ratio = undefined;
  max_encountered = 0;
  frame = 0;
  width = 800;
  height = 400;
  halos = [];
  halo_life = 10;
  init = function() {
    init_handle_input();
    canvas = $("#chart_canvas");
    ctx = canvas[0].getContext("2d");
    initial_ratio = 800 / canvas.parent().innerWidth();
    setInterval(update_canvas_width, 50);
    return api_go();
  };
  update_canvas_width = function() {
    width = canvas.parent().innerWidth() * initial_ratio;
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
    return ctx.clearRect(0, 0, width, height);
  };
  draw = function() {
    var i, j;
    clear();
    i = 0;
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
  circle = function(x, y, r, fill) {
    var cur_mult, max_circle;
    if (fill === undefined) {
      fill = true;
    }
    max_circle = (width / 25 / 4) - 1;
    cur_mult = max_circle / max_encountered * 2;
    if (max_encountered < max_circle) {
      cur_mult = 2;
    }
    x = width / 25 * (x + 1);
    y = height / 8 * (y + 1);
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
