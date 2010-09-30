require.def ['rg/debug', 'rg/space_circle'], (Debug, SpaceCircle) =>

  class Goal extends SpaceCircle

    step: () ->
      super
      if @hit then @game.level.protagonist.splode()

    blue: () -> 255
    fill: () -> true

