define('PageModel', [], function () {
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
  })

  return PageModel
})
