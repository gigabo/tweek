require.def [
  'rg/controls',
  'rg/performance',
  'rg/graphics',
  'rg/rocket',
  'rg/trail',
  'rg/debug'
],
(Controls, Performance, Graphics, Rocket, Trail, Debug) =>

  class Game
    constructor: (canvas) ->
      @running = false
      @performance = new Performance(this)
      @graphics = new Graphics(this,canvas)
      @controls = new Controls(this)
      @width  = @graphics.width
      @height = @graphics.height
      this.start_level()
      this.start()

    start: () ->
      @performance.init()
      @main_interval = setInterval () =>
        this.step()
      , @performance.step_time
      @running = true

    stop: () ->
      clearInterval @main_interval
      @running = false

    step: () ->
      @protagonist.step()
      @trail.step()
      this.draw()
      @performance.check()

    start_level: () ->
      @protagonist = new Rocket(this, @width/2, @height/2)
      @trail ||= new Trail(this)
      @trail.owner = @protagonist

    draw: () ->
      @graphics.clear()
      @protagonist.draw(@graphics)
      @trail.draw(@graphics)




