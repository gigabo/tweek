(function() {
  var Disk, HEIGHT, MAX_HEIGHT, TOWER_HEIGHT, Tower, WIDTH, clear, ctx, draw, get_move, init, init_controls, init_towers, move_number, re_init_towers, rect, step, step_timer, towers;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  MAX_HEIGHT = 200;
  TOWER_HEIGHT = 1;
  WIDTH = undefined;
  HEIGHT = undefined;
  ctx = undefined;
  towers = undefined;
  step_timer = undefined;
  move_number = 1;
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
    ctx = $('#play_canvas')[0].getContext("2d");
    WIDTH = $("#play_canvas").width();
    HEIGHT = $("#play_canvas").height();
    init_controls();
    return init_towers();
  };
  init_controls = function() {
    $("#play").prepend("<input id='tower_refresh' type='button' value='Go'>");
    $("#play").prepend("<input id='tower_height'>");
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
      if ((0 < new_height) && (new_height <= MAX_HEIGHT)) {
        TOWER_HEIGHT = new_height;
      }
    }
    $("#tower_height").val(TOWER_HEIGHT);
    move_number = 1;
    towers = _.map([0, 1, 2], __bind(function(i) {
      return new Tower(i);
    }, this));
    towers[0].disks = _((function() {
      _b = [];
      for (var _a = 1; 1 <= TOWER_HEIGHT ? _a <= TOWER_HEIGHT : _a >= TOWER_HEIGHT; 1 <= TOWER_HEIGHT ? _a += 1 : _a -= 1){ _b.push(_a); }
      return _b;
    }).call(this)).chain().reverse().map(__bind(function(i) {
      return new Disk(i);
    }, this)).value();
    draw();
    return (step_timer = setInterval(step, 500 / Math.pow(TOWER_HEIGHT, 1.2)));
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
          mult = MAX_HEIGHT / TOWER_HEIGHT;
          rect(WIDTH / 4 * (i + 1) - disk.width * mult / 2, HEIGHT - j * mult - mult, disk.width * mult, mult);
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
    direction = [[0, 1, 2], [0, 2, 1]][(disk + TOWER_HEIGHT) % 2];
    return [direction[move % 3], direction[(move + 1) % 3]];
  };
  step = function() {
    var _a, from, to;
    if (towers[1].disks.length !== TOWER_HEIGHT) {
      _a = get_move(move_number++);
      from = _a[0];
      to = _a[1];
      towers[to].disks.push(towers[from].disks.pop());
    } else {
      init_towers(TOWER_HEIGHT + 1);
    }
    return draw();
  };
  $(document).ready(__bind(function() {
    return init();
  }, this));
})();
