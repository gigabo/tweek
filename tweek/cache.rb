require 'rubygems'
require 'memcached'

class Tweek
  class Cache
    class << self
      def do(key, &block)
        @cache ||= Memcached.new("localhost:11211")
        begin
          result = @cache.get key
        rescue Memcached::NotFound
          result = yield
          @cache.set key, result, 600 # 1 hour
        rescue
          result = yield # Don't try to store
        end
        result
      end
    end
  end
end
