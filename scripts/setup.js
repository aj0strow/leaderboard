require([
  'State',
  'Session',
  'Auth'
], function (State, Session, Auth) {
  FIREBASE_URL = 'https://leaderboard-social.firebaseio.com'

  FB.init({
    appId: '721946387873528',
    status: true,
    xfbml: true,
    version: 'v2.0',
  })

  $(function () {
    Backbone.history.start({ pushState: true, silent: true })

    Auth.getStatus()
    .then(function (user) {
      Session.user = user
    })
    .catch(_.identity)
    .finally(function () {
      State.run()
    })
  })
})
