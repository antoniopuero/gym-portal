import template from "./login.html";
import {login} from "../../services/rest";
function Controller ($scope) {
  $scope.formData = {};

  $scope.onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login($scope.formData);
    } catch (e) {
      $scope.$apply(() => {
        $scope.error = e.message;
      });
    }
  }
};

Controller.$inject = ['$scope'];
export default {
  template,
  controller: Controller
}