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
      @finishing = false
      @performance = new Performance(this)
      @graphics = new Graphics(this,canvas)
      @controls = new Controls(this)
      @trail = new Trail(this)
      @width  = @graphics.width
      @height = @graphics.height
      @level_number = 4
      @max_level = 6
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
        if !@finishing and @level.won()
          @finishing = true
        @protagonist.step()
        @trail.step()
        @level.step()
        this.draw()
        @performance.check()
      else
        this.init_level()

    outro_stop: () ->
      clearInterval @outro_interval
      this.advance_level()

    outro_step: () ->
      if @level.outro_done()
        this.outro_stop()
      else
        @graphics.clear()
        @level.outro_step()
        @level.outro_draw(@graphics)

    outro: () ->
      this.stop()
      @outro_interval = setInterval () =>
        this.outro_step()
      , @performance.step_time

    begin_level: () ->
      if @finishing
        @finishing = false
        this.outro()
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




