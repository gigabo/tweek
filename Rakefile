
task :default => [ :coffee, :scss ]

task :coffee => [ ] do |t|
  sh "coffee -o public/js/ -c coffee/*.coffee"
end

task :scss => [ ] do |t|
  sh "sass views/punch.scss:public/css/punch.css"
end
