require.def ['rg/debug', 'rg/score_manager'], (Debug,ScoreManager) =>

  class Score
    constructor: (@game, @type) ->
      @waiting = 0
      @wait    = 50
      @y_pos = @game.height-20
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
    step: ()  -> this.dispatch 'step'
    draw: (graphics) ->
      ctx = graphics.ctx
      ctx.font          = "20pt Verdana"
      ctx.textAlign     = "right"
      ctx.textBaseline  = "middle"
      ctx.fillStyle     = @strategy.color()
      graphics.text @strategy.value, @strategy.x_pos(), @y_pos

    outro_step: ()  -> @y_pos -= 10 if @waiting == 0
    outro_done: ()  -> (@y_pos < @game.height / 2) and (++@waiting >= @wait)
    outro_draw: (g) -> this.draw(g)
