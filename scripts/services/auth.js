define('Auth', [
  'Session'
], function (Session) {
  var Auth = {}

  function currentUser () {
    return new Promise(function (yes, no) {
      var ref = new Firebase(window.FIREBASE_URL)
      var user = ref.getAuth()
      if (user) { yes(user) }
      else { no(new Error('no user')) }
    })
  }

  function getStatus () {
    return new Promise(function (yes, no) {
      FB.getLoginStatus(function (response) {
        callback(response, yes, no)
      })
    })
  }

  function login () {
    return new Promise(function (yes, no) {
      FB.login(function (response) {
        callback(response, yes, no)
      })
    })
  }

  function callback (response, yes, no) {
    if (response.status == 'connected') {
      var ref = new Firebase(window.FIREBASE_URL)
      var token = response.authResponse.accessToken
      ref.authWithOAuthToken('facebook', token, function (e, user) {
        if (e) { return no(e) }
        Session.user = user
        yes(user)
      })
    } else {
      no(new Error(response.status))
    }
  }

  Auth.getStatus = function () {
    return currentUser().catch(getStatus)
  }

  Auth.login = function () {
    return currentUser().catch(getStatus).catch(login)
  }

  Auth.logout = function () {
    var ref = new Firebase(window.FIREBASE_URL)
    ref.unauth()
    Session.trigger('view:welcome')
  }

  return Auth
})
