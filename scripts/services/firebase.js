define('Firebase', [], function () {
  function ref (path) {
    var root = 'https://leaderboard-social.firebaseio.com'
    return new Firebase(root + path)
  }

  function collection (path) {
    var Collection = Backbone.Firebase.Collection.extend({
      firebase: ref(path)
    })
    var collection = new Collection
    collection.path = path
    return collection
  }

  function model (path) {
    var Model = Backbone.Firebase.Model.extend({
      firebase: ref(path)
    })
    var model = new Model
    model.on('sync', function () {
      if (!model.id) { this.trigger('error') }
    })
    
    model.path = path
    return model
  }

  return {
    collection: collection,
    model: model,
  }
})
