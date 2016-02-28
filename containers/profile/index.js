import template from "./profile.html";
function Controller ($window, $rootScope) {
  var widget = new $window.TimekitBooking();

  widget.init({
    email: $rootScope.user.email,
    name: `${$rootScope.user.firstName} ${$rootScope.user.lastName}`,
    apiToken: $rootScope.user.apiToken,
    calendar: $rootScope.user.calendar,
    avatar: $rootScope.user.avatar,
    targetEl: '#profileBooking'
  });

}

Controller.$inject = ['$window', '$rootScope'];

export default {
  template,
  controller: Controller
}