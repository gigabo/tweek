require.def [
  'toy2d/debug',
  'toy2d/canvas_scale',
  'toy2d/controls',
  '/js/box2d.js',
],
(Debug, Scale, Controls) =>

  class Trail
    constructor: (@game) ->
      this.init()

    init: () ->
      @length = 40
      @sparks = []

    step: () ->
      this.add_spark()

    add_spark: () ->
      rocket = @game.rocket
      rpos = rocket.body.GetPosition()
      rx = rpos.x
      ry = rpos.y
      ra = rocket.body.GetAngle() + Math.PI / 2

      x = rx - Math.cos(ra)*rocket.length*1.5
      y = ry - Math.sin(ra)*rocket.length*1.5
      w = 0.2
      h = 0.2
      bodyDef = new b2BodyDef()
      bodyDef.position.Set(x, y)
      body = @game.world.CreateBody(bodyDef)
      shapeDef = new b2PolygonDef()
      shapeDef.SetAsBox(w, h)
      body.w = w
      body.h = h
      shapeDef.restitution = 1.0
      shapeDef.density = 0.01
      shapeDef.friction = 0.0
      body.CreateShape(shapeDef)
      body.SetMassFromShapes()
      thrust = 30
      rand = (Math.random()-.5)
      lv = rocket.body.GetLinearVelocity()
      t_x = Math.cos(ra+rand)*thrust-lv.x
      t_y = Math.sin(ra+rand)*thrust-lv.y
      body.SetLinearVelocity(new b2Vec2(-t_x,-t_y))
      @sparks.push(body)
      if @sparks.length > @length
        dead = @sparks.shift()
        @game.world.DestroyBody(dead)

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.fillStyle = 'black'
      i = 0
      for body in @sparks
        i++
        div = i/@sparks.length
        tff = 255-Math.floor(div * 255)
        ctx.fillStyle = "rgba(255,#{tff},#{tff},#{div})"
        t = body.m_xf
        ctx.translate(t.position.x, t.position.y)
        ctx.rotate(body.GetAngle())
        mult = 0.4*(5-(4*i/@sparks.length))
#        ctx.fillRect(-body.w*mult, -body.h*mult, body.w*2*mult, body.h*2*mult)
        ctx.beginPath()
        ctx.arc(0,0,mult,2*Math.PI,false)
        ctx.rotate(-body.GetAngle())
        ctx.translate(-t.position.x, -t.position.y)
        ctx.closePath()
        ctx.fill()


  class Rocket
    constructor: (@game) ->
      this.init()
    init: () ->
      x = @game.width/2
      y = 2
      w = 0.2
      @length = 1.0
      h = @length
      bodyDef = new b2BodyDef()
      bodyDef.position.Set(x, y)
      @body = @game.world.CreateBody(bodyDef)
      shapeDef = new b2PolygonDef()
      shapeDef.SetAsBox(w, h)
      @body.w = w
      @body.h = @length
      shapeDef.restitution = 0.4
      shapeDef.density = 1.0
      shapeDef.friction = 0.01
      @body.CreateShape(shapeDef)
      @body.SetMassFromShapes()
      @trail = new Trail(@game)

    step: () ->
      t = @body.m_xf
      a = @body.GetAngle() + Math.PI/2
      thrust = 20
      t_x = Math.cos(a) * thrust
      t_y = Math.sin(a) * thrust
      l_x = t.position.x - @length/2*Math.cos(a)
      l_y = t.position.y - @length/2*Math.sin(a)
      @body.ApplyForce(new b2Vec2(t_x,t_y),new b2Vec2(l_x,l_y))
      @body.SetAngularVelocity(@body.GetAngularVelocity()*0.95)
      torque = 8
      if @game.controls.left  then @body.ApplyTorque(torque)
      if @game.controls.right then @body.ApplyTorque(-torque)
      @trail.step()

    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.fillStyle = 'white'
      t = @body.m_xf
      ctx.translate(t.position.x, t.position.y)
      ctx.rotate(@body.GetAngle())
      ctx.fillRect(-@body.w, -@body.h, @body.w*2, @body.h*2)
      ctx.rotate(-@body.GetAngle())
      ctx.translate(-t.position.x, -t.position.y)
      @trail.draw(graphics)


  class Toy
    constructor: (canvas) ->
      new Scale(canvas, .8)
      @canvas = canvas[0]
      @ctx = @canvas.getContext('2d')
      @width = 100.0
      ppm = @canvas.width/@width
      @height = @canvas.height/ppm
      @ctx.setTransform(ppm, 0, 0, -ppm, 0, @canvas.height)
      @tick = 0
      @bodies = []
      this.init_world()
      this.init_walls()
      @controls = new Controls(this)
      @rocket = new Rocket(this)
      this.start()

    start: () ->
      if !@running
        @main_interval = setInterval () =>
          this.step()
        , 20
        @running = true

    stop: () ->
      if @running
        clearInterval @main_interval
        @running = false

    step: () ->
        @world.Step(1.0/60.0, 10)

        this.draw_bodies()
        @rocket.step(this)
        @rocket.draw(this)

    draw_bodies: () ->
      @ctx.clearRect(0.0, 0.0, @canvas.width, @canvas.height)
      @ctx.fillStyle = 'black'
      @ctx.fillRect(0.0,0.0,@canvas.width,@canvas.height)
      for body in @bodies
        @ctx.fillStyle = body.color || 'blue'
        t = body.m_xf
        @ctx.translate(t.position.x, t.position.y)
        @ctx.rotate(body.GetAngle())
        @ctx.fillRect(-body.w, -body.h, body.w*2, body.h*2)
        @ctx.rotate(-body.GetAngle())
        @ctx.translate(-t.position.x, -t.position.y)



    init_world: () ->
      worldAABB = new b2AABB()
      worldAABB.lowerBound.Set(-1000.0, -1000.0)
      worldAABB.upperBound.Set(1000.0, 1000.0)
      gravity = new b2Vec2(0.0, -9.8)
      @world = new b2World(worldAABB, gravity, true)

    init_walls: () ->
      this.init_static(@width/2.0, 0.2, @width, 0.4)          # top
      this.init_static(@width/2.0, @height-0.2, @width, 0.4)  # bottom
      this.init_static(0.2, @height/2.0, 0.4, @height)        # left
      this.init_static(@width-0.2, @height/2.0, 0.4, @height) # right

      # barriers
      this.init_static(@width/4, @height/2, @width/16, @height/8, Math.PI/4)
      this.init_static(@width/4*3, @height/2, @width/16, @height/8, Math.PI/4)
      this.init_static(@width/4, @height/2, @width/16, @height/8, Math.PI/4)

      this.init_static(1, 1, 2, 4, Math.PI/4)
      this.init_static(@width-1, 1, 2, 4, -Math.PI/4)
      this.init_static(1, @height-1, 2, 4, -Math.PI/4)
      this.init_static(@width-1, @height-1, 2, 4, Math.PI/4)

    init_static: (x, y, w, h, a) ->
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
      if a then body.SetXForm(new b2Vec2(x, y), a)
      @bodies.push(body)
      body
