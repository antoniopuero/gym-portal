routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
import _ from "lodash";
import headerComponent from './components/header';
import footerComponent from './components/footer';
import login from './containers/login';
import signup from './containers/signup';

const defaultViews = {
  header: headerComponent,
  footer: footerComponent
};



export default function routing ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      views: _.extend({}, defaultViews)
    })
    .state('login', {
      url: "/login",
      views: _.extend({}, defaultViews, {
        main: login
      })
    })
    .state('signup', {
      url: "/signup",
      views: _.extend({}, defaultViews, {
        main: signup
      })
    })
  ;
}