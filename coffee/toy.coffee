if tweek_toy
  $(document).ready () => require ["toy/#{tweek_toy}"], (T) => new T
