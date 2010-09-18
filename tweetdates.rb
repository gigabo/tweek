require 'time'
require 'rubygems'
require 'grackle'

class TweetDates
  include Enumerable

  attr_reader :error

  def initialize(handle)
    @handle = handle
    @page_size = 100
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
    @dates = []
    page = 1
    while got = get_some(page) do
      @dates.push(*got)
      break unless got.size == @page_size
      page += 1
      break if page > 2 # Just get last 200 tweets for now
    end
  end
  def get_some(page)
    args = {
      :screen_name => @handle,
      :include_rts => 'true',
      :count       => @page_size,
      :page        => page
    }
    return begin
      @client.statuses.user_timeline?(args).collect do |tweet|
        Time.parse(tweet.created_at)
      end
    rescue
      [] # Just return an empty list of dates on error
    end
  end
end
