routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
import _ from "lodash";
import headerComponent from './components/header';
import footerComponent from './components/footer';
import login from './containers/login';
import signup from './containers/signup';
import layout from './containers/layout';
import profile from './containers/profile';
import adminCalendar from './containers/adminCalendar';
import {checkSession, getAdmins, getAdmin} from './services/rest';

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
      views: _.extend({}, defaultViews, {
        main: {
          template: "<h1>here will be smth</h1>"
        }
      })
    })

    .state('layout.profile', {
      url: "/profile",
      views: _.extend({}, defaultViews, {
        main: profile
      }),
      resolve: {
        admins: ['$rootScope', 'user', async ($rootScope, user) => {
          if (user.admin) {
            return null;
          } else {
            try {
              const res = await getAdmins();
              return res.admins;
            } catch (e) {
              return [];
            }
          }
        }]
      }
    })
    .state('layout.adminCalendar', {
      url: "/admin-calendar/:adminId",
      views: _.extend({}, defaultViews, {
        main: adminCalendar
      }),
      resolve: {
        admin: ['$rootScope', 'user', '$stateParams', async ($rootScope, user, $stateParams) => {
          if (user.admin) {
            return null;
          } else {
            try {
              const res = await getAdmin($stateParams.adminId);
              return res.admin;
            } catch (e) {
              return [];
            }
          }
        }]
      }
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