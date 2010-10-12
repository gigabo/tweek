def about_this_toy
  {
    :title => 'Box2D Rocket',
    :date => '2010-10-11',
    :author => 'Bo Borgerson',
    :description => [
      {
        :p => <<-EO_P
          This rocket uses <a href="http://www.box2d.org/">Box2D</a> for its
          physics.  You can steer with the (left-right) arrow keys, but the
          controls are a little mushy.  I'd tighten them up if I were putting
          this into a real game, but I like them how they are for this demo.
          I spent way too much time last night doing figure-eights around
          those boxes. :)
        EO_P
      },
      {
        :p => <<-EO_P
          I like it!  Unfortunately the performance isn't quite where I need
          it to be for the rocket game.  I have all kinds of ideas for taking
          advantage of it.  I want bad guys to shoot bullets at the rocket
          that knock it off course and send it spinning.  I want the rocket to
          blast through walls with bricks flying everywhere.  I want awesome
          explosions!
        EO_P
      },
      {
        :p => <<-EO_P
          But it looks like I'll have to wait for browser javascript
          performance to improve a little bit more still.   I'll definitely
          revisit this.  It won't be long now.
        EO_P
      },
    ],
    :tools => [
      { :name => 'box2d2-js',
        :url => 'http://github.com/jwagner/box2d2-js'},
      { :name => 'CoffeeScript', :url =>
        'http://jashkenas.github.com/coffee-script/' },
      { :name => 'Underscore.js', :url =>
        'http://documentcloud.github.com/underscore/'},
      { :name => 'RequireJS', :url => 'http://requirejs.org/'},
    ]
  }
end
