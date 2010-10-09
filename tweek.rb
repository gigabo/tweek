require 'tweek/api'

class Tweek
  ABOUT_CACHE = {}
  def self.about(toy)
    unless ABOUT_CACHE.include? toy
      ABOUT_CACHE[toy] = begin
        require "about/#{toy}.rb"
        about_this_toy
      rescue Exception => e
        false
      end
    end
    ABOUT_CACHE[toy]
  end
end
