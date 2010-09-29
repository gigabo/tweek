require.def [
  'rg/score_time',
  'rg/debug'
], (ScoreTime,Debug) =>

  all_scores = []

  class ScoreManager
    constructor: (@game) ->

    types: () -> ['time', 'finish', 'loops', 'total']

    register: (score) -> all_scores.push score

    reset: () -> all_scores = []

    total: () ->
      total = 0
      for score in all_scores
        total += score.value()
      total
