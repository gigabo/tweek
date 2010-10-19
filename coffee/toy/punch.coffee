require.def [
  'toy2d/debug',
  'toy2d/canvas',
  'toy2d/canvas_scale',
  '/js/mustache.js'
], (Debug, Canvas, CanvasScale) =>
  WIDTH           = undefined
  HEIGHT          = undefined

  class Halo
    constructor: (@x, @y, @r, @ttl) ->

  class PunchCard
    constructor: () ->
      @day_label = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
      @hour_label = [
        '12am', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        '12pm', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
      ]

      @canvas = (new Canvas(1600)).jquery()
      WIDTH = @canvas.width()
      HEIGHT = @canvas.height()

      new CanvasScale(@canvas)

      this.init_user()

      this.init_handle_input()
      this.init_greeting()

      @max_encountered = 0
      @halos           = []
      @halo_life       = 14
      @ctx             = @canvas[0].getContext("2d")

      @is_ipad_3 = navigator.userAgent.match(/iPad[^\)]+OS 3/i) != null

      this.draw_grid()
      this.draw_key()

      this.api_go()

    api_go: () ->
      $.getJSON "/api/json/punch/#{@user}", (data) => this.draw_punchcard(data)

    draw_punchcard: (data) ->
      @dates = data.dates
      @frame = 0

      @grid = _.map _.range(0,7), (i) =>
        _.map _.range(0,24), (j) =>
          0

      @main_interval = setInterval((() => this.step()), 100)

    clear: () ->
      @ctx.clearRect(0, 0, WIDTH, HEIGHT)

    draw: () ->
      this.clear()

      i = 0

      this.draw_grid()
      this.draw_key()
      while i < @grid.length
        j = 0
        while j < @grid[i].length
          this.circle(j, i, @grid[i][j])
          j++
        i++
      this.draw_halos()

    draw_halos: () ->
      _.each @halos, (h) =>
        a = h.ttl / @halo_life
        @ctx.strokeStyle = "rgba(0, 0, 0, #{a})"
        this.circle(h.x, h.y, h.r + (@halo_life - h.ttl)*.6, false)
        h.ttl--

      while @halos[0]?.ttl == 0
        @halos.shift()

    new_halo: (x, y, r) ->
      @halos.push(new Halo(x, y, r, @halo_life))

    draw_grid: () ->
      @ctx.strokeStyle = "rgba(0, 0, 0, 1)"
      this.line(.25,0,.25,6.75)
      this.line(.25,6.75,24,6.75)
      _.each _.range(0, 7), (i) =>
        this.line(.15,i,.25,i)
      _.each _.range(0, 24), (i) =>
        this.line(i+1,6.75,i+1,6.85)

    draw_key: () ->
      @ctx.font         = "14pt Verdana"
      @ctx.textAlign    = "right"
      @ctx.textBaseline = "middle"
      _.each _.range(0, 7), (i) =>
        this.text("#{@day_label[i]}", 0, i)
      @ctx.textAlign    = "center"
      @ctx.textBaseline = "top"
      _.each _.range(0, 24), (i) =>
        this.text("#{@hour_label[i]}", i+1, 7)

    grid_x: (x) -> WIDTH/26*(x+1)

    grid_y: (y) -> HEIGHT/9*(y+1)

    line: (x1, y1, x2, y2) ->
      x1 = this.grid_x(x1)
      y1 = this.grid_y(y1)
      x2 = this.grid_x(x2)
      y2 = this.grid_y(y2)
      @ctx.beginPath()
      @ctx.moveTo(x1, y1)
      @ctx.lineTo(x2, y2)
      @ctx.stroke()
      @ctx.closePath()

    text: (text, x, y) ->
      x = this.grid_x(x)
      y = this.grid_y(y)

      # fillText seems to be broken on the iPad OS 3
      @ctx.fillText(text, x, y) unless @is_ipad_3

    circle: (x,y,r,fill) ->
      fill = true if fill == undefined

      max_circle = (WIDTH / 25 / 4) - 1
      cur_mult = max_circle / @max_encountered * 2
      cur_mult = 2 if @max_encountered < max_circle

      x = this.grid_x(x+1)
      y = this.grid_y(y)
      r = r * cur_mult

      @ctx.beginPath()
      @ctx.arc(x, y, r, 0, Math.PI*2, true)
      @ctx.closePath()
      if fill
        @ctx.fill()
      else
        @ctx.stroke()

    step: () ->
      if @frame < @dates.length
        wday = @dates[@frame].wday
        hour = @dates[@frame].hour
        @grid[wday][hour]++
        this.new_halo(hour, wday, @grid[wday][hour])
        if @grid[wday][hour] > @max_encountered
          @max_encountered = @grid[wday][hour]
        @frame++
      else if @halos.length == 0
        clearInterval(@main_interval)


      this.draw()

    init_user: () ->
      @user = window.location.pathname.split('/')[2] || 'gigabo'

    init_greeting: () ->
      $("#title").html Mustache.to_html '''
        <a id="twit_link" href="http://twitter.com/{{user}}">@{{user}}</a>'s
        <span class="unit">Punch Card</span>
      ''', this
      $("#twit_link").css('position', 'relative')
      $("#twit_link").css('z-index', 1)

    init_handle_input: () ->
      $("#controls").append Mustache.to_html '''
        <form id="punch_form" action="/punch">
          <input type="text" name="handle" id="handle_input"
                 value="{{user}}" spellcheck=false>
          <input type="submit" name="punch" id="punch_input"
                 class="input_button" value="Punch">
        </form>
        ''', this

      hi = $("#handle_input")

      @user = hi.val()

      hi.focus () =>
        if (hi.val() == @user)
          hi.val("")

      hi.focusout () =>
        if (hi.val() == "")
          hi.val(@user)

      $("#punch_form").submit (e) =>
        e.preventDefault()
        loc = window.location
        new_user = hi.val()
        new_loc = "#{loc.protocol}//#{loc.host}/punch/#{new_user}"
        window.location.replace(new_loc)

