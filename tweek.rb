require 'rubygems'
require 'sinatra'
require 'tweetdates'
require 'punchcard'
require 'haml'
require 'less'

get '/' do
  "My Playground."
end

get '/css/punch.css' do
  content_type 'text/css', :charset => 'utf-8'
  less :punch
end

get '/punch' do
  "Coming soon."
end

get '/punch/:handle' do
  @chart_url = PunchCard.new(TweetDates.new(params[:handle])).url
  haml :punchcard
end
