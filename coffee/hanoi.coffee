
TOWER_HEIGHT  = 200
WIDTH         = undefined
HEIGHT        = undefined
ctx           = undefined
columns       = undefined
move_number   = 0

class Column
  constructor: (@index) ->
    @disks = []

class Disk
  constructor: (@width) ->

init = () ->
  ctx         = $('#play_canvas')[0].getContext("2d")
  WIDTH       = $("#play_canvas").width()
  HEIGHT      = $("#play_canvas").height()

  columns = _.map [0,1,2], (i)=>
    new Column(i)

  columns[0].disks = _([1..TOWER_HEIGHT]).chain()
    .reverse()
    .map (i)=>
      new Disk(i)
    .value()

  draw()
  setInterval(step, 1)

rect = (x,y,w,h) ->
  ctx.beginPath()
  ctx.rect(x,y,w,h)
  ctx.closePath()
  ctx.fill()

color = (r,g,b,a) ->
  ctx.fillStyle = "rgba(#{r}, #{g}, #{b}, #{a})"

clear = () ->
  ctx.clearRect(0, 0, WIDTH, HEIGHT)

draw = () ->
  clear()
  i = 0
  for col in columns
    j = 0
    for disk in columns[i].disks
      shade = (300 - disk.width) / 2
      color(shade, shade, shade, 255)
      rect(WIDTH/4*(i+1)-disk.width/2,HEIGHT - j,disk.width,1)
      j++
    i++

get_move = (move) ->
  disk = 1

  while (!(move & 1))
    move >>= 1
    disk += 1

  move >>= 1; # Now the Nth move *for this disk*

  direction = [
    [ 0, 1, 2 ],
    [ 0, 2, 1 ],
  ][(disk+TOWER_HEIGHT)%2]

  [ direction[ move % 3], direction[ (move + 1) % 3 ] ]

step = () ->
  if columns[1].disks.length != TOWER_HEIGHT
    [from, to] = get_move(++move_number)
    columns[to].disks.push(columns[from].disks.pop())

  draw()

$(document).ready () => init()
