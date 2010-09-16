require 'rubygems'
require 'sinatra'
require 'tweetdates'
require 'punchcard'
require 'haml'
require 'less'

get '/css/punch.css' do
  content_type 'text/css', :charset => 'utf-8'
  less :punch
end

get '/punch/:handle' do
  @handle = params[:handle]
  @chart_url = PunchCard.new(TweetDates.new(@handle)).url
  haml :punchcard
end

get '/*' do
  haml :coming_soon
end
