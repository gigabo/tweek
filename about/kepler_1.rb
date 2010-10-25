def about_this_toy
  {
    :title => 'Kepler\'s first law',
    :date => '2010-10-23',
    :author => 'Bo Borgerson',
    :description => [
      {
        :p => <<-EO_P
          I've been watching <a
          href="http://en.wikipedia.org/wiki/Carl_Sagan"> Carl Sagan</a>'s <a
          href="http://en.wikipedia.org/wiki/Cosmos:_A_Personal_Voyage">
          Cosmos </a> series recently.  What an amazing program!  I had seen
          bits and pieces of it, at school and on the web, but I'd never seen
          it in its entirety.  Carl Sagan was a great man.  He is definitely
          one of my heroes.
        EO_P
      },
      {
        :p => <<-EO_P
          This week I watched the episode 3:
          "The Harmony of the Worlds", in which I re-learned about <a
          href="http://en.wikipedia.org/wiki/Kepler's_laws_of_planetary_motion">
          Kepler's Laws</a>:
          <ol>
            <li>The orbit of every planet is an ellipse with the Sun at one of
            the two foci.</li>
            <li>A line joining a planet and the Sun sweeps out equal areas
            during equal intervals of time.</li>
            <li>The square of the orbital period of a planet is directly
            proportional to the cube of the semi-major axis of its orbit.</li>
          </ol>

          So, I decided that I want to make some toys to illustrate Kepler's
          Laws.  I realized, though, that I don't remember much about
          ellipses.  I remember that there are two foci, and that a ray from
          either focus reflected off of the inner surface of the ellipse will
          intersect the other focus.  That doesn't really help me draw one,
          though.  Wikipedia to the rescue!  Other useful things to know about
          ellipses:
          <ol>
            <li>The sum of distances from the two foci to any point on the
            ellipse is the same as to any other point.</li>
            <li>Given an ellipse with axes aligned on the cartesian plane with
            half-lengths a and b, any point on the ellipse can be expressed in
            terms of an angle theta: (a * cos(theta), b * sin(theta))</li>
          </ol>
          Bingo! That will let me draw a simple ellipse at the origin, bounded
          by a rectangle with corners at (-a, -b) and (a, b):
          <script
          src="http://gist.github.com/642567.js?file=draw_ellipse.coffee">
          </script>
        EO_P
      },
      {
        :p => <<-EO_P
          But what about the focus representing the sun?  How do I draw that?
          Well, I know that the sums of distances from the foci to any two
          points on the ellipse should be the same... I can approximate focus
          position with a simple binary search!
          <script
          src="http://gist.github.com/642567.js?file=approximate_focus.coffee">
          </script>
          OK, great, so now I have an approximation of the position of a
          focus.  But I know there must be some very simple way to derive the
          exact position from the axis lengths... I spent quite some time
          trying various formulae on my own, before I finally went back to
          wikipedia for clues.
        EO_P
      },
      {
        :p => <<-EO_P
          My first clue was the definition of ellipse
          <strong>eccentricity</strong>.  Actually, I found *two* definitions,
          which helped twice as much.  One was a formula:
          <blockquote>
            e = sqrt(1-(b/a)^2)
          </blockquote>
          The other was a ratio:
          <blockquote>
          The eccentricity of an ellipse is the ratio of the distance between
          the two foci, to the length of the major axis.
          </blockquote>
          Based on these two definitions I came up with:
          <blockquote>
            fx = a * Math.sqrt(1-((b*b)/(a*a)))
          </blockquote>
          Success!  But a little bit more reading on Wikipedia turned up a
          simpler solution still:
          <blockquote>
            The distance from the center to either focus is ae, or simply
            sqrt(a^2-b^2)
          </blockquote>
          *facepalm* That's so simple!  So... here's my final calculation of
          focus position:
          <blockquote>
           fx = Math.sqrt((a*a)-(b*b)) 
          </blockquote>
        EO_P
      },
      {
        :p => <<-EO_P
        EO_P
      },
    ],
    :tools => [
      { :name => 'CoffeeScript', :url =>
        'http://jashkenas.github.com/coffee-script/' },
      { :name => 'RequireJS', :url => 'http://requirejs.org/'},
      { :name => 'mustache.js', :url => 'http://github.com/janl/mustache.js'},
    ],
  }
end
