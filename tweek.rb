require 'rubygems'
require 'sinatra'
require 'tweetdates'
require 'haml'

get '/' do
  "My Playground."
end

get '/punchcard/:handle' do
  @dates = TweetDates.new(params[:handle]).collect do |date|
    "#{date.wday} #{date.hour}"
  end
  haml :punchcard
end
