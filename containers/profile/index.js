import template from "./profile.html";
function Controller ($window, $rootScope, $scope, admins) {
  if ($rootScope.user && $rootScope.user.admin) {
    var widget = new $window.TimekitBooking();

    widget.init({
      email: $rootScope.user.email,
      name: `${$rootScope.user.firstName} ${$rootScope.user.lastName}`,
      apiToken: $rootScope.user.apiToken,
      calendar: $rootScope.user.calendar,
      avatar: $rootScope.user.avatar,
      targetEl: '#profileBooking'
    });
  } else {
      $scope.admins = admins;
  }

}

Controller.$inject = ['$window', '$rootScope', '$scope', 'admins'];

export default {
  template,
  controller: Controller
}