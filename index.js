import 'bootstrap/dist/css/bootstrap.min.css';
import "babel-polyfill";

import angular from 'angular';
import 'ui-router';
import routes from './routes';


const app = angular.module('gymPortal', ['ui.router']);

app.config(routes);