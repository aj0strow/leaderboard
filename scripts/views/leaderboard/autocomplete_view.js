define('Leaderboard.AutocompleteView', [
  'View',
  'Leaderboard.SuggestionView'
], function (View, SuggestionView) {
  var data = {
    "id": "1408982602703881", 
    "about": "McGill's only reliable news source.\n\nThe Phantom Menace: https://www.youtube.com/watch?v=0xa7c7PQoSQ", 
    "category": "Media/news/publishing", 
    "cover": {
      "cover_id": "1456043204664487", 
      "offset_x": 0, 
      "offset_y": 0, 
      "source": "https://scontent-a.xx.fbcdn.net/hphotos-xap1/t31.0-8/q85/s720x720/10476085_1456043204664487_7580806513143467826_o.jpg", 
      "id": "1456043204664487"
    }, 
    "likes": 4830, 
    "link": "https://www.facebook.com/themctavishradish", 
    "name": "The McTavish Radish", 
    "username": "themctavishradish", 
  }

  var AutocompleteView = View.extend({
    template: 'leaderboard/autocomplete',

    initialize: function () {
      this.collection = new Backbone.Collection
      this.collection.on('reset', function (x, options) {
        _.invoke(options.previousModels, 'trigger', 'remove')
      })
      this.listenTo(this.collection, 'reset', this.suggest)
    },

    search: _.debounce(function (ev) {
      var str = $(ev.delegateTarget).val()
      setTimeout(function () {
        this.collection.reset([ new Backbone.Model(data) ])
      }.bind(this), 200)
    }, 300, false),

    suggest: function () {
      this.collection.each(function (model) {
        var view = new SuggestionView({ model: model })
        this.listenTo(view, 'select', this.select)
        this.$el.append(view.render().el)
      }, this)
    },

    select: function (model) {
      this.trigger('select', model)
      this.collection.reset()
      this.$('[keyup]').val('')
    },
  })

  return AutocompleteView
})
