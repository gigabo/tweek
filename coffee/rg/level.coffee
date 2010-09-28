require.def [
  'rg/banner',
  'rg/goal',
  'rg/barrier',
  'rg/debug'
], (Banner, Goal, Barrier, Debug) =>
  class Level
    constructor: (@game) ->
      @start_x = @game.width / 2
      @start_y = @game.height
      @goals   = []
      @barriers = []
      @objects = []
      @messages = []
      this.init()
      this.set_message()
      this.bundle_objects()

    starting_position: () -> [ @start_x, @start_y ]

    set_message: () ->
      if @messages and @messages.length
        @message_banner = new Banner(@game, @messages.shift())
        @message_banner.fade()
      else
        @message_banner = undefined

    bundle_objects: () ->
      for goal in @goals
        @objects.push goal
      for barrier in @barriers
        @objects.push barrier

    add_goal: (x, y, r) -> @goals.push new Goal(@game, x, y, r)
    add_barrier: (x, y, r) -> @barriers.push new Barrier(@game, x, y, r)


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
      for goal in @goals
        if !goal.done() then return false
      return true

    begin: () ->
      for goal in @goals
        goal.reset()
      for barrier in @barriers
        barrier.reset()

