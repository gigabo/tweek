(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var Trail;
    Trail = function(_a, _b) {
      this.owner = _b;
      this.game = _a;
      this.pieces = [];
      this.length = 20;
      this.controls = this.game.controls;
      return this;
    };
    Trail.prototype.step = function() {
      var _a, _b, _c, _d, i, m, oa, ol, ox, oy, piece, x1, x2, y1, y2;
      if (this.controls.thrust_on()) {
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
    Trail.prototype.draw = function(graphics) {
      var _a, _b, _c, _d, _e, a, c, ctx, piece, x1, x2, y1, y2;
      ctx = graphics.ctx;
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
          return graphics.line(x1, y1, x2, y2);
        }).call(this));
      }
      return _a;
    };
    return Trail;
  }, this));
})();
