require.def ['rg/debug'], (Debug) =>

  class Controls
    constructor: (@game) ->
      this.init()

    add_listener: (f) ->
      id = @listener_id_seq++
      @listeners[id] = f
      id

    remove_listener: (id) -> delete @listeners[id]

    handle_event: (e, down) ->
      key = e.keyCode
      mapped = @map[key]
      this[mapped] = down
      unless down
        switch mapped
          when 'p', 'q'
            if @game.running then @game.stop() else @game.start()
      listener() for listener in _(@listeners).values()

    init: () ->
      this.init_map()
      @listeners = {}
      @listener_id_seq = 0
      $(document).keydown   (e) => this.handle_event(e, true)
      $(document).keyup     (e) => this.handle_event(e, false)
      $(document).keydown   (e) =>
        # Don't let the down arrow scroll the page
        if @map[e.keyCode] == 'down' then e.preventDefault()

    init_map: () ->
      @space  = false
      @left   = false
      @right  = false
      @up     = false
      @down   = false
      @p = @q = false

      @map =
        37: 'left'
        39: 'right'
        38: 'up'
        40: 'down'
        32: 'space'
        80: 'p'
        81: 'q'

