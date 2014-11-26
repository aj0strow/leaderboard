define('View', [], function () {
  var View = Backbone.View.extend({
    events: {
      'click [click]': 'onEvent',
      'keyup [keyup]': 'onEvent',
    },

    onEvent: function (ev) {
      var target = $(ev.target).closest('a, [' + ev.type + ']')
      ev.delegateTarget = target[0]
      var method = target.attr(ev.type)
      if (method) {
        ev.preventDefault()
        ev.stopPropagation()
        this[method].call(this, ev)
      }      
    },

    render: function () {
      var template = window.templates[this.template]
      var data = _.result(this, 'locals')
      var markup = template.render(data)
      this.$el.html(markup)
      return this
    },

    remove: function () {
      this.trigger('remove', this)
      Backbone.View.remove.call(this)
    }
  })

  return View
})
