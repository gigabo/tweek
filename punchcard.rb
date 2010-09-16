

class PunchCard

  def initialize(dates)
    @dates = dates
  end
  def url
    return @url if @url

    base = 'http://chart.apis.google.com/chart?'

    x_coords = []
    y_coords = []
    (0..7).each do |y|
      (0..23).each do |x|
        x_coords.push(x)
        y_coords.push(y)
      end
    end

    values = grind_values

    params = {
      :chs => '800x300',
      :chds => '-1,24,-1,7,0,22',
      :chf => 'bg,s,efefef',
      :chxt => 'x,y',
      :chm => 'o,333333,1,1.0,25.0',
      :chxl => [
        '0:||12am|1|2|3|4|5|6|7|8|9|10|11|12pm|1|2|3|4|5|6|7|8|9|10|11||',
        '1:||Sun|Mon|Tue|Wed|Thr|Fri|Sat|'
      ].join(''),
      :cht => 's',

      :chd => 't:'+ [
        x_coords.join(','), y_coords.join(','), values
      ].join('|')
    }

    @url = base + params.each_pair do |key, value|
      [key.to_s, value]
    end.collect { |tuple| tuple.join('=') }.join('&')
  end

  private

  def grind_values

    matrix = (0..7).collect { (0..23).collect{0} }
    @dates.each do |date|
      matrix[date.wday][date.hour] += 1;
    end
    max = matrix.inject(0) do |m1,a|
      v1 = a.inject(0) do |m2,v2|
        v2 > m2 ? v2 : m2
      end
      v1 > m1 ? v1 : m1
    end

    scale = 24 / max # Max value = 100

    values = []
    (0..7).each do |y|
      (0..23).each do |x|
        values.push(matrix[y][x] * scale)
      end
    end
    values.join(',')
  end
end
