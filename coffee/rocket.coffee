canvas          = undefined
trail           = undefined
performance     = undefined
game = undefined

init = () ->
  canvas        = $("#play_canvas")

  $("#canvas_container").append("<br>Arrows steer.")


  require ['rg_game'], (Game) =>

    game = new Game(canvas)

$(document).ready init
