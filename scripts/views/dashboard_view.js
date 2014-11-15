define('DashboardView', [
  'View',
  'Session',
  'Auth',
  'Dashboard.LeaderboardView',
], function (View, Session, Auth, LeaderboardView) {
  var DashboardView = View.extend({
    template: 'dashboard',

    locals: function () {
      return {
        user: Session.user,
        count: this.collection.length,
      }
    },

    initialize: function () {
      this.listenTo(this.collection, 'add', this.add)
    },

    add: function (leaderboard) {
      var view = new LeaderboardView({ model: leaderboard })
      this.listenTo(view, 'select', this.select)
      var el = this.$('[repeat="leaderboard"]')
      el.append(view.render().el)
    },

    render: function () {
      View.prototype.render.call(this)
      this.collection.each(this.add, this)
      this.collection.invoke('trigger', 'add')
      return this
    },

    create: function (ev) {
      var model = this.collection.create({})
      this.select(model)
    },

    logout: function (ev) {
      Auth.logout()
    },

    select: function (model) {
      Session.trigger('view:leaderboard', model.id)
    }
  })

  return DashboardView
})
