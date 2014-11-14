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
    var collection = Firebase.collection('leaderboards')
    render(new DashboardView({ collection: collection }))
  })

  Session.on('view:leaderboard', function (id) {
    save('view:leaderboard', id)
    var model = Firebase.model('leaderboards', id)
    var collection = Firebase.collection('pages', id)
    render(new LeaderboardView({ model: model, collection: collection }))
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
