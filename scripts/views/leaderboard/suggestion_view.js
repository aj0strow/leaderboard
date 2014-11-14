define('Leaderboard.SuggestionView', [
  'View'
], function (View) {
  var SuggestionView = View.extend({
    template: 'leaderboard/suggestion',

    locals: function () {
      return { model: this.model.toJSON() }
    },

    initialize: function () {
      this.listenTo(this.model, 'remove', this.remove)
    },

    select: function () {
      this.trigger('select', this.model)
    },
  })

  return SuggestionView
})
