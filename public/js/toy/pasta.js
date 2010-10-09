(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', 'toy2d/canvas_scale', '/js/box2d.js'], __bind(function(Debug, Scale) {
    var Toy;
    Toy = function(canvas) {
      var ppm;
      new Scale(canvas);
      this.canvas = canvas[0];
      this.ctx = this.canvas.getContext('2d');
      this.width = 40.0;
      ppm = this.canvas.width / this.width;
      this.height = this.canvas.height / ppm;
      this.ctx.setTransform(ppm, 0, 0, -ppm, 0, this.canvas.height);
      this.tick = 0;
      this.bodies = [];
      this.init_world();
      this.init_walls();
      this.start();
      return this;
    };
    Toy.prototype.start = function() {
      if (!this.running) {
        this.main_interval = setInterval(__bind(function() {
          return this.step();
        }, this), 20);
        return (this.running = true);
      }
    };
    Toy.prototype.step = function() {
      if (this.bodies.length < 200 && ++this.tick === 10) {
        this.tick = 0;
        this.spawn_random_box();
      }
      this.world.Step(1.0 / 60.0, 10);
      return this.draw_bodies();
    };
    Toy.prototype.draw_bodies = function() {
      var _a, _b, _c, _d, body, t;
      this.ctx.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
      _a = []; _c = this.bodies;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        body = _c[_b];
        _a.push((function() {
          this.ctx.fillStyle = body.color || 'black';
          t = body.m_xf;
          this.ctx.translate(t.position.x, t.position.y);
          this.ctx.rotate(body.GetAngle());
          this.ctx.fillRect(-body.w, -body.h, body.w * 2, body.h * 2);
          this.ctx.rotate(-body.GetAngle());
          return this.ctx.translate(-t.position.x, -t.position.y);
        }).call(this));
      }
      return _a;
    };
    Toy.prototype.init_world = function() {
      var gravity, worldAABB;
      worldAABB = new b2AABB();
      worldAABB.lowerBound.Set(-10000.0, -10000.0);
      worldAABB.upperBound.Set(10000.0, 10000.0);
      gravity = new b2Vec2(0.0, -9.8);
      return (this.world = new b2World(worldAABB, gravity, true));
    };
    Toy.prototype.init_walls = function() {
      this.init_static(this.width / 2.0, 0.2, this.width, 0.4);
      this.init_static(0.2, this.height / 2.0, 0.4, this.height);
      return this.init_static(this.width - 0.2, this.height / 2.0, 0.4, this.height);
    };
    Toy.prototype.init_static = function(x, y, w, h) {
      var body, groundBodyDef, groundShapeDef;
      groundBodyDef = new b2BodyDef();
      groundBodyDef.position.Set(x, y);
      body = this.world.CreateBody(groundBodyDef);
      groundShapeDef = new b2PolygonDef();
      groundShapeDef.restitution = 0.0;
      groundShapeDef.friction = 0.5;
      groundShapeDef.density = 1.0;
      body.w = w;
      body.h = h;
      groundShapeDef.SetAsBox(body.w, body.h);
      body.CreateShape(groundShapeDef);
      body.SynchronizeShapes();
      this.bodies.push(body);
      return body;
    };
    Toy.prototype.spawn_random_box = function() {
      var a, b, base, body, bodyDef, g, h, r, shapeDef, w, x, y;
      x = 5 + Math.random() * (this.width - 10);
      y = this.height + 10.0;
      w = 0.1;
      h = 2.0 + Math.random() * 5.5;
      a = 2.0 - Math.random() * 4.0;
      bodyDef = new b2BodyDef();
      bodyDef.position.Set(x, y);
      body = this.world.CreateBody(bodyDef);
      shapeDef = new b2PolygonDef();
      shapeDef.SetAsBox(w, h);
      body.w = w;
      body.h = h;
      shapeDef.restitution = 0.4;
      shapeDef.density = 1.0;
      shapeDef.friction = 0.5;
      body.CreateShape(shapeDef);
      body.SetMassFromShapes();
      body.SetAngularVelocity(a);
      base = 20;
      r = Math.floor(Math.random() * 100) + base;
      g = Math.floor(Math.random() * 100) + base;
      b = Math.floor(Math.random() * 100) + base;
      body.color = ("rgba(" + (r) + ", " + (g) + ", " + (b) + ", 1.0)");
      return this.bodies.push(body);
    };
    return Toy;
  }, this));
})();
