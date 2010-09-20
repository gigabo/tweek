(function() {
  var Column, Disk, HEIGHT, TOWER_HEIGHT, WIDTH, clear, color, columns, ctx, draw, get_move, init, move_number, rect, step;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  TOWER_HEIGHT = 200;
  WIDTH = undefined;
  HEIGHT = undefined;
  ctx = undefined;
  columns = undefined;
  move_number = 0;
  Column = function(_a) {
    this.index = _a;
    this.disks = [];
    return this;
  };
  Disk = function(_a) {
    this.width = _a;
    return this;
  };
  init = function() {
    var _a, _b;
    ctx = $('#play_canvas')[0].getContext("2d");
    WIDTH = $("#play_canvas").width();
    HEIGHT = $("#play_canvas").height();
    columns = _.map([0, 1, 2], __bind(function(i) {
      return new Column(i);
    }, this));
    columns[0].disks = _((function() {
      _b = [];
      for (var _a = 1; 1 <= TOWER_HEIGHT ? _a <= TOWER_HEIGHT : _a >= TOWER_HEIGHT; 1 <= TOWER_HEIGHT ? _a += 1 : _a -= 1){ _b.push(_a); }
      return _b;
    }).call(this)).chain().reverse().map(__bind(function(i) {
      return new Disk(i);
    }, this)).value();
    draw();
    return setInterval(step, 1);
  };
  rect = function(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    return ctx.fill();
  };
  color = function(r, g, b, a) {
    return (ctx.fillStyle = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", " + (a) + ")"));
  };
  clear = function() {
    return ctx.clearRect(0, 0, WIDTH, HEIGHT);
  };
  draw = function() {
    var _a, _b, _c, _d, _e, _f, _g, col, disk, i, j, shade;
    clear();
    i = 0;
    _a = []; _c = columns;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      col = _c[_b];
      _a.push((function() {
        j = 0;
        _f = columns[i].disks;
        for (_e = 0, _g = _f.length; _e < _g; _e++) {
          disk = _f[_e];
          shade = (300 - disk.width) / 2;
          color(shade, shade, shade, 255);
          rect(WIDTH / 4 * (i + 1) - disk.width / 2, HEIGHT - j, disk.width, 1);
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
    if (columns[1].disks.length !== TOWER_HEIGHT) {
      _a = get_move(++move_number);
      from = _a[0];
      to = _a[1];
      columns[to].disks.push(columns[from].disks.pop());
    }
    return draw();
  };
  $(document).ready(__bind(function() {
    return init();
  }, this));
})();
