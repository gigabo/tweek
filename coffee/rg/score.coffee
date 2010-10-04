require.def ['rg/debug', 'rg/score_manager'], (Debug,ScoreManager) =>

  class Score
    constructor: (@game, @type) ->
      @off_screen = false
      @slide_stride = 10
      @wait = 0
      @outro_wait = 20
      @hud_on_y_pos = @game.height-20
      @hud_off_y_pos = @game.height+20
      @y_pos = if @game.hud_on then @hud_on_y_pos else @hud_off_y_pos
      @queue = []
      @manager = new ScoreManager
      @manager.register(this) unless @type == 'total'
      this.load_strategy()

    load_strategy: () ->
      require ["rg/score_#{@type}"], (Strategy) =>
        @strategy = new Strategy(@game)

    value: () -> this.strategy.value

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
      this.dispatch 'step'
      if @highlight
        @y_pos = @hud_on_y_pos
      else
        if @game.show_hud() then this.raise()
        else
          if @y_pos < @hud_off_y_pos then @y_pos+=@slide_stride
          else @off_screen = true

    raise: () ->
      if @y_pos > @hud_on_y_pos then @y_pos-=@slide_stride
      if @y_pos < @hud_on_y_pos then @y_pos = @hud_on_y_pos

    draw: (graphics) ->
      return if (@off_screen and not @game.in_transition() and not @highlight)
      ctx = graphics.ctx
      ctx.font          = "20pt Verdana"
      ctx.textAlign     = "center"
      ctx.textBaseline  = "middle"
      ctx.fillStyle     = @strategy.color()
      graphics.text @strategy.value, @strategy.x_pos(), @y_pos
      if @highlight
        ctx.strokeStyle = @strategy.color()
        ctx.lineWidth = 5
        graphics.rect_stroke_rounded @strategy.x_pos()-100,
                                     @y_pos - 22,
                                     200,
                                     40,
                                     10

    outro_step: ()  -> this.raise()
    outro_draw: (g) -> this.draw(g)
    outro_done: ()  ->
      @y_pos <= @hud_on_y_pos and (@game.hud_on or @wait++ > @outro_wait)
