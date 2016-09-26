import {loginRequired} from '../common/services/usuario.service';

/** @ngInject */
export function routesConfig($stateProvider: angular.ui.IStateProvider,
                             $urlRouterProvider, $sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://**.firebaseio.com/**',
    'https://plataforma-robotica.s3-sa-east-1.amazonaws.com/videos/**'
  ]);

  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('historico', {
      url: '/historico',
      template: '<historico></historico>',
      resolve: {loginRequired}
    })
    .state('editor', {
      url: '/editor',
      template: '<editor></editor>',
      resolve: {loginRequired}
    });

  $urlRouterProvider.otherwise('/editor');
}
