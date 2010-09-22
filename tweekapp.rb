require 'rubygems'
require 'sinatra/base'
require 'tweetdates'
require 'punchcard'
require 'mustache/sinatra'
require 'less'
require 'coffee-script'
require 'json'
require 'tweek/api'

class TweekApp < Sinatra::Base
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

  get '/api/json/*' do
    content_type 'text/json', :charset => 'utf-8'
    Tweek::API.response(params).to_json
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
    @title = "Punch Card"
    @chart_url = PunchCard.new(TweetDates.new(@handle)).url
    @scripts = [{:name => '/js/punch.js'}]
    mustache :punchcard
  end

  get '/coffee/:script' do
    content_type :js
    base_name = File.dirname(__FILE__) + '/coffee/' + params[:script]
    CoffeeScript.compile File.open(base_name, 'r'){|f| f.read }
  end

  get '/play/:script' do
    @title = "Play (#{params[:script]})"
    #@scripts = [{:name => "/coffee/#{params[:script]}.coffee"}]
    @scripts = [{:name => "/js/#{params[:script]}.js"}]
    @scripts.push({:name => "/js/jquery.dump.js"})
    mustache :play
  end

  get '/*' do
    pass if params[:splat].first.match(/^\/?js\//)
    mustache :coming_soon
  end
end