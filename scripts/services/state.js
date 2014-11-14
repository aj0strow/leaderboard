define('State', [
  'Session',
  'Firebase',
  'WelcomeView',
  'DashboardView',
  'LeaderboardView',
  'Storage',
], function (Session, Firebase, WelcomeView, DashboardView, LeaderboardView, Storage) {
  Session.on('view:welcome', function () {
    save('view:welcome')
    render(new WelcomeView)
  })

  Session.on('view:dashboard', function () {
    save('view:dashboard')
    render(new DashboardView())
  })

  Session.on('view:leaderboard', function (id) {
    save('view:leaderboard', id)
    var model = Firebase.model('/leaderboards/' + Session.user.uid + '/' + id)
    render(new LeaderboardView({ model: model }))
  })

  function save () {
    var args = _.toArray(arguments)
    Storage.set('view', args)
  }

  function render (view) {
    $('#view').html(view.render().el)
  }

  return {
    run: function () {
      if (Session.user) {
        var args = Storage.get('view', function () {
          return [ 'view:dashboard' ]
        })
        Session.trigger.apply(Session, args)
      } else {
        Session.trigger('view:welcome')
      }
    }
  }
})
