(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(__bind(function() {
    var Banner;
    Banner = function(_a, _b) {
      this.text = _b;
      this.game = _a;
      this.a = 1.0;
      this.f = false;
      return this;
    };
    Banner.prototype.draw = function(graphics) {
      var ctx;
      ctx = graphics.ctx;
      ctx.font = "28pt Verdana";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = ("rgba(255, 255, 255, " + (this.a) + ")");
      return graphics.text(this.text, this.game.width / 2, this.game.height / 2);
    };
    Banner.prototype.fade = function() {
      return (this.f = true);
    };
    Banner.prototype.step = function() {
      return this.f && this.a > 0 ? this.a -= .01 : null;
    };
    Banner.prototype.done = function() {
      return this.a <= 0;
    };
    return Banner;
  }, this));
})();
