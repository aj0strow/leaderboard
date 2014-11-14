define('Facebook', [], function () {
  FB.init({
    appId: '721946387873528',
    status: true,
    xfbml: true,
    version: 'v2.0',
  })

  /*
  FB.login(function (response) {
    if (response.status == 'connected') {
      var token = response.authResponse.accessToken
      firebase.authWithOAuthToken('facebook', token, function (e, user) {
        if (e) {
          o.onError(e)
        } else {
          o.onNext(user)
          o.onCompleted()
        }
      })
    } else {
      o.onError(new Error(response.status))
    }
  })
  */

  function login () {
    return new Promise(function (resolve, reject) {
      FB.login(function (response) {
        if (response.status == 'connected') {
          resolve(response)
        } else {
          var error = new Error('facebook ' + response.status)
          error.data = response
          reject(error)
        }
      })
    })
  }

  function logout () {
    return new Promise(function (resolve) {
      FB.logout(resolve)
    })
  }

  function api (path, method, params) {
    return new Promise(function (resolve) {
      FB.api(path, method, params, resolve)
    })
  }

  return {
    login: login,
    logout: logout,
    api: api,
  }
})
