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
      this.$pages = this.$('[repeat="page"]')
      this.autocomplete.setElement(this.$('[view="autocomplete"]'))
      this.autocomplete.render()
      this.collection.each(this.show, this)
      return this
    },

    back: function () {
      Session.trigger('view:dashboard')
    },

    add: function (model) {
      this.collection.add(model.toJSON())
      this.model.set('updated', Date.now())
    },

    show: function (model) {
      // render view
      var view = new PageView({ model: model })
      var node = view.render().el

      // insert in order
      var index = this.collection.indexOf(model)
      if (index == 0) {
        this.$pages.prepend(node)
      } else  {
        var prev = this.collection.at(index - 1)
        var $prev = $('#' + prev.id)
        if ($prev.length) {
          $prev.after(node)
        } else {
          this.$pages.append(node)
        }
      }
    },

    destroy: function () {
      this.collection.firebase.remove()
      this.model.firebase.remove()
      this.back()
    }
  })

  return LeaderboardView
})
