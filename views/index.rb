class TweekApp
  module Views
    class Index < Layout
      attr_reader :scripts
      def toys
        [
          { :name => 'Twitter Punch Card', :link => '/punch' },
          { :name => 'Hanoi 200', :link => '/play/hanoi' },
        ]
      end
      def tools
        [
          { :name => 'API Client', :link => '/play/api_client' },
        ]
      end
    end
  end
end
