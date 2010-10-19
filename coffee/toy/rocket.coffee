require.def ['rg/game'], (Game) =>
  class Wrapper
    constructor: () -> new Game()
