require 'tweek/api/ok'
require 'tweek/api/punch'

class Tweek
  class API
    MODULES = {
      :ok     => {
        :class => Tweek::API::OK
      },
      :punch  => {
        :class => Tweek::API::Punch
      }
    }
    class << self
      def response(params)
        args = params[:splat][0].split('/')
        if m = MODULES[:"#{args[0]}"][:class]
          m.new(params).response
        else
          {:error => "Unknown service"}
        end
      end
    end
  end
end
