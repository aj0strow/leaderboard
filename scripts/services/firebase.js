define('Firebase', [
  'Session',
], function (Session) {
  function ref () {
    var parts = [ FIREBASE_URL, Session.user.uid ]
    parts = parts.concat(_.toArray(arguments))
    var url = parts.join('/')
    return new Firebase(url)
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
    ref: ref,
    Model: Model,
    Collection: Collection
  }
})
