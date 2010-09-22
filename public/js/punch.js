(function() {
  var api_go, canvas, circle, clear, ctx, dates, draw, draw_punchcard, frame, grid, height, init, init_handle_input, initial_ratio, step, update_canvas_width, user, width;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  canvas = undefined;
  ctx = undefined;
  user = undefined;
  dates = undefined;
  grid = undefined;
  initial_ratio = undefined;
  frame = 0;
  width = 800;
  height = 400;
  init = function() {
    init_handle_input();
    $("#chart_img").remove();
    canvas = $("#chart_canvas");
    ctx = canvas[0].getContext("2d");
    initial_ratio = 800 / canvas.parent().innerWidth();
    setInterval(update_canvas_width, 100);
    return api_go();
  };
  update_canvas_width = function() {
    width = canvas.parent().innerWidth() * initial_ratio;
    canvas.width(width);
    return canvas.height(width / 2);
  };
  api_go = function() {
    var query;
    query = $("#api_query").val();
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
    var _a, i, j;
    clear();
    i = 0;
    _a = [];
    while (i < grid.length) {
      _a.push((function() {
        j = 0;
        while (j < grid[i].length) {
          circle(width / 25 * (j + 1), height / 8 * (i + 1), grid[i][j]);
          j++;
        }
        return i++;
      })());
    }
    return _a;
  };
  circle = function(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    return ctx.fill();
  };
  step = function() {
    var hour, wday;
    if (frame < dates.length) {
      wday = dates[frame].wday;
      hour = dates[frame].hour;
      grid[wday][hour]++;
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
  $(document).ready(__bind(function() {
    return $.getScript("/js/jquery.dump.js", init);
  }, this));
})();
