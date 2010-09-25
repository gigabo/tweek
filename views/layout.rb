class TweekApp
  module Views
    class Layout < Mustache
      BASE_STYLES = [ 'reset', 'tweek' ]
      BASE_SCRIPTS = [ 'underscore', 'tweek', 'ga' ]
      def title() @title || "Tweek: Bo's Playground" end
      def scripts
        (BASE_SCRIPTS + (@scripts||[])).collect { |s| { :name => s } }
      end
      def styles
        (BASE_STYLES + (@styles||[])).collect { |s| { :name => s } }
      end
    end
  end
end
