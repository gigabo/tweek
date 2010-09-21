
class Tweek
  class API
    class OK
      def initialize(args)
        @args = args
      end
      def response
        {
          :ok => 1,
          :args => @args
        }
      end
    end
  end
end

