
WIDTH         = undefined
HEIGHT        = undefined
MAX_HEIGHT    = undefined
canvas        = undefined
ctx           = undefined
towers        = undefined
step_timer    = undefined
initial_ratio = undefined
move_number   = 1
tower_height  = 1

class Tower
  constructor: (@index) ->
    @disks = []

class Disk
  constructor: (@width) ->

init = () ->
  init_canvas()
  init_controls()
  init_towers()

init_canvas = () ->
  canvas      = $('#play_canvas')
  ctx         = canvas[0].getContext("2d")


  WIDTH = canvas.width()
  HEIGHT = canvas.height()
  MAX_HEIGHT = HEIGHT / 2
  update_canvas_width()

  setInterval(update_canvas_width, 100)

update_canvas_width = () ->
  width = canvas.parent().innerWidth()
  canvas.width(width)
  canvas.height(width/2)

init_controls = () ->
  $("#play").append("<div id='controls' class='control_container'></div>")
  $("#controls").append("<input type='text' id='tower_height'>")
  $("#controls").append("<input id='tower_refresh' type='button' value='Go'>")
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
        tower_height = 1
      else if new_height > MAX_HEIGHT
        tower_height = MAX_HEIGHT
      else
        tower_height = new_height

  $("#tower_height").val(tower_height)

  move_number = 1

  towers = _.map [0,1,2], (i)=>
    new Tower(i)

  towers[0].disks = _([1..tower_height]).chain()
    .reverse()
    .map (i)=>
      new Disk(i)
    .value()

  draw()
  step_timer = setInterval(step, 1000/Math.pow(tower_height, 1.3))

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
      mult = MAX_HEIGHT/tower_height
      rect(WIDTH/4*(i+1)-disk.width*mult/2,HEIGHT-MAX_HEIGHT/2-j*mult-mult,
        disk.width * mult,mult)
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
  ][(disk+tower_height)%2]

  [ direction[ move % 3], direction[ (move + 1) % 3 ] ]

step = () ->
  if towers[1].disks.length != tower_height
    [from, to] = get_move(move_number++)
    towers[to].disks.push(towers[from].disks.pop())
  else
    init_towers(tower_height+1)

  draw()

$(document).ready () => init()
