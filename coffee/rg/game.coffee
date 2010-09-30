require.def [
  'rg/controls',
  'rg/performance',
  'rg/graphics',
  'rg/debug'
],
(Controls, Performance, Graphics, Debug) =>

  UNINITIALIZED = -1
  IN_LEVEL = 0
  FINISHING = 1
  OUTRO = 2
  ADVANCING = 3

  class Game
    constructor: (canvas) ->
      @running = false
      @state = UNINITIALIZED
      @previous_state = UNINITIALIZED
      @performance = new Performance(this)
      @graphics = new Graphics(this,canvas)
      @controls = new Controls(this)
      @width  = @graphics.width
      @height = @graphics.height
      @level_number = 0
      @max_level = 6
      this.start()

    finishing: () -> @state == FINISHING

    change_state: (new_state) ->
      @previous_state = @state
      @state = new_state

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
      if @level.won() then this.change_state(FINISHING)
      @level.step()
      this.draw()

    step: () ->
      @performance.check()
      switch @state
        when OUTRO then this.outro_step()
        when IN_LEVEL, FINISHING then this.level_step()
        when ADVANCING then this.advance_level()
        else this.init_level()

    outro_step: () ->
      if @level.outro_done() then this.change_state(ADVANCING)
      else
        @level.outro_step()
        this.draw()

    begin_level: () ->
      if @state == FINISHING then this.change_state(OUTRO)
      else
        @level.begin()
        this.change_state(IN_LEVEL)

    advance_level: () ->
      @level_number += 1
      @level_number = "last" if @level_number > @max_level
      this.init_level()

    init_level: () ->
      this.stop()
      require ["rg/level/#{@level_number}"], (Level) =>
        @level = new Level(this)
        this.begin_level()
        this.start()

    draw: () ->
      @graphics.clear()
      switch @state
        when OUTRO then @level.outro_draw(@graphics)
        else @level.draw(@graphics)
