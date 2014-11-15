define('WelcomeView', [
  'View',
  'Session',
  'Auth',
], function (View, Session, Auth) {
  var WelcomeView = View.extend({
    template: 'welcome',

    login: function () {
      Auth.login().then(function () {
        Session.trigger('view:dashboard')
      }).catch(function (e) {
        console.error(e)
      })
    }
  })

  return WelcomeView
})
