require.def ['rg/debug', 'rg/space_circle'], (Debug, SpaceCircle) =>

  class Goal extends SpaceCircle
    red:   () -> if @hit then 0 else 255
    green: () -> if @hit then 255 else 0
