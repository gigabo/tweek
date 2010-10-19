(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/canvas', 'toy2d/canvas_scale'], __bind(function(Canvas, CanvasScale) {
    var Disk, Game, HEIGHT, MAX_HEIGHT, Tower, WIDTH, canvas, clear, ctx, draw, get_move, init, init_canvas, init_controls, init_towers, initial_ratio, move_number, re_init_towers, rect, step, step_timer, tower_height, towers;
    WIDTH = undefined;
    HEIGHT = undefined;
    MAX_HEIGHT = undefined;
    canvas = undefined;
    ctx = undefined;
    towers = undefined;
    step_timer = undefined;
    initial_ratio = undefined;
    move_number = 1;
    tower_height = 1;
    Tower = function(_a) {
      this.index = _a;
      this.disks = [];
      return this;
    };
    Disk = function(_a) {
      this.width = _a;
      return this;
    };
    init = function() {
      init_canvas();
      init_controls();
      return init_towers();
    };
    init_canvas = function() {
      canvas = (new Canvas()).jquery();
      ctx = canvas[0].getContext("2d");
      WIDTH = canvas.width();
      HEIGHT = canvas.height();
      MAX_HEIGHT = HEIGHT / 2;
      return new CanvasScale(canvas, 0.5);
    };
    init_controls = function() {
      $("#controls").append("<input type='text' id='tower_height'>");
      $("#controls").append("<input id='tower_refresh' type='button' value='Go'>");
      $("#tower_refresh").click(re_init_towers);
      return $("#tower_height").keydown(__bind(function(evt) {
        return evt.keyCode === 13 ? re_init_towers() : null;
      }, this));
    };
    re_init_towers = function() {
      return init_towers($("#tower_height").val());
    };
    init_towers = function(new_height) {
      var _a, _b;
      if (step_timer) {
        clearInterval(step_timer);
      }
      if (new_height) {
        new_height = parseInt(new_height);
        if (!_.isNaN(new_height)) {
          if (new_height < 1) {
            tower_height = 1;
          } else if (new_height > MAX_HEIGHT) {
            tower_height = MAX_HEIGHT;
          } else {
            tower_height = new_height;
          }
        }
      }
      $("#tower_height").val(tower_height);
      move_number = 1;
      towers = _.map([0, 1, 2], __bind(function(i) {
        return new Tower(i);
      }, this));
      towers[0].disks = _((function() {
        _b = [];
        for (var _a = 1; 1 <= tower_height ? _a <= tower_height : _a >= tower_height; 1 <= tower_height ? _a += 1 : _a -= 1){ _b.push(_a); }
        return _b;
      }).call(this)).chain().reverse().map(__bind(function(i) {
        return new Disk(i);
      }, this)).value();
      draw();
      return (step_timer = setInterval(step, 1000 / Math.pow(tower_height, 1.3)));
    };
    rect = function(x, y, w, h) {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      return ctx.fill();
    };
    clear = function() {
      return ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };
    draw = function() {
      var _a, _b, _c, _d, _e, _f, _g, col, disk, i, j, mult;
      clear();
      i = 0;
      _a = []; _c = towers;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        col = _c[_b];
        _a.push((function() {
          j = 0;
          _f = towers[i].disks;
          for (_e = 0, _g = _f.length; _e < _g; _e++) {
            disk = _f[_e];
            mult = MAX_HEIGHT / tower_height;
            rect(WIDTH / 4 * (i + 1) - disk.width * mult / 2, HEIGHT - MAX_HEIGHT / 2 - j * mult - mult, disk.width * mult, mult);
            j++;
          }
          return i++;
        })());
      }
      return _a;
    };
    get_move = function(move) {
      var direction, disk;
      disk = 1;
      while ((!(move & 1))) {
        move >>= 1;
        disk += 1;
      }
      move >>= 1;
      direction = [[0, 1, 2], [0, 2, 1]][(disk + tower_height) % 2];
      return [direction[move % 3], direction[(move + 1) % 3]];
    };
    step = function() {
      var _a, from, to;
      if (towers[1].disks.length !== tower_height) {
        _a = get_move(move_number++);
        from = _a[0];
        to = _a[1];
        towers[to].disks.push(towers[from].disks.pop());
      } else {
        init_towers(tower_height + 1);
      }
      return draw();
    };
    Game = function(canvas) {
      init();
      return this;
    };
    return Game;
  }, this));
})();
