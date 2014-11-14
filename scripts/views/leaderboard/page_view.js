define('Leaderboard.PageView', [
  'View'
], function (View) {
  var PageView = View.extend({
    template: 'leaderboard/page',

    locals: function () {
      return { model: this.model.toJSON() }
    },
  })

  return PageView
})
