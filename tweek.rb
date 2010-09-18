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
  set :public, File.dirname(__FILE__) + '/public'

  get '/css/:file.css' do
    content_type 'text/css', :charset => 'utf-8'
    less :"#{params[:file]}"
  end

  get '/punch' do
    if params[:handle]
      redirect "/punch/#{params[:handle]}"
    else
      pass
    end
  end

  get '/punch/:handle' do
    @handle = params[:handle]
    @chart_url = PunchCard.new(TweetDates.new(@handle)).url
    mustache :punchcard
  end

  get '/*' do
    pass if params[:splat].first.match(/^\/?js\//)
    mustache :coming_soon
  end
end
