require 'tweek/api/ok'

class Tweek
  class API
    MODULES = {
      :ok => Tweek::API::OK
    }
    class << self
      def response(params)
        args = params[:splat][0].split('/')
        if m = MODULES[:"#{args[0]}"]
          m.new(params).response
        else
          {:error => "Unknown service"}
        end
      end
    end
  end
end
