class TweekApp
  module Views
    class Index < Layout
      def toys
        [
          { :name => 'Box2D Rocket', :link => '/rocket_box2d' },
          { :name => 'Unit Circle', :link => '/unit_circle' },
          { :name => 'Pasta Box', :link => '/pasta' },
          { :name => 'Rocket Game', :link => '/rocket' },
          { :name => 'Hanoi', :link => '/hanoi' },
          { :name => 'Twitter Punch Card', :link => '/punch' },
        ]
      end
      def tools
        [
          { :name => 'API Client', :link => '/play/api_client' },
        ]
      end
      def links
        [
          { :name => 'twitter', :link => 'http://twitter.com/gigabo' },
          { :name => 'github',  :link => 'http://github.com/gigabo' },
          { :name => 'flickr',
            :link => 'http://www.flickr.com/photos/73306111@N00/' },
          { :name => 'linkedin',
            :link => 'http://www.linkedin.com/pub/bo-borgerson/0/253/43' },
        ]
      end
    end
  end
end
