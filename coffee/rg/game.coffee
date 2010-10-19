require.def [
  'rg/controls',
  'rg/performance',
  'rg/graphics',
  'rg/player',
  'rg/transition',
  'rg/debug',
  'toy2d/canvas'
],
(Controls, Performance, Graphics, Player, Transition, Debug, Canvas) =>

  UNINITIALIZED = -1
  IN_LEVEL = 0
  FINISHING = 1
  TRANSITION = 2
  ADVANCING = 3

  class Game
    constructor: () ->
      @running = false
      @state = UNINITIALIZED
      @previous_state = UNINITIALIZED
      canvas = (new Canvas).jquery()
      @performance = new Performance(this)
      @graphics = new Graphics(this,canvas)
      @controls = new Controls(this)
      @player = new Player(this)
      @width  = @graphics.width
      @height = @graphics.height
      @level_number = 0
      @hud_on = false
      this.start()

    finishing: () -> @state == FINISHING
    in_transition:  () -> @state == TRANSITION

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
#      Debug.clear()
#      Debug.out("State: #{@state}, pstate: #{@previous_state}")
      @performance.check()
      switch @state
        when IN_LEVEL, FINISHING  then this.level_step()
        when TRANSITION           then this.transition_step()
        when ADVANCING            then this.init_level()
        else                           this.init_level()

    transition_step: () ->
      @transition = new Transition(this) unless @transition
      if @transition.done
        @level_number += if @transition.advance then 1 else 0
        @transition = undefined
        this.change_state(ADVANCING)
      else
        @transition.step()
        this.draw()


    begin_level: () ->
      if @state == FINISHING then this.change_state(TRANSITION)
      else
        @level.begin()
        this.change_state(IN_LEVEL)

    init_level: () ->
      this.stop()
      require ["rg/level/#{@level_number}"], (Level) =>
        @level = new Level(this)
        this.begin_level()
        this.start()

    draw: () ->
      @graphics.clear()
      switch @state
        when TRANSITION then @transition.draw(@graphics) if @transition
        else @level.draw(@graphics)

    show_hud: () ->
      switch @state
        when IN_LEVEL, FINISHING then @hud_on
        else false

    toggle_hud: () ->
      switch @state
        when IN_LEVEL, FINISHING
          @hud_on = if @hud_on then false else true
