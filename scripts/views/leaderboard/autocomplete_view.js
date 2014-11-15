define('Leaderboard.AutocompleteView', [
  'View',
  'Leaderboard.SuggestionView'
], function (View, SuggestionView) {
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
      var params = { q: str, type: 'page', limit: 10, fields: 'id,name,likes' }
      FB.api('/search', params, function (response) {
        this.collection.reset(response.data)
      }.bind(this))
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
