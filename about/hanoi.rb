def about_this_toy
  {
    :title => 'Hanoi',
    :date => '2010-09-19',
    :author => 'Bo Borgerson',
    :description => [
      {
        :p => <<-EO_P
          This was a fun little way to practice with the canvas.  It uses an
          iterative solution, so it's not going to kill your browser with deep
          recursion if you give it a large number of disks.
        EO_P
      },
      {
        :p => <<-EO_P
          Go ahead, try 100. ;)
        EO_P
      },
    ],
    :tools => [
      { :name => 'CoffeeScript', :url =>
        'http://jashkenas.github.com/coffee-script/' },
      { :name => 'Underscore.js', :url =>
        'http://documentcloud.github.com/underscore/'},
    ]
  }
end
