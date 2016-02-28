import template from "./header.html";
import {logout} from "../../services/rest";
function Controller ($scope, $rootScope, $state) {
  $scope.logOut = async (e) => {
    e.preventDefault();

    try {
      await logout();
      $rootScope.$apply(() => {
        $rootScope.user = null;
        $state.go("layout.main");
      });
    } catch (e) {
      $scope.$apply(() => {
        $scope.error = e.message;
      });
    }
  }
}

Controller.$inject = ['$scope', '$rootScope', '$state'];
export default {
  template,
  controller: Controller
}