

init_controls = () ->
  $("#play_container").append("<input type='text' spellcheck='false' id='api_query'>")
  $("#play_container").append("<input id='api_go' type='button' value='Go'>")
  $("#play_container").append("<pre id='api_result'></pre>")
  $("#api_go").click api_go
  $("#api_query").width("90%")
  $("#api_query").focus()
  $("#api_query").keydown (evt) =>
    if evt.keyCode == 13 then api_go()

api_go = () ->
  query = $("#api_query").val()
  $.getJSON "/api/json/#{query}", (res) =>
    dump = $.dump(res)
    $("#api_result").empty()
    if dump.length
      $("#api_result").append("#{dump}\n")
    else
      $("#api_result").append("No response.\n")


$(document).ready () =>
  $("#play_canvas").remove() # Don't need this for now
  $.getScript "/js/jquery.tweekdump.js", init_controls
