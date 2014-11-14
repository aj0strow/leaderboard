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
      this.autocomplete = new AutocompleteView()
      this.listenTo(this.model, 'sync', this.render)
      this.listenTo(this.model, 'error', this.back)
      this.listenTo(this.autocomplete, 'select', this.add)
      this.listenTo(this.collection, 'add', this.show)
    },

    render: function () {
      View.prototype.render.call(this)
      this.autocomplete.setElement(this.$('[view="autocomplete"]'))
      this.autocomplete.render()
      this.collection.each(this.show, this)
      return this
    },

    back: function () {
      Session.trigger('view:dashboard')
    },

    add: function (model) {
      this.collection.create(model.toJSON())      
    },

    show: function (model) {
      var el = this.$('[repeat="page"]')
      var view = new PageView({ model: model })
      el.prepend(view.render().el)
    },

    destroy: function () {
      if (this.collection.length) {
        this.collection.reset()
      }
      this.model.destroy({})
      this.back()
    }
  })

  return LeaderboardView
})
