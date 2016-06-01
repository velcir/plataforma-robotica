/// <reference path="index.d.ts" />

import * as angular from 'angular';

import 'angular-material';
import 'angularfire';
import 'angular-ui-router';
import 'angular-material/angular-material.css';

const ngModule = angular.module('app', [
  'ngMaterial',
  'firebase',
  'ui.router'
]);

import {routesConfig} from './config/routes.config';
import {themingConfig} from './config/theme.config';

import {Firebase} from './common/services/firebase.service';
import {loginRequired, Usuario} from './common/services/usuario.service';

import {app} from './components/app.component';
import {login} from './components/login/login.component';

ngModule
  .run(loginRequired)
  .value('FIREBASE_URL', 'https://plataforma-robotica.firebaseio.com/')
  .service('Firebase', Firebase)
  .service('Usuario', Usuario)
  .config(routesConfig)
  .config(themingConfig)
  .component('app', app)
  .component('login', login);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ngModule.name]);
});
