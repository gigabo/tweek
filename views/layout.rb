class TweekApp
  module Views
    class Layout < Mustache
      def title
        @title || "Tweek: Bo's Playground"
      end
      def scripts
        @scripts || []
      end
    end
  end
end
