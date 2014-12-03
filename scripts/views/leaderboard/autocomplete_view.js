define('Leaderboard.AutocompleteView', [
  'View',
  'Leaderboard.SuggestionView',
  'PageModel'
], function (View, SuggestionView, PageModel) {
  var PageCollection = Backbone.Collection.extend({
    model: PageModel
  })

  var AutocompleteView = View.extend({
    template: 'leaderboard/autocomplete',

    initialize: function () {
      this.collection = new PageCollection
      this.collection.on('reset', function (x, options) {
        _.invoke(options.previousModels, 'trigger', 'remove')
      })
      this.listenTo(this.collection, 'reset', this.suggest)
    },

    search: _.debounce(function (ev) {
      var str = $(ev.delegateTarget).val()
      str = str.replace(/^https:\/\/www\.facebook\.com\//, '')
      var params = {
        q: str, type: 'page', limit: 10,
        fields: 'id,name,link,category,location,best_page,likes,cover'
      }  
      FB.api('/search', params, function (response) {
        var data = _.filter(response.data, 'likes')
        this.collection.reset(data)
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
