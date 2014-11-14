define('LeaderboardView', [
  'View',
  'Session',
  'Leaderboard.AutocompleteView',
  'Leaderboard.PageView',
], function (View, Session, AutocompleteView, PageView) {
  var LeaderboardView = View.extend({
    template: 'leaderboard',

    locals: function () {
      return { model: this.model.toJSON() }
    },

    initialize: function () {
      this.collection = new Backbone.Collection
      this.autocomplete = new AutocompleteView()
      this.listenTo(this.model, 'sync', this.render)
      this.listenTo(this.model, 'error', this.back)
      this.listenTo(this.autocomplete, 'select', this.add)
      this.listenTo(this.collection, 'add', this.show)
    },

    render: function () {
      if (!this.model.id) { return this }
      View.prototype.render.call(this)
      this.autocomplete.setElement(this.$('[view="autocomplete"]'))
      this.autocomplete.render()
      return this
    },

    back: function () {
      Session.trigger('view:dashboard')
    },

    add: function (model) {
      this.collection.add(model)      
    },

    show: function (model) {
      var el = this.$('[repeat="page"]')
      var view = new PageView({ model: model })
      el.prepend(view.render().el)
    },

    destroy: function () {
      this.collection.reset()
      this.model.destroy({})
      this.back()
    }
  })

  return LeaderboardView
})
