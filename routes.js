routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
import _ from "lodash";
import headerComponent from './components/header';
import footerComponent from './components/footer';
import login from './containers/login';
import signup from './containers/signup';
import layout from './containers/layout';
import {checkSession} from './services/rest';

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
    .state('layout', {
      ...layout,
      abstract: true,
      resolve: {
        user: ['$rootScope', async ($rootScope) => {
          const persistedUser = JSON.parse(localStorage.getItem('user'));
          if (!persistedUser) {
            return null;
          } else {
            try {
              const res = await checkSession(persistedUser);
              $rootScope.user = res;
              return res;
            } catch (e) {
              localStorage.removeItem('user');
              return null;
            }
          }
        }]
      }
    })
    .state('layout.main', {
      url: "/",
      views: _.extend({}, defaultViews)
    })

    .state('layout.login', {
      url: "/login",
      views: _.extend({}, defaultViews, {
        main: login
      })
    })
    .state('layout.signup', {
      url: "/signup",
      views: _.extend({}, defaultViews, {
        main: signup
      })
    })
  ;
}