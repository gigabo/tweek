def about_this_toy
  {
    :title => 'Unit Circle',
    :date => '2010-10-09',
    :author => 'Bo Borgerson',
    :description => [
      {
        :p => <<-EO_P
          Canvas coordinates start at the upper-left corner, and extend down
          and to the right.  Pixels are the units.  Sometimes this bothers me.
        EO_P
      },
      {
        :p => <<-EO_P
          I like thinking of positive Y as up.  I don't always want to work
          with pixels as my units of measurement.  Also, I like having the
          origin at the center.  Fortunately the canvas provides a way for me
          to set all of this up the way I like it: The
          <code>setTransform</code> method.
        EO_P
      },
      {
        :p => <<-EO_P
          Drawing this unit circle is a good example of when it's handy to
          have logical dimensions decoupled from the actual pixel dimensions
          of the canvas.  Once the scale is set up I can really just draw my
          circle with a radius of one.
        EO_P
      },
      {
        :p => <<-EO_P
          This is my current canvas initialization method.  For the unit
          circle, I just call <code>this.init_canvas(5.0)</code>, and presto:
          everything's just how I like it.
          <aside>
          (Not quite sure what's up with the syntax coloring in this gist... I
          guess CoffeeScript support isn't quite there yet)
          </aside>
          <script src="http://gist.github.com/618818.js?file=gistfile1.coffee">
          </script>
        EO_P
      },
    ],
    :tools => [
      { :name => 'CoffeeScript', :url =>
        'http://jashkenas.github.com/coffee-script/' },
      { :name => 'RequireJS', :url => 'http://requirejs.org/'},
    ]
  }
end
