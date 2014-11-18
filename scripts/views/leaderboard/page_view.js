define('Leaderboard.PageView', [
  'View'
], function (View) {
  var PageView = View.extend({
    initialize: function () {
      this.listenTo(this.model, 'destroy', this.remove)
    },

    id: function () {
      return this.model.id
    },

    template: 'leaderboard/page',

    locals: function () {
      return { model: this.model.toJSON() }
    },

    toggle: function (ev) {
      this.$('[data-toggle]').toggleClass('hidden')
    },

    destroy: function () {
      this.model.collection.remove(this.model)
      this.model.trigger('destroy')
    },
  })

  return PageView
})
