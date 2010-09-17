require 'rubygems'
require 'sinatra/base'
require 'tweetdates'
require 'punchcard'
require 'mustache/sinatra'
require 'less'

class Tweek < Sinatra::Base
  register Mustache::Sinatra
  require 'views/layout'

  set :mustache, {
    :views     => 'views/',
    :templates => 'templates/'
  }

  get '/css/punch.css' do
    content_type 'text/css', :charset => 'utf-8'
    less :punch
  end

  get '/punch/:handle' do
    @handle = params[:handle]
    @chart_url = PunchCard.new(TweetDates.new(@handle)).url
    mustache :punchcard
  end

  get '/*' do
    mustache :coming_soon
  end
end
