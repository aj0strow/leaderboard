define('Firebase', [
  'Session',
], function (Session) {
  var root = 'https://leaderboard-social.firebaseio.com'

  function ref (parts) {
    var url = [ root, Session.user.uid ].concat(parts).join('/')
    return new Firebase(url)
  }

  function collection () {
    var Collection = Backbone.Firebase.Collection.extend({
      firebase: ref(_.toArray(arguments))
    })
    return new Collection
  }

  function model () {
    var Model = Backbone.Firebase.Model.extend({
      firebase: ref(_.toArray(arguments))
    })
    var model = new Model
    model.on('sync', function () {
      if (!model.id) { this.trigger('error') }
    })
    return model
  }

  return {
    collection: collection,
    model: model,
  }
})
