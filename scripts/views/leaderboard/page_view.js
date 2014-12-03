define('Leaderboard.PageView', [
  'moment',
  'View'
], function (moment, View) {
  var PageView = View.extend({
    initialize: function () {
      this.listenTo(this.model, 'change:likes', this.update)
      this.listenTo(this.model, 'destroy', this.remove)      
      this.listenTo(this, 'remove', function () {
        this.model.stop()
      })
      this.model.start()
    },

    id: function () {
      return this.model.id
    },

    template: 'leaderboard/page',

    locals: function () {
      var updated = this.model.get('updated')
      var timestamp = moment(updated).format('MMM D, YYYY @ hh:mm:ss')
      return { model: this.model.toJSON(), updated: timestamp }
    },

    toggle: function (ev) {
      this.$('[data-toggle]').toggleClass('hidden')
    },

    update: function () {
      var likes = this.model.get('likes')
      var delta = likes - this.model.previous('likes')

      this.$('.leaderboard-page-likes').text(likes)
      if (delta > 0) {
        this.$el.addClass('plus').removeClass('minus')
      } else {
        this.$el.addClass('minus').removeClass('plus')
      }
      this.$el.delay(800).queue(function () {
        $(this).removeClass('plus minus').dequeue()
      })

      // console.log('%s => %d', this.model.get('name'), delta)
    },

    destroy: function () {
      this.model.collection.remove(this.model)
      this.model.trigger('destroy')
    },
  })

  return PageView
})
