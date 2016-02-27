import template from "./signup.html";

import {signup} from "../../services/rest";

function Controller ($scope, $rootScope, $state) {
  $scope.formData = {};

  $scope.onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup($scope.formData);
      $rootScope.$apply(() => {
        $rootScope.user = user;
      });
      $state.go('layout.main');
    } catch (e) {
      $scope.$apply(() => {
        $scope.error = e.message;
      });
    }
  }
};

Controller.$inject = ['$scope', '$rootScope', '$state'];

export default {
  template,
  controller: Controller
}