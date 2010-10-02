require.def ['rg/debug', 'rg/dialog'], (Debug, Dialog) =>

  class Transition
    constructor: (@game) ->
      @advance = @done = false
      @dialog = new Dialog(@game, 1200, 600)
      unless @game.level.no_score
        @dialog.label('left', "Try Again")
      @dialog.label('right', "On to Level #{@game.level_number + 1}")
#      @dialog.label('up', "Menu")
#      @dialog.label('down', "Instant Replay")
      @l_was_up = @r_was_up = false
      @finishing = false

    step: () ->
      this.get_controls()
      if @dialog.finishing then @done = @dialog.done()
      else
        if @l_down then @dialog.finishing = true
        else if @r_down then @advance = @dialog.finishing = true

      if @game.level.outro_done() then @dialog.step()
      else @game.level.outro_step()

    draw: (graphics) ->
      if @game.level.outro_done() then @dialog.draw(graphics)
      else @game.level.outro_draw(graphics)

    get_controls: () ->
      @l_down = @game.controls.left
      @r_down = @game.controls.right
      @l_was_up = true unless @l_down
      @r_was_up = true unless @r_down
      @l_down = false unless @l_was_up
      @r_down = false unless @r_was_up
      @l_down = false if @game.level.no_score
