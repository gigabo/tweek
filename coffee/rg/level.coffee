require.def [
  'rg/rocket',
  'rg/banner',
  'rg/goal',
  'rg/barrier',
  'rg/score_manager',
  'rg/score',
  'rg/debug'
], (Rocket, Banner, Goal, Barrier, ScoreManager, Score, Debug) =>
  class Level
    constructor: (@game) ->
      @start_x = @game.width / 2
      @start_y = @game.height
      @goals   = []
      @barriers = []
      @objects = []
      @scores = []
      @messages = []
      @score_manager = new ScoreManager(@game)
      @success_message = "Success!"
      @done = true
      this.init()
      @messages.unshift @title
      this.init_protagonist()
      this.init_scores()
      this.set_message()
      this.bundle_objects()

    starting_position: () -> [ @start_x, @start_y ]

    init_protagonist: () ->
      [x, y] = this.starting_position()
      @protagonist = new Rocket(@game, x, y)

    set_message: () ->
      if @messages and @messages.length
        @message_banner = new Banner(@game, @messages.shift())
        @message_banner.fade()
      else
        @message_banner = undefined

    bundle_objects: () ->
      for collection in [ @goals, @barriers, @scores, [@protagonist] ]
        for item in collection
          @objects.push item

    init_scores: () ->
      @score_manager.reset()
      return if @no_score
      for type in @score_manager.types()
        score = this.add_score(type)
        score.hide() if @game.player.suppress_feature("score_#{type}")

    add_goal: (x, y, r) -> i = new Goal(@game, x, y, r); @goals.push i; i
    add_barrier: (x, y, r) -> i = new Barrier(@game,x,y,r);@barriers.push i; i
    add_score: (type) -> i = new Score(@game, type); @scores.push i; i


    step: () ->
      for obj in @objects
        obj.step()
      if @message_banner
        @message_banner.step()
        if @message_banner.done()
          this.set_message()

    draw: (graphics) ->
      for obj in @objects
        obj.draw(graphics)
      if @message_banner
        @message_banner.draw(graphics)

    won: () ->
      if @done
        for goal in @goals
          if !goal.done() then return false
        @messages = [@success_message]
        this.set_message()
        return true

    begin: () ->
      for collection in [ @goals, @barriers, @scores, [@protagonist] ]
        for item in collection
          item.reset()

    outro_done: () ->
      for item in @objects
        return false if item.outro_done and !item.outro_done()
      return true

    outro_step: () ->
      for item in @objects
        item.outro_step() if item.outro_step and !item.outro_done()

    outro_draw: (graphics) ->
      for item in @objects
        item.outro_draw(graphics) if item.outro_draw

