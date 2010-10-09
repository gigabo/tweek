def about_this_toy
  {
    :title => 'Pasta Box',
    :date => '2010-10-06',
    :author => 'Bo Borgerson',
    :description => [
      {
        :p => <<-EO_P
          This is a little experiment with <a
          href="http://www.box2d.org/">box2d</a> (actually <a
          href="http://29a.ch/">Jonas Wagner</a>'s <a
          href="http://github.com/jwagner/box2d2-js">box2d2-js</a>).  I
          mostly just wanted to see how easy it would be to set up (quite
          easy).  I was also curious to see if it would be a viable
          replacement for the physics engine in my little rocket game.
          I've been using my own homebrew physics for games since I was
          12, but I thought it would be nice to branch out and try
          something a little more sophisticated.
        EO_P
      },
      {
        :p => <<-EO_P
          So, I made some long, skinny boxes (vaguely rocket-shaped) and let
          them loose.  This looks pretty promising, although it runs pretty
          slowly in Firefox on my old Windows machine.  Maybe this weekend
          I'll make a toy rocket and see how it goes.  Meanwhile, I'm
          mesmerized by the falling pasta. :)
        EO_P
      }
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
