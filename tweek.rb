require 'rubygems'
require 'sinatra'

get '/' do
  "My Playground."
end

get '/punchcard/:handle' do
  "@#{params[:handle]}'s Twitter Punch Card"
end
