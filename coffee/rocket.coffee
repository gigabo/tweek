init = () ->
  canvas = $("#play_canvas")

  $("#canvas_container").append("<br>Arrows steer.")

  require ['rg_game'], (Game) => new Game(canvas)

$(document).ready init
