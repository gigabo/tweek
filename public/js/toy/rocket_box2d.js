(function() {
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  require.def(['toy2d/debug', 'toy2d/canvas_scale', 'toy2d/controls', '/js/box2d.js'], __bind(function(Debug, Scale, Controls) {
    var Rocket, Toy, Trail;
    Trail = function(_a) {
      this.game = _a;
      this.init();
      return this;
    };
    Trail.prototype.init = function() {
      this.length = 40;
      return (this.sparks = []);
    };
    Trail.prototype.step = function() {
      return this.add_spark();
    };
    Trail.prototype.add_spark = function() {
      var body, bodyDef, dead, h, lv, ra, rand, rocket, rpos, rx, ry, shapeDef, t_x, t_y, thrust, w, x, y;
      rocket = this.game.rocket;
      rpos = rocket.body.GetPosition();
      rx = rpos.x;
      ry = rpos.y;
      ra = rocket.body.GetAngle() + Math.PI / 2;
      x = rx - Math.cos(ra) * rocket.length * 1.5;
      y = ry - Math.sin(ra) * rocket.length * 1.5;
      w = 0.2;
      h = 0.2;
      bodyDef = new b2BodyDef();
      bodyDef.position.Set(x, y);
      body = this.game.world.CreateBody(bodyDef);
      shapeDef = new b2PolygonDef();
      shapeDef.SetAsBox(w, h);
      body.w = w;
      body.h = h;
      shapeDef.restitution = 0.4;
      shapeDef.density = 0.01;
      shapeDef.friction = 0.6;
      body.CreateShape(shapeDef);
      body.SetMassFromShapes();
      thrust = 30;
      rand = .5 * (Math.random() - .5);
      lv = rocket.body.GetLinearVelocity();
      t_x = Math.cos(ra + rand) * thrust - lv.x;
      t_y = Math.sin(ra + rand) * thrust - lv.y;
      body.SetLinearVelocity(new b2Vec2(-t_x, -t_y));
      this.sparks.push(body);
      if (this.sparks.length > this.length) {
        dead = this.sparks.shift();
        return this.game.world.DestroyBody(dead);
      }
    };
    Trail.prototype.draw = function(graphics) {
      var _a, _b, _c, _d, body, ctx, div, i, mult, t, tff;
      ctx = graphics.ctx;
      ctx.fillStyle = 'black';
      i = 0;
      _a = []; _c = this.sparks;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        body = _c[_b];
        _a.push((function() {
          i++;
          div = i / this.sparks.length;
          tff = 255 - Math.floor(div * 255);
          ctx.fillStyle = ("rgba(255," + (tff) + "," + (tff) + "," + (div) + ")");
          t = body.m_xf;
          ctx.translate(t.position.x, t.position.y);
          mult = 0.4 * (5 - (4 * i / this.sparks.length));
          ctx.beginPath();
          ctx.arc(0, 0, mult, 2 * Math.PI, false);
          ctx.translate(-t.position.x, -t.position.y);
          ctx.closePath();
          return ctx.fill();
        }).call(this));
      }
      return _a;
    };
    Rocket = function(_a) {
      this.game = _a;
      this.init();
      return this;
    };
    Rocket.prototype.init = function() {
      var bodyDef, h, shapeDef, w, x, y;
      x = this.game.width / 2;
      y = 2;
      w = 0.2;
      this.length = 1.0;
      h = this.length;
      bodyDef = new b2BodyDef();
      bodyDef.position.Set(x, y);
      this.body = this.game.world.CreateBody(bodyDef);
      shapeDef = new b2PolygonDef();
      shapeDef.SetAsBox(w, h);
      this.body.w = w;
      this.body.h = this.length;
      shapeDef.restitution = 0.4;
      shapeDef.density = 1.0;
      shapeDef.friction = 0.01;
      this.body.CreateShape(shapeDef);
      this.body.SetMassFromShapes();
      return (this.trail = new Trail(this.game));
    };
    Rocket.prototype.step = function() {
      var a, l_x, l_y, t, t_x, t_y, thrust, torque;
      t = this.body.m_xf;
      a = this.body.GetAngle() + Math.PI / 2;
      thrust = 20;
      t_x = Math.cos(a) * thrust;
      t_y = Math.sin(a) * thrust;
      l_x = t.position.x - this.length / 2 * Math.cos(a);
      l_y = t.position.y - this.length / 2 * Math.sin(a);
      this.body.ApplyForce(new b2Vec2(t_x, t_y), new b2Vec2(l_x, l_y));
      this.body.SetAngularVelocity(this.body.GetAngularVelocity() * 0.95);
      torque = 8;
      if (this.game.controls.left) {
        this.body.ApplyTorque(torque);
      }
      if (this.game.controls.right) {
        this.body.ApplyTorque(-torque);
      }
      return this.trail.step();
    };
    Rocket.prototype.draw = function(graphics) {
      var ctx, t;
      ctx = graphics.ctx;
      ctx.fillStyle = 'white';
      t = this.body.m_xf;
      ctx.translate(t.position.x, t.position.y);
      ctx.rotate(this.body.GetAngle());
      ctx.fillRect(-this.body.w, -this.body.h, this.body.w * 2, this.body.h * 2);
      ctx.rotate(-this.body.GetAngle());
      ctx.translate(-t.position.x, -t.position.y);
      return this.trail.draw(graphics);
    };
    Toy = function(canvas) {
      var ppm;
      new Scale(canvas, .8);
      this.canvas = canvas[0];
      this.ctx = this.canvas.getContext('2d');
      this.width = 100.0;
      ppm = this.canvas.width / this.width;
      this.height = this.canvas.height / ppm;
      this.ctx.setTransform(ppm, 0, 0, -ppm, 0, this.canvas.height);
      this.tick = 0;
      this.bodies = [];
      this.init_world();
      this.init_walls();
      this.controls = new Controls(this);
      this.rocket = new Rocket(this);
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
    Toy.prototype.stop = function() {
      if (this.running) {
        clearInterval(this.main_interval);
        return (this.running = false);
      }
    };
    Toy.prototype.step = function() {
      this.world.Step(1.0 / 60.0, 10);
      this.draw_bodies();
      this.rocket.step(this);
      return this.rocket.draw(this);
    };
    Toy.prototype.draw_bodies = function() {
      var _a, _b, _c, _d, body, t;
      this.ctx.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0.0, 0.0, this.canvas.width, this.canvas.height);
      _a = []; _c = this.bodies;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        body = _c[_b];
        _a.push((function() {
          this.ctx.fillStyle = body.color || 'blue';
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
      worldAABB.lowerBound.Set(-1000.0, -1000.0);
      worldAABB.upperBound.Set(1000.0, 1000.0);
      gravity = new b2Vec2(0.0, -9.8);
      return (this.world = new b2World(worldAABB, gravity, true));
    };
    Toy.prototype.init_walls = function() {
      this.init_static(this.width / 2.0, 0.2, this.width, 0.4);
      this.init_static(this.width / 2.0, this.height - 0.2, this.width, 0.4);
      this.init_static(0.2, this.height / 2.0, 0.4, this.height);
      this.init_static(this.width - 0.2, this.height / 2.0, 0.4, this.height);
      this.init_static(this.width / 4, this.height / 2, this.width / 16, this.height / 8, Math.PI / 4);
      this.init_static(this.width / 4 * 3, this.height / 2, this.width / 16, this.height / 8, Math.PI / 4);
      this.init_static(this.width / 4, this.height / 2, this.width / 16, this.height / 8, Math.PI / 4);
      this.init_static(1, 1, 2, 4, Math.PI / 4);
      this.init_static(this.width - 1, 1, 2, 4, -Math.PI / 4);
      this.init_static(1, this.height - 1, 2, 4, -Math.PI / 4);
      return this.init_static(this.width - 1, this.height - 1, 2, 4, Math.PI / 4);
    };
    Toy.prototype.init_static = function(x, y, w, h, a) {
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
      if (a) {
        body.SetXForm(new b2Vec2(x, y), a);
      }
      this.bodies.push(body);
      return body;
    };
    return Toy;
  }, this));
})();
