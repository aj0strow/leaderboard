define('PageModel', [], function () {
  var milliseconds = 20000

  var PageModel = Backbone.Model.extend({
    toJSON: function () {
      var props = _.extend({}, this.attributes)
      props['desc'] = this.getDesc()
      return props
    },

    getDesc: function () {
      var desc = [ this.get('category') ]
      var loc = this.get('location')
      if (loc && loc.city) {
        desc.push(loc.city)
      } else if (loc && loc.country) {
        desc.push(loc.country)
      }
      return desc.join(' • ')
    },

    poll: function () {
      FB.api('/' + this.id, {
        fields: 'id,name,link,likes'
      }, function (data) {
        data.updated = Date.now()
        this.set(data)
      }.bind(this))
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
