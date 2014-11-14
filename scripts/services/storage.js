define('Storage', [], function () {
  var Storage = {
    get: function (key, func) {
      var value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      } else if (func) {
        return func()
      } else {
        return null
      }
    },

    set: function (key, value) {
      if (value == null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
      return value
    },

    cache: function (key, func) {
      var value = Storage.get(key)
      if (value) { return value }
      return Storage.set(key, func())
    },
  }

  return Storage
})
