
class Toys; end

class TweekApp
  module Views
    class Play < Layout
      def about
        @about
      end
      def tweek_toys
        if @toy then [ :name => @toy ] end
      end
    end
  end
end
