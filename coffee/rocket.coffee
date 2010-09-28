init = () ->
  canvas = $("#play_canvas")

  require ['rg/game'], (Game) => new Game(canvas)

$(document).ready init
