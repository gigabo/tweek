
$(document).ready () =>
  $(".highlight").find(".s1").each (i, e) =>
    text = $(e).text()
    if text.match(/^'\w+\/(\w|\/)+'$/)
      text = text.replace(/^'|'$/g,'')
      newtext = "'<a href='/docs/coffee/#{text}.html'>#{text}</a>'"
      $(e).html(newtext)
