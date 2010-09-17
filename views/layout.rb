class Tweek
  module Views
    class Layout < Mustache
      def title
        @title || "Tweek: Bo's Playground"
      end
    end
  end
end
