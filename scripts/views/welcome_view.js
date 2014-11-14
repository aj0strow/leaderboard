define('WelcomeView', [
  'View',
  'Session'
], function (View, Session) {
  var WelcomeView = View.extend({
    template: 'welcome',

    login: function () {
      Session.login()
    }
  })

  return WelcomeView
})

/*
app.controller('WelcomeCtrl', function ($scope, session, $state) {
  $scope.auth = function () {
    var promise = session.auth()
    promise.then(function () {
      $state.go('dashboard')
    }, function (error) {
      $scope.error = display(error)
    })
  }

  function display (error) {
    if (error.message == 'not_authorized') {
      return 'You need to click "Okay" tho.'
    } else if (error.message == 'unknown') {
      return 'You need to "Log In" tho.'
    } else {
      return 'Something went wrong.'
    }
  }
})
*/
