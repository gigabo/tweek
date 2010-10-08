class Toys
  def self.about_unit_circle
    {
      :title => 'Unit Circle',
      :date => '2010-10-08',
      :author => 'Bo Borgerson',
      :description => [
        {
          :p => <<-EO_P
            Canvas coordinates start at the upper-left corner of the canvas,
            and extend down and to the right.  I like thinking of positive Y
            as up, so I set up an initial transformation matrix that reflects
            over the Y axis and puts the origin in the middle of the canvas.
            So much nicer!
          EO_P
        }
      ],
      :tools => [
        { :name => 'CoffeeScript', :url =>
          'http://jashkenas.github.com/coffee-script/' },
        { :name => 'Underscore.js', :url =>
          'http://documentcloud.github.com/underscore/'},
        { :name => 'RequireJS', :url => 'http://requirejs.org/'},
      ]
    }
  end
end
