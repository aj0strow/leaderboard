define('Leaderboard.PageView', [
  'View'
], function (View) {
  var PageView = View.extend({
    id: function () {
      return this.model.id
    },

    template: 'leaderboard/page',

    locals: function () {
      return { model: this.model.toJSON() }
    },
  })

  return PageView
})
