

init_controls = () ->
  $("#play_container").append("<input type='text' spellcheck='false' id='api_query'>")
  $("#play_container").append("<input id='api_go' type='button' value='Go'>")
  $("#play_container").append("<pre id='api_result'></pre>")
  $("#api_go").click api_go
  $("#api_query").width("90%")
  $("#api_query").keydown (evt) =>
    if evt.keyCode == 13 then api_go()

api_go = () ->
  query = $("#api_query").val()
  $.getJSON "/api/json/#{query}", (res) =>
    dump = $.dump(res)
    $("#api_result").empty()
    $("#api_result").append("Got a response: #{dump}\n")


$(document).ready () =>
  $("#play_canvas").remove() # Don't need this for now
  $.getScript "/js/jquery.dump.js", init_controls
