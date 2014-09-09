require 'time'
require 'rubygems'
require 'grackle'

# Yuck.  Don't like having to reach in to do this.
Grackle::Client::TWITTER_API_HOSTS[:v1] = "punch.gigabo.apigee.com/1"

class TweetDates
  include Enumerable

  attr_reader :error

  PAGE_SIZE = 200

  def initialize(handle)
    @handle = handle
    # I've revoked this key/secret.
    # Will need to regenerate and load from outside repo if I ever want to
    # get this thing working again.
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
      break unless got.size == PAGE_SIZE
      page += 1
      break if page > 2 # Just get last 2 pages for now
    end
  end
  def get_some(page)
    args = {
      :screen_name => @handle,
      :include_rts => 'true',
      :count       => PAGE_SIZE,
      :page        => page
    }
    return begin
      @client.statuses.user_timeline?(args).collect do |tweet|
        Time.parse(tweet.created_at)
      end
    rescue
      [] # Just return an empty list of dates on error
    end.sort
  end
end
