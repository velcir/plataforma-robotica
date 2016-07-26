import {loginRequired} from '../common/services/usuario.service';

/** @ngInject */
export function routesConfig($stateProvider: angular.ui.IStateProvider,
                             $urlRouterProvider, $sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://**.firebaseio.com/**',
    'https://firebasestorage.googleapis.com/**'
  ]);

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
