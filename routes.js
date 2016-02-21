routing.$inject = ['$stateProvider', '$urlRouterProvider'];
import headerComponent from './components/header';
import footerComponent from './components/footer';

export default function routing ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      views: {
        header: headerComponent,
        main: footerComponent
      }
    });
}