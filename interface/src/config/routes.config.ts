import {loginRequired} from '../common/services/usuario.service';

/** @ngInject */
export function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('editor', {
      url: '/editor',
      template: '<editor></editor>',
      resolve: {loginRequired}
    });

  $urlRouterProvider.otherwise('/editor');
}
