require 'net/http'
require 'uri'
require 'date'
require 'rubygems'
require 'json'
require 'grackle'

class TweetDates
  include Enumerable

  attr_reader :error

  def initialize(handle)
    @handle = handle
    @client = Grackle::Client.new(:auth=>{
      :type=>:oauth,
      :consumer_key=>'lXFnhg5AgAOjcAY3XZcUPA',
      :consumer_secret=>'P94I995KCfJvOtaz2EIQ8fTLbNtUuaOskydQM8tRs',
      :token=>'18556496-U07l0L2u62GRfIz0qY8ocFukQ4xs0lNgZbktTP6PD',
      :token_secret=>'t5snyz4i2rS1GcOvpWGlhpI5wtiAzXSFLavEUfVP8'
    })
    init_dates
  end
  def each(&block)
    @dates.each do |i|
      block.call(i)
    end
  end

  private
  def init_dates
    @dates = @client.statuses.user_timeline?(
      :screen_name => @handle
    ).collect do |tweet|
      DateTime.parse(tweet.created_at)
    end
  end
end
