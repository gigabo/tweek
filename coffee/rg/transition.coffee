require.def ['rg/debug', 'rg/dialog'], (Debug, Dialog) =>

  class Transition
    constructor: (@game) ->
      @advance = @done = false
      @dialog = new Dialog(@game, @game.width*.75, @game.height*.75, 'top')
      unless @game.level.no_score
        @dialog.option('left', "Try Again")
      @dialog.option('right', "On to Level #{@game.level_number + 1}")
#      @dialog.label('up', "Menu")
#      @dialog.label('down', "Instant Replay")
      @l_was_up = @r_was_up = false
      @finishing = false

    step: () ->
      if @game.level.outro_done() then @dialog.step()
      else @game.level.outro_step()

      @done = @dialog.selected and (@dialog.done() or !@dialog.started())
      if @dialog.selected
        if @dialog.selected == 'right' then @advance = true

    draw: (graphics) ->
      @game.level.outro_draw(graphics)
      if @game.level.outro_done() then @dialog.draw(graphics)

    get_controls: () ->
      @l_down = @game.controls.left
      @r_down = @game.controls.right
      @l_was_up = true unless @l_down
      @r_was_up = true unless @r_down
      @l_down = false unless @l_was_up
      @r_down = false unless @r_was_up
      @l_down = false if @game.level.no_score
