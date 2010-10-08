if t = tweek_toy
  $(document).ready () => require ["toy/#{t}"], (T) => new T $("#play_canvas")
