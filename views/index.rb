class TweekApp
  module Views
    class Index < Layout
      def toys
        [
          { :name => 'Unit Circle', :link => '/toys/unit_circle' },
          { :name => 'Pasta Box', :link => '/toys/pasta' },
          { :name => 'Rocket Game (early prototype)',
            :link => '/play/rocket' },
          { :name => 'Twitter Punch Card', :link => '/punch' },
          { :name => 'Hanoi 400', :link => '/play/hanoi' },
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
        ]
      end
    end
  end
end
