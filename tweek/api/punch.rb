require 'tweetdates'
require 'tweek/cache'

class Tweek
  class API
    class Punch
      def initialize(args)
        @args = args
        @user = args[:splat][0].split('/')[1]
      end
      def response

        dates = Tweek::Cache.do(@user) do
          TweetDates.new(@user)
        end

        @dates = dates.collect do |date|
          {
            :wday => date.wday,
            :hour => date.hour
          }
        end
        {
          :ok => 1,
          :user => @user,
          :dates => @dates
        }
      end
    end
  end
end

