import template from "./header.html";
import {logout} from "../../services/rest";
function Controller ($scope, $rootScope) {
  $scope.logOut = async (e) => {
    e.preventDefault();

    try {
      await logout();
      $rootScope.$apply(() => {
        $rootScope.user = null;
      });
    } catch (e) {
      $scope.$apply(() => {
        $scope.error = e.message;
      });
    }
  }
}

Controller.$inject = ['$scope', '$rootScope'];
export default {
  template,
  controller: Controller
}