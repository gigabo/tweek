require 'rubygems'
require 'sinatra/base'
require 'mustache/sinatra'
require 'json'
require 'tweek'
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

  # Legacy
  get '/play/*' do redirect "/#{params[:splat].join('/')}" end
  get '/toy/*'  do redirect "/#{params[:splat].join('/')}" end

  # This is the main bit
  get '/*' do
    @toy = params[:splat][0].split(/\//)[0]
    @about = Tweek.about(@toy)
    @title = "#{@about ? @about[:title] : @toy}"
    @scripts = ['toy']
    @about[:code] ||= [{:item => "toy/#{@toy}"}] if @about
    mustache :play
  end
end
