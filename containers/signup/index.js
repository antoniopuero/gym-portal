import template from "./signup.html";
import $ from "jquery";

import {signup} from "../../services/rest";

function Controller ($scope, $rootScope, $state) {
  $scope.formData = {};

  $scope.onSubmit = async (e) => {
    let dataFromEmbeddedCode = {};
    let window = {};
    e.preventDefault();

    try {
      if ($scope.formData.admin) {
        let scriptsInEmbeddedCode = $($scope.formData.embeddedCode).find('script');
        if (scriptsInEmbeddedCode.length !== 3) {
          throw new Error("Make sure you've copied and pasted the right piece of code");
        } else {
          eval(scriptsInEmbeddedCode.eq(2).text());
          if (!window.timekitBookingConfig) {
            throw new Error("Something is wrong with your embeded code, please contact the administrator by phone");
          }
          else {
            dataFromEmbeddedCode = _.pick(window.timekitBookingConfig, ['apiToken', 'calendar', 'avatar']);
          }
        }
      }
      const dataToSend = _.merge(dataFromEmbeddedCode, _.omit($scope.formData, 'embeddedCode'));
      const user = await signup(dataToSend);
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