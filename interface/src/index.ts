/// <reference path="index.d.ts" />

import * as angular from 'angular';

import 'angular-material';
import 'angularfire';
import 'angular-ui-router';

import './index.scss';

const ngModule = angular.module('app', [
  'ngMaterial',
  'firebase',
  'ui.router'
]);

import {routesConfig} from './config/routes.config';
import {themingConfig} from './config/theme.config';

import {Firebase} from './common/services/firebase.service';
import {Usuario, runOnRouteError} from './common/services/usuario.service';

import {app} from './components/app/app.component';
import {login} from './components/login/login.component';
import {editor} from './components/editor/editor.component';

ngModule
  .value('FIREBASE_URL', 'https://plataforma-robotica.firebaseio.com/')
  .service('Firebase', Firebase)
  .service('Usuario', Usuario)
  .config(routesConfig)
  .config(themingConfig)
  .run(runOnRouteError)
  .component('app', app)
  .component('login', login)
  .component('editor', editor);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ngModule.name]);
});
