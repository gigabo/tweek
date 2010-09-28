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
      @advancing = false
      @performance = new Performance(this)
      @graphics = new Graphics(this,canvas)
      @controls = new Controls(this)
      @trail = new Trail(this)
      @width  = @graphics.width
      @height = @graphics.height
      @level_number = 0
      @max_level = 2
      this.start()

    start: () ->
      if !@running
        @performance.init()
        @main_interval = setInterval () =>
          this.step()
        , @performance.step_time
        @running = true

    stop: () ->
      if @running
        clearInterval @main_interval
        @running = false

    step: () ->
      if @level_running
        if !@advancing and @level.won()
          @advancing = true
        @protagonist.step()
        @trail.step()
        @level.step()
        this.draw()
        @performance.check()
      else
        this.init_level()

    begin_level: () ->
      if @advancing
        @advancing = false
        this.advance_level()
      else
        @level.begin()
        [x, y] = @level.starting_position()
        @protagonist = new Rocket(this, x, y)
        @trail.owner = @protagonist
        @level_running = true

    advance_level: () ->
      @level_number += 1
      this.init_level()

    init_level: () ->
      this.stop()
      if @level_number > @max_level
        @level_number = "last"
      require ["rg/level/#{@level_number}"], (Level) =>
        @level = new Level(this)
        this.begin_level()
        this.start()

    draw: () ->
      @graphics.clear()
      @protagonist.draw(@graphics)
      @trail.draw(@graphics)
      @level.draw(@graphics)




