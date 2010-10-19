
task :default => [ :coffee, :scss, :docs ]

task :coffee => [ ] do |t|
  sh "coffee -o public/js/ -c coffee/*.coffee"
  sh "coffee -o public/js/toy/ -c coffee/toy/*.coffee"
  sh "coffee -o public/js/toy2d/ -c coffee/toy2d/*.coffee"
  sh "coffee -o public/js/rg/ -c coffee/rg/*.coffee"
end

task :scss => [ ] do |t|
  sh "sass views/punch.scss:public/css/punch.css"
end

task :docs => [] do |t|
  sh <<-EO_DOC
    for d in `find coffee -type d`;\
    do PATH=~/hg/pygments:~/git/docco/bin:$PATH docco $d/*.coffee;\
    mkdir -p "public/docs/$d/";\
    mv docs/* "public/docs/$d/";\
    done
  EO_DOC
end
