require.def [
  'rg/controls',
  'rg/performance',
  'rg/graphics',
  'rg/rocket',
  'rg/trail',
  'rg/debug'
],
(Controls, Performance, Graphics, Rocket, Trail, Debug) =>

  UNINITIALIZED = -1
  IN_LEVEL = 0
  FINISHING = 1
  OUTRO = 2
  ADVANCING = 3

  class Game
    constructor: (canvas) ->
      @running = false
      @state = UNINITIALIZED
      @performance = new Performance(this)
      @graphics = new Graphics(this,canvas)
      @controls = new Controls(this)
      @trail = new Trail(this)
      @width  = @graphics.width
      @height = @graphics.height
      @level_number = 0
      @max_level = 6
      this.start()

    finishing: () -> @state == FINISHING

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

    level_step: () ->
      if @level.won() then @state = FINISHING
      @protagonist.step()
      @trail.step()
      @level.step()
      this.draw()
      @performance.check()


    step: () ->
      switch @state
        when OUTRO then this.outro_step()
        when IN_LEVEL, FINISHING then this.level_step()
        when ADVANCING then this.advance_level()
        else this.init_level()

    outro_step: () ->
      if @level.outro_done()
        @state = ADVANCING
      else
        @graphics.clear()
        @level.outro_step()
        @level.outro_draw(@graphics)

    begin_level: () ->
      if @state == FINISHING then @state = OUTRO
      else
        @level.begin()
        [x, y] = @level.starting_position()
        @protagonist = new Rocket(this, x, y)
        @trail.owner = @protagonist
        @state = IN_LEVEL

    advance_level: () ->
      @level_number += 1
      this.init_level()

    init_level: () ->
      this.stop()
      @level_number = "last" if @level_number > @max_level
      require ["rg/level/#{@level_number}"], (Level) =>
        @level = new Level(this)
        this.begin_level()
        this.start()

    draw: () ->
      @graphics.clear()
      @protagonist.draw(@graphics)
      @trail.draw(@graphics)
      @level.draw(@graphics)
