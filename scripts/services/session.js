define('Session', [], function () {
  var Session = {}
  _.extend(Session, Backbone.Events)

  var user = {
    uid: 'facebook:10152831342072269',
    facebook: {
      id: '10152831342072269',
      displayName: 'AJ Ostrow',
    }
  }

  Session.user = user

  Session.login = function () {
    this.trigger('view:dashboard')
  }

  Session.logout = function () {
    this.user = null
    this.trigger('view:welcome')
  }

  return Session
})
