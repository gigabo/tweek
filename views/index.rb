class TweekApp
  module Views
    class Index < Layout
      def toys
        [
#          { :name => 'Unit Circle', :link => '/toys/unit_circle' },
          { :name => 'Pasta Box', :link => '/toys/pasta' },
          { :name => 'Rocket Game', :link => '/play/rocket' },
          { :name => 'Hanoi', :link => '/play/hanoi' },
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
