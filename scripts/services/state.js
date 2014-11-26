define('State', [
  'Session',
  'Firebase',
  'WelcomeView',
  'DashboardView',
  'LeaderboardView',
  'Storage',
  'PageModel'
], function (Session, Firebase, WelcomeView, DashboardView, LeaderboardView, Storage, PageModel) {    
  Session.on('view:welcome', function () {
    save('view:welcome')
    render(new WelcomeView)
  })

  Session.on('view:dashboard', function () {
    save('view:dashboard')
    var Collection = Firebase.Collection.extend({
      url: Firebase.url('leaderboards')
    })
    var collection = new Collection
    render(new DashboardView({ collection: collection }))
  })

  Session.on('view:leaderboard', function (id) {
    save('view:leaderboard', id)
    var Model = Firebase.Model.extend({
      url: Firebase.url('leaderboards', id)
    })
    var model = new Model
    var Collection = Firebase.Collection.extend({
      url: Firebase.url('pages', id),
      model: PageModel
    })
    var collection = new Collection
    collection.comparator = function (model) {
      return _.result(model, 'priority')
    }
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
