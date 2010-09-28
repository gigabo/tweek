require.def () =>

  class Controls
    constructor: (@game) ->
      @thrust_on  = true
      @rot_l      = false
      @rot_r      = false
      this.init()

    init: () ->
      $(document).keydown (e) =>
        switch e.keyCode
          when 37 then @rot_l = true
          when 39 then @rot_r = true
          when 32 then @thrust_on = false
  #        else debug("keyCode: #{e.keyCode}")

      $(document).keyup (e) =>
        switch e.keyCode
          when 37 then @rot_l = false
          when 39 then @rot_r = false
          when 32 then @thrust_on = true
          when 80, 81 # P, Q
            if @game.running then @game.stop() else @game.start()

