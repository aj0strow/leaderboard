define('PageModel', [], function () {
  var milliseconds = 10000

  var PageModel = Backbone.Model.extend({
    toJSON: function () {
      var props = _.extend({}, this.attributes)
      props['desc'] = this.getDesc()
      props['.priority'] = this.priority()
      return props
    },

    getDesc: function () {
      var desc = this.get('category')
      var loc = this.get('location')
      if (loc && loc.city) {
        desc += ' • ' + loc.city
      } else if (loc && loc.country) {
        desc += ' • ' + loc.country
      }
      return desc
    },

    priority: function () {
      return -this.get('likes')
    },

    poll: function () {
      FB.api('/' + this.id, {
        fields: 'id,name,link,category,location,likes'
      }, this.set.bind(this))
    },

    start: function () {
      this.timeout = setTimeout(function () {
        this.poll()
        this.start()
      }.bind(this), Math.random() * milliseconds + milliseconds)
    },

    stop: function () {
      clearTimeout(this.timeout)
    },
  })

  return PageModel
})
