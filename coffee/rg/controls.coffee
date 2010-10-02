require.def ['rg/debug'], (Debug) =>

  class Controls
    constructor: (@game) ->
      @space  = false
      @left   = false
      @right  = false
      @up     = false
      @down   = false
      this.init()

    init: () ->
      $(document).keydown (e) =>
        switch e.keyCode
          when 37 then @left  = true
          when 39 then @right = true
          when 38 then @up    = true
          when 40 then @down  = true
          when 32 then @space = true

      $(document).keyup (e) =>
        switch e.keyCode
          when 37 then @left  = false
          when 39 then @right = false
          when 38 then @up    = false
          when 40 then @down  = false; @game.toggle_hud()
          when 32 then @space = false
          when 80, 81 # P, Q
            if @game.running then @game.stop() else @game.start()

    thrust_on: () -> !@space
    rotate_l: () -> @left and !@game.finishing()
    rotate_r: () -> @right and !@game.finishing()
