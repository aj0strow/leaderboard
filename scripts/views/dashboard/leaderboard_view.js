define('Dashboard.LeaderboardView', [
  'View',
], function (View) {
  var LeaderboardView = View.extend({
    template: 'dashboard/leaderboard',

    locals: function () {
      return { model: this.model.toJSON() }
    },

    select: function () {
      this.trigger('select', this.model)
    }
  })

  return LeaderboardView
})
