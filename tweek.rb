require 'rubygems'
require 'sinatra'
require 'tweetdates'
require 'punchcard'
require 'haml'

get '/' do
  "My Playground."
end

get '/punch' do
  "Coming soon."
end

get '/punch/:handle' do
  @chart_url = PunchCard.new(TweetDates.new(params[:handle])).url
  haml :punchcard
end
