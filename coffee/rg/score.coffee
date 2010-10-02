require.def ['rg/debug', 'rg/score_manager'], (Debug,ScoreManager) =>

  class Score
    constructor: (@game, @type) ->
      @hidden = false
      @off_screen = false
      @waiting = 0
      @wait    = 50
      @slide_stride = 10
      @outro_stride = 20
      @hud_on_y_pos = @game.height-20
      @hud_off_y_pos = @game.height+20
      @y_pos = if @game.show_hud() then @hud_on_y_pos else @hud_off_y_pos
      @queue = []
      @manager = new ScoreManager
      @manager.register(this) unless @type == 'total'
      this.load_strategy()

    load_strategy: () ->
      require ["rg/score_#{@type}"], (Strategy) =>
        @strategy = new Strategy(@game)

    value: () -> this.strategy.value

    hide: () -> @hidden = true

    dispatch: (method) ->
      if @strategy
        if @queue
          while catchup = @queue.shift()
            @strategy[catchup]()
          @queue = false
        @strategy[method]()
      else
        @queue.push method

    reset: () -> this.dispatch 'reset'
    step: ()  ->
      @off_screen = false
      if @game.show_hud()
        if @y_pos > @hud_on_y_pos then @y_pos-=@slide_stride
      else
        if @y_pos < @hud_off_y_pos then @y_pos+=@slide_stride
        else @off_screen = true
      this.dispatch 'step'

    draw: (graphics) ->
      return if @hidden or (@off_screen and not @game.in_transition())
      ctx = graphics.ctx
      ctx.font          = "20pt Verdana"
      ctx.textAlign     = "right"
      ctx.textBaseline  = "middle"
      ctx.fillStyle     = @strategy.color()
      graphics.text @strategy.value, @strategy.x_pos(), @y_pos

    outro_step: ()  -> @y_pos -= @outro_stride if @waiting == 0
    outro_draw: (g) -> this.draw(g)
    outro_done: ()  ->
      @hidden or ((@y_pos < @game.height / 2) and (++@waiting >= @wait))
