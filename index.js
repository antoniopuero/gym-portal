import 'bootstrap/dist/css/bootstrap.min.css';

import angular from 'angular';
import routes from './routes';

angular.module('gymPortal', [])
  .config(routes);