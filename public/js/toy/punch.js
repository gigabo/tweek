// Generated by CoffeeScript 1.8.0
(function() {
  require.def(['toy2d/debug', 'toy2d/canvas', 'toy2d/canvas_scale', '/js/mustache.js'], (function(_this) {
    return function(Debug, Canvas, CanvasScale) {
      var HEIGHT, Halo, PunchCard, WIDTH;
      WIDTH = void 0;
      HEIGHT = void 0;
      Halo = (function() {
        function Halo(x, y, r, ttl) {
          this.x = x;
          this.y = y;
          this.r = r;
          this.ttl = ttl;
        }

        return Halo;

      })();
      return PunchCard = (function() {
        function PunchCard() {
          this.day_label = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          this.hour_label = ['12am', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '12pm', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
          this.canvas = (new Canvas(1600)).jquery();
          WIDTH = this.canvas.width();
          HEIGHT = this.canvas.height();
          new CanvasScale(this.canvas);
          this.init_user();
          this.init_handle_input();
          this.init_greeting();
          this.max_encountered = 0;
          this.halos = [];
          this.halo_life = 14;
          this.ctx = this.canvas[0].getContext("2d");
          this.is_ipad_3 = navigator.userAgent.match(/iPad[^\)]+OS 3/i) !== null;
          this.draw_grid();
          this.draw_key();
          this.api_go();
        }

        PunchCard.prototype.api_go = function() {
          return $.getJSON("/api/json/punch/" + this.user, (function(_this) {
            return function(data) {
              return _this.draw_punchcard(data);
            };
          })(this));
        };

        PunchCard.prototype.draw_punchcard = function(data) {
          this.dates = data.dates;
          this.frame = 0;
          this.grid = _.map(_.range(0, 7), (function(_this) {
            return function(i) {
              return _.map(_.range(0, 24), function(j) {
                return 0;
              });
            };
          })(this));
          return this.main_interval = setInterval(((function(_this) {
            return function() {
              return _this.step();
            };
          })(this)), 100);
        };

        PunchCard.prototype.clear = function() {
          return this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        };

        PunchCard.prototype.draw = function() {
          var i, j;
          this.clear();
          i = 0;
          this.draw_grid();
          this.draw_key();
          while (i < this.grid.length) {
            j = 0;
            while (j < this.grid[i].length) {
              this.circle(j, i, this.grid[i][j]);
              j++;
            }
            i++;
          }
          return this.draw_halos();
        };

        PunchCard.prototype.draw_halos = function() {
          var _ref, _results;
          _.each(this.halos, (function(_this) {
            return function(h) {
              var a;
              a = h.ttl / _this.halo_life;
              _this.ctx.strokeStyle = "rgba(0, 0, 0, " + a + ")";
              _this.circle(h.x, h.y, h.r + (_this.halo_life - h.ttl) * .6, false);
              return h.ttl--;
            };
          })(this));
          _results = [];
          while (((_ref = this.halos[0]) != null ? _ref.ttl : void 0) === 0) {
            _results.push(this.halos.shift());
          }
          return _results;
        };

        PunchCard.prototype.new_halo = function(x, y, r) {
          return this.halos.push(new Halo(x, y, r, this.halo_life));
        };

        PunchCard.prototype.draw_grid = function() {
          this.ctx.strokeStyle = "rgba(0, 0, 0, 1)";
          this.line(.25, 0, .25, 6.75);
          this.line(.25, 6.75, 24, 6.75);
          _.each(_.range(0, 7), (function(_this) {
            return function(i) {
              return _this.line(.15, i, .25, i);
            };
          })(this));
          return _.each(_.range(0, 24), (function(_this) {
            return function(i) {
              return _this.line(i + 1, 6.75, i + 1, 6.85);
            };
          })(this));
        };

        PunchCard.prototype.draw_key = function() {
          this.ctx.font = "14pt Verdana";
          this.ctx.textAlign = "right";
          this.ctx.textBaseline = "middle";
          _.each(_.range(0, 7), (function(_this) {
            return function(i) {
              return _this.text("" + _this.day_label[i], 0, i);
            };
          })(this));
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "top";
          return _.each(_.range(0, 24), (function(_this) {
            return function(i) {
              return _this.text("" + _this.hour_label[i], i + 1, 7);
            };
          })(this));
        };

        PunchCard.prototype.grid_x = function(x) {
          return WIDTH / 26 * (x + 1);
        };

        PunchCard.prototype.grid_y = function(y) {
          return HEIGHT / 9 * (y + 1);
        };

        PunchCard.prototype.line = function(x1, y1, x2, y2) {
          x1 = this.grid_x(x1);
          y1 = this.grid_y(y1);
          x2 = this.grid_x(x2);
          y2 = this.grid_y(y2);
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
          return this.ctx.closePath();
        };

        PunchCard.prototype.text = function(text, x, y) {
          x = this.grid_x(x);
          y = this.grid_y(y);
          if (!this.is_ipad_3) {
            return this.ctx.fillText(text, x, y);
          }
        };

        PunchCard.prototype.circle = function(x, y, r, fill) {
          var cur_mult, max_circle;
          if (fill === void 0) {
            fill = true;
          }
          max_circle = (WIDTH / 25 / 4) - 1;
          cur_mult = max_circle / this.max_encountered * 2;
          if (this.max_encountered < max_circle) {
            cur_mult = 2;
          }
          x = this.grid_x(x + 1);
          y = this.grid_y(y);
          r = r * cur_mult;
          this.ctx.beginPath();
          this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
          this.ctx.closePath();
          if (fill) {
            return this.ctx.fill();
          } else {
            return this.ctx.stroke();
          }
        };

        PunchCard.prototype.step = function() {
          var hour, wday;
          if (this.frame < this.dates.length) {
            wday = this.dates[this.frame].wday;
            hour = this.dates[this.frame].hour;
            this.grid[wday][hour]++;
            this.new_halo(hour, wday, this.grid[wday][hour]);
            if (this.grid[wday][hour] > this.max_encountered) {
              this.max_encountered = this.grid[wday][hour];
            }
            this.frame++;
          } else if (this.halos.length === 0) {
            clearInterval(this.main_interval);
          }
          return this.draw();
        };

        PunchCard.prototype.init_user = function() {
          return this.user = window.location.pathname.split('/')[2] || 'gigabo';
        };

        PunchCard.prototype.init_greeting = function() {
          $("#title").html(Mustache.to_html('<a id="twit_link" href="http://twitter.com/{{user}}">@{{user}}</a>\'s\n<span class="unit">Punch Card</span>', this));
          $("#twit_link").css('position', 'relative');
          return $("#twit_link").css('z-index', 1);
        };

        PunchCard.prototype.init_handle_input = function() {
          var hi;
          $("#controls").append(Mustache.to_html('<form id="punch_form" action="/punch">\n  <input type="text" name="handle" id="handle_input"\n         value="{{user}}" spellcheck=false>\n  <input type="submit" name="punch" id="punch_input"\n         class="input_button" value="Punch">\n</form>', this));
          hi = $("#handle_input");
          this.user = hi.val();
          hi.focus((function(_this) {
            return function() {
              if (hi.val() === _this.user) {
                return hi.val("");
              }
            };
          })(this));
          hi.focusout((function(_this) {
            return function() {
              if (hi.val() === "") {
                return hi.val(_this.user);
              }
            };
          })(this));
          return $("#punch_form").submit((function(_this) {
            return function(e) {
              var loc, new_loc, new_user;
              e.preventDefault();
              loc = window.location;
              new_user = hi.val();
              new_loc = "" + loc.protocol + "//" + loc.host + "/punch/" + new_user;
              return window.location.replace(new_loc);
            };
          })(this));
        };

        return PunchCard;

      })();
    };
  })(this));

}).call(this);
