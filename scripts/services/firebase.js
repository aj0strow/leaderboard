define('Firebase', [
  'Session',
], function (Session) {
  function url () {
    var parts = [ FIREBASE_URL, Session.user.uid ]
    parts = parts.concat(_.toArray(arguments))
    return parts.join('/')
  }

  var Model = Backbone.Firebase.Model.extend({
    initialize: function () {
      this.listenTo(this, 'sync', function () {
        if (!this.id) { this.trigger('error') }
      })
    }
  })

  var Collection = Backbone.Firebase.Collection.extend({
    comparator: function (model) {
      return _.result(model, 'priority') || model.id
    }
  })

  return {
    url: url,
    Model: Model,
    Collection: Collection
  }
})
