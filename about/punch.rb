def about_this_toy
  {
    :title => 'Twitter Punch Card',
    :date => '2010-09-15',
    :author => 'Bo Borgerson',
    :description => [
      {
        :p => <<-EO_P
          I like the <a
          href="http://github.com/jashkenas/coffee-script/graphs/punch_card">
          punch cards</a> on <a href="http://github.com/">github</a>, and I
          thought it would be fun to try something similar for twitter as an
          intro to the API.
        EO_P
      },
      {
        :p => <<-EO_P
          I also wanted to make it a little bit more dynamic to show the
          progression through time, so I did an animation with the canvas
          instead of using the <a href="http://code.google.com/apis/chart/">
          Google Charts</a> API for a static image.
        EO_P
      },
      {
        :p => <<-EO_P
          Unfortunately, I don't tweet enough to really have a good punch
          card.  Try yours, and see when you tweet!
        EO_P
      },
    ],
    :tools => [
      { :name => 'Twitter API', :url => 'http://dev.twitter.com/'},
      { :name => 'mustache.js', :url => 'http://github.com/janl/mustache.js'},
      { :name => 'CoffeeScript', :url =>
        'http://jashkenas.github.com/coffee-script/' },
      { :name => 'Underscore.js', :url =>
        'http://documentcloud.github.com/underscore/'},
    ],
    :code => [
      { :item => 'toy/punch' },
    ],
  }
end
