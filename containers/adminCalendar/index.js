import template from "./adminCalendar.html";
function Controller ($window, admin) {
    var widget = new $window.TimekitBooking();
    console.log(admin)

    admin && widget.init({
      email: admin.email,
      name: `${admin.firstName} ${admin.lastName}`,
      apiToken: admin.apiToken,
      calendar: admin.calendar,
      avatar: admin.avatar,
      targetEl: '#adminCalendar'
    });

}

Controller.$inject = ['$window', 'admin'];

export default {
  template,
  controller: Controller
}