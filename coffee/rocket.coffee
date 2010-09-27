canvas          = undefined
ctx             = undefined
WIDTH           = undefined
HEIGHT          = undefined
main_interval   = undefined
protagonist     = undefined
trail           = undefined
controls        = undefined
performance     = undefined
running         = false

debug = (v) ->
  $("#debug").empty()
  $("#debug").append(v)

global_i = 0
class Performance
  constructor: () ->
    @res = 1
    @check_frames = 2
    this.init()

  init: () ->
    @frame_count  = 0
    @step_time    = 50
    @base_time    = (new Date).getTime()

  check: () ->
    if (++@frame_count == @check_frames)
      now = (new Date).getTime()
      elapsed = now - @base_time
      shrink_threshold = (@check_frames * @step_time) * 1.75
      grow_threshold   = (@check_frames * @step_time) * 1.1
      if (elapsed > shrink_threshold)
        @res *= .99
        update_canvas_width()
        if @check_frames > 1
          @check_frames --
      else if elapsed < grow_threshold and @res < 1
        @res *= 1.01
        if @res > 1 then res = 1
      else
        if @check_frames < 50
          @check_frames ++

      debug ("check_frames #{global_i++}: #{@check_frames}")

      this.init()

class Controls
  constructor: () ->
    @thrust_on  = true
    @rot_l      = false
    @rot_r      = false
    this.init()

  init: () ->
    $(document).keydown (e) =>
      switch e.keyCode
        when 37 then @rot_l = true
        when 39 then @rot_r = true
        when 32 then @thrust_on = false
#        else debug("keyCode: #{e.keyCode}")

    $(document).keyup (e) =>
      switch e.keyCode
        when 37 then @rot_l = false
        when 39 then @rot_r = false
        when 32 then @thrust_on = true
        when 80, 81 # P, Q
          if running then stop() else start()

class Rocket
  constructor: (@x,@y) ->
    @thrust = .2
    @a = Math.PI/2
    @dx = 0
    @dy = 0
    @length = 20

  apply_gravity: () ->
    @dy += .2

  apply_rotation: () ->
    if controls.rot_l
      @a -= Math.PI/24
    if controls.rot_r
      @a += Math.PI/24

  apply_thrust: () ->
    if controls.thrust_on
      @dx -= .5*Math.cos(@a)
      @dy -= .5*Math.sin(@a)

  front: () ->
    {
      x: @x - @length/2*Math.cos(@a),
      y: @y - @length/2*Math.sin(@a)
    }

  back: () ->
    {
      x: @x + @length/2*Math.cos(@a),
      y: @y + @length/2*Math.sin(@a)
    }

  draw: () ->
    front = this.front()
    back  = this.back()
    ctx.strokeStyle = "rgba(255, 255, 255, 1)"
    ctx.lineWidth = @length/5
    line front.x, front.y, back.x, back.y

  move: () ->
    @x += @dx
    @y += @dy

  check_bounds: () ->
    if !(0 < @x < WIDTH) or !(0 < @y < HEIGHT)
      this.splode()

  splode: () ->
    start_level()

  step: () ->
    this.apply_gravity()
    this.apply_rotation()
    this.apply_thrust()
    this.move()
    this.check_bounds()

class Trail
  constructor: () ->
    @pieces = []
    @length = 20

  step: () ->
    if controls.thrust_on
      ox = @owner.x
      oy = @owner.y
      oa = @owner.a
      ol = @owner.length

      x1 = ox + ol/2*Math.cos(oa)
      y1 = oy + ol/2*Math.sin(oa)
      x2 = ox + ol*Math.cos(oa)
      y2 = oy + ol*Math.sin(oa)

      @pieces.unshift({ x: x1, y: y1, l: 10, a: oa, ttl: @length })

    if (@pieces.length > 0 and @pieces[@pieces.length-1].ttl == 0)
      @pieces.pop()

    i = @length
    for piece in @pieces
      m = i/((@length/10)+1)
      piece.x += m*Math.cos(piece.a)
      piece.y += m*Math.sin(piece.a)
      piece.a += (Math.random()-.5)*.5
      piece.ttl -= 1
      i--

  piece_line: (p) ->
    [
      p.x,
      p.y,
      p.x + p.l*Math.cos(p.a),
      p.y + p.l*Math.sin(p.a)
    ]


  draw: () ->
    ctx.lineWidth = @owner.length/10

    for piece in @pieces
      a = piece.ttl/@length
      c = Math.floor(255 * (1-a))
      ctx.strokeStyle = "rgba(255, #{c}, #{c}, #{a})"
      [x1, y1, x2, y2] = this.piece_line piece
      line x1, y1, x2, y2

init = () ->
  canvas        = $("#play_canvas")
  ctx           = canvas[0].getContext("2d")

  canvas.css("background-color", "black")
  canvas.css("margin-top", "1em")

  $("#canvas_container").append("<br>Arrows steer.")

  WIDTH = canvas.width()
  HEIGHT = canvas.height()

  controls = new Controls
  performance = new Performance

  update_canvas_width()

  $(window).resize update_canvas_width

  start_level()

  start()

start_level = () ->
  protagonist = new Rocket(WIDTH/2, HEIGHT/2)
  trail ||= new Trail
  trail.owner = protagonist

start = () ->
  main_interval = setInterval step, performance.step_time
  running = true

stop = () ->
  clearInterval main_interval
  running = false



update_canvas_width = () ->
  width = canvas.parent().innerWidth() * performance.res
  canvas.width(width)
  canvas.height(width/2)

clear = () ->
  ctx.clearRect(0, 0, WIDTH, HEIGHT)

draw = () ->
  clear()
  protagonist.draw()
  trail.draw()

line = (x1, y1, x2, y2) ->
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()

circle = (x,y,r) ->
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI*2, true)
  ctx.closePath()
  ctx.fill()

step = () ->
  protagonist.step()
  trail.step()
  draw()
  performance.check()

$(document).ready init
