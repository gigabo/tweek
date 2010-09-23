canvas          = undefined
ctx             = undefined
user            = undefined
dates           = undefined
grid            = undefined
initial_ratio   = undefined
interval        = undefined
WIDTH           = undefined
HEIGHT          = undefined
max_encountered = 0
frame           = 0
halos           = []
halo_life       = 10

init = () ->
  init_handle_input()

  canvas        = $("#chart_canvas")
  ctx           = canvas[0].getContext("2d")

  WIDTH = canvas.width()
  HEIGHT = canvas.height()
  update_canvas_width()

  interval      = setInterval(update_canvas_width, 50)

  api_go()

update_canvas_width = () ->
  width = canvas.parent().innerWidth()
  canvas.width(width)
  canvas.height(width/2)

api_go = () ->
  $.getJSON "/api/json/punch/#{user}", draw_punchcard

draw_punchcard = (data) ->
  dates = data.dates
  frame = 0

  grid = _.map _.range(0,7), (i) =>
    _.map _.range(0,24), (j) =>
      0

  setInterval(step, 100)

clear = () ->
  ctx.clearRect(0, 0, WIDTH, HEIGHT)

draw = () ->
  clear()

  i = 0

  draw_grid()
  draw_key()
  while i < grid.length
    j = 0
    while j < grid[i].length
      circle(j, i, grid[i][j])
      j++
    i++
  draw_halos()

class Halo
  constructor: (@x, @y, @r, @ttl) ->

draw_halos = () ->
  _.each halos, (h) =>
    a = h.ttl / halo_life
    ctx.strokeStyle = "rgba(0, 0, 0, #{a})"
    circle(h.x, h.y, h.r + (halo_life - h.ttl)*.6, false)
    h.ttl--

  while halos[0].ttl == 0
    halos.shift()

new_halo = (x, y, r) ->
  halos.push(new Halo(x, y, r, halo_life))

draw_grid = () ->
  ctx.strokeStyle = "rgba(0, 0, 0, 1)"
  line(.25,0,.25,6.75)
  line(.25,6.75,24,6.75)
  _.each _.range(0, 7), (i) =>
    line(.15,i,.25,i)
  _.each _.range(0, 24), (i) =>
    line(i+1,6.75,i+1,6.85)

draw_key = () ->
  day_label = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
  hour_label = [
    '12am', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    '12pm', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  ]
  ctx.font         = "14pt Verdana"
  ctx.textAlign    = "right"
  ctx.textBaseline = "middle"
  _.each _.range(0, 7), (i) =>
    text("#{day_label[i]}", 0, i)
  ctx.textAlign    = "center"
  ctx.textBaseline = "top"
  _.each _.range(0, 24), (i) =>
    text("#{hour_label[i]}", i+1, 7)

grid_x = (x) -> WIDTH/26*(x+1)

grid_y = (y) -> HEIGHT/9*(y+1)

line = (x1, y1, x2, y2) ->
  x1 = grid_x(x1)
  y1 = grid_y(y1)
  x2 = grid_x(x2)
  y2 = grid_y(y2)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()

text = (text, x, y) ->
  x = grid_x(x)
  y = grid_y(y)
  ctx.fillText(text, x, y)

circle = (x,y,r,fill) ->
  fill = true if fill == undefined

  max_circle = (WIDTH / 25 / 4) - 1
  cur_mult = max_circle / max_encountered * 2
  cur_mult = 2 if max_encountered < max_circle

  x = grid_x(x+1)
  y = grid_y(y)
  r = r * cur_mult

  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, true)
  ctx.closePath()
  if fill
    ctx.fill()
  else
    ctx.stroke()

step = () ->
  if frame < dates.length
    wday = dates[frame].wday
    hour = dates[frame].hour
    grid[wday][hour]++
    new_halo(hour, wday, grid[wday][hour])
    max_encountered = grid[wday][hour] if grid[wday][hour] > max_encountered
    frame++


  draw()

init_handle_input = () ->
  hi = $("#handle_input")
  user = hi.val()

  hi.focus () =>
    if (hi.val() == user)
      hi.val("")

  hi.focusout () =>
    if (hi.val() == "")
      hi.val(user)

$(document).ready init
#$(document).ready () =>
#  $.getScript "/js/jquery.tweekdump.js", init
