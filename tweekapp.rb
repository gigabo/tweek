require 'rubygems'
require 'sinatra/base'
require 'tweetdates'
require 'punchcard'
require 'mustache/sinatra'
require 'coffee-script'
require 'json'
require 'tweek/api'
require 'tweek/cache'


class TweekApp < Sinatra::Base
  register Mustache::Sinatra
  require 'views/layout'

  set :mustache, { :views => 'views/', :templates => 'templates/' }
  set :public, File.dirname(__FILE__) + '/public'

  get '/' do mustache :index end

  get '/api/json/*' do
    content_type 'text/json', :charset => 'utf-8'
    Tweek::API.response(params).to_json
  end

  get '/punch' do
    params[:handle] ||= 'gigabo'
    redirect "/punch/#{params[:handle]}"
  end

  get '/punch/:handle' do
    @handle = params[:handle]
    @title = "Punch Card"
    @scripts = ['punch']
    mustache :punchcard
  end

  get '/play/:script' do
    @title = "Play (#{params[:script]})"
    @scripts = [params[:script]]
#    @scripts.push 'jquery.tweekdump'
    mustache :play
  end

  get '/*' do mustache :coming_soon end
end
