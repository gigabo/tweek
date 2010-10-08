require.def [
  'toy2d/debug',
#  'toy/about_pasta',
  '/js/box2d.js',
],
(Debug) =>

  class Toy
    constructor: (canvas) ->
      @canvas = canvas[0]
      @ctx = @canvas.getContext('2d')
      @width = 40.0
      ppm = @canvas.width/@width
      @height = @canvas.height/ppm
      @ctx.setTransform(ppm, 0, 0, -ppm, 0, @canvas.height)
      @tick = 0
      @bodies = []
      this.init_world()
      this.init_walls()
      this.start()

    start: () ->
      if !@running
        @main_interval = setInterval () =>
          this.step()
        , 20
        @running = true

    step: () ->
        if @bodies.length < 200 and ++@tick == 10
          @tick = 0
          this.spawn_random_box()

        @world.Step(1.0/60.0, 10)

        this.draw_bodies()

    draw_bodies: () ->
      @ctx.clearRect(0.0, 0.0, @canvas.width, @canvas.height)
      for body in @bodies
        @ctx.fillStyle = body.color || 'black'
        t = body.m_xf
        @ctx.translate(t.position.x, t.position.y)
        @ctx.rotate(body.GetAngle())
        @ctx.fillRect(-body.w, -body.h, body.w*2, body.h*2)
        @ctx.rotate(-body.GetAngle())
        @ctx.translate(-t.position.x, -t.position.y)



    init_world: () ->
      worldAABB = new b2AABB()
      worldAABB.lowerBound.Set(-10000.0, -10000.0)
      worldAABB.upperBound.Set(10000.0, 10000.0)
      gravity = new b2Vec2(0.0, -9.8)
      @world = new b2World(worldAABB, gravity, true)

    init_walls: () ->
      this.init_static(@width/2.0, 0.2, @width, 0.4)
      this.init_static(0.2, @height/2.0, 0.4, @height)
      this.init_static(@width-0.2, @height/2.0, 0.4, @height)

    init_static: (x, y, w, h) ->
      groundBodyDef = new b2BodyDef()
      groundBodyDef.position.Set(x, y)
      body = @world.CreateBody(groundBodyDef)
      groundShapeDef = new b2PolygonDef()
      groundShapeDef.restitution = 0.0
      groundShapeDef.friction = 0.5
      groundShapeDef.density = 1.0
      body.w = w
      body.h = h
      groundShapeDef.SetAsBox(body.w, body.h)
      body.CreateShape(groundShapeDef)
      body.SynchronizeShapes()
      @bodies.push(body)
      body

    spawn_random_box: () ->
      x = 5+Math.random()*(@width-10)
      y = @height + 10.0
      w = 0.1
      h = 2.0+Math.random()*5.5
      a = 2.0-Math.random()*4.0
      bodyDef = new b2BodyDef()
      bodyDef.position.Set(x, y)
      body = @world.CreateBody(bodyDef)
      shapeDef = new b2PolygonDef()
      shapeDef.SetAsBox(w, h)
      body.w = w
      body.h = h
      shapeDef.restitution = 0.4
      shapeDef.density = 1.0
      shapeDef.friction = 0.5
      body.CreateShape(shapeDef)
      body.SetMassFromShapes()
      body.SetAngularVelocity(a)
      base = 20
      r = Math.floor(Math.random() * 100)+base
      g = Math.floor(Math.random() * 100)+base
      b = Math.floor(Math.random() * 100)+base
      body.color = "rgba(#{r}, #{g}, #{b}, 1.0)"
      @bodies.push(body)
