
MAX_HEIGHT    = 200
TOWER_HEIGHT  = 1
WIDTH         = undefined
HEIGHT        = undefined
ctx           = undefined
towers        = undefined
step_timer    = undefined
move_number   = 1

class Tower
  constructor: (@index) ->
    @disks = []

class Disk
  constructor: (@width) ->

init = () ->
  ctx         = $('#play_canvas')[0].getContext("2d")
  WIDTH       = $("#play_canvas").width()
  HEIGHT      = $("#play_canvas").height()

  init_controls()
  init_towers()

init_controls = () ->
  $("#play").prepend("<input id='tower_refresh' type='button' value='Go'>")
  $("#play").prepend("<input id='tower_height'>")
  $("#tower_refresh").click re_init_towers
  $("#tower_height").keydown (evt) =>
    if evt.keyCode == 13 then re_init_towers()

re_init_towers = () ->
  init_towers($("#tower_height").val())

init_towers = (new_height) ->
  clearInterval(step_timer) if step_timer

  if new_height
    new_height = parseInt(new_height)
    if !_.isNaN(new_height)
      if new_height < 1
        TOWER_HEIGHT = 1
      else if new_height > MAX_HEIGHT
        TOWER_HEIGHT = MAX_HEIGHT
      else
        TOWER_HEIGHT = new_height

  $("#tower_height").val(TOWER_HEIGHT)

  move_number = 1

  towers = _.map [0,1,2], (i)=>
    new Tower(i)

  towers[0].disks = _([1..TOWER_HEIGHT]).chain()
    .reverse()
    .map (i)=>
      new Disk(i)
    .value()

  draw()
  step_timer = setInterval(step, 1000/Math.pow(TOWER_HEIGHT, 1.3))

rect = (x,y,w,h) ->
  ctx.beginPath()
  ctx.rect(x,y,w,h)
  ctx.closePath()
  ctx.fill()

clear = () ->
  ctx.clearRect(0, 0, WIDTH, HEIGHT)

draw = () ->
  clear()
  i = 0
  for col in towers
    j = 0
    for disk in towers[i].disks
      mult = MAX_HEIGHT/TOWER_HEIGHT
      rect(WIDTH/4*(i+1)-disk.width*mult/2,HEIGHT-j*mult-mult,
        disk.width*mult,mult)
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
  if towers[1].disks.length != TOWER_HEIGHT
    [from, to] = get_move(move_number++)
    towers[to].disks.push(towers[from].disks.pop())
  else
    init_towers(TOWER_HEIGHT+1)

  draw()

$(document).ready () => init()
