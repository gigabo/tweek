require 'net/http'
require 'uri'
require 'date'
require 'rubygems'
require 'json'

class TweetDates
  include Enumerable

  attr_reader :error

  def initialize(handle)
    @handle = handle
    init_dates
  end
  def each(&block)
    @dates.each do |i|
      block.call(i)
    end
  end

  private
  def init_dates

    @dates = [];
    begin
      url = URI.parse('http://search.twitter.com/')
      res = JSON Net::HTTP.start(url.host, url.port) {|http|
        http.get("/search.json?q=from:#@handle")
      }.body

      @dates = res['results'].collect do |tweet|
        DateTime.parse(tweet['created_at'])
      end
    rescue JSON::ParserError
      @error = "Failed to fetch timeline for @#@handle.";
    end
  end
end
