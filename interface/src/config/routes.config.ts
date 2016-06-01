/** @ngInject */
export function routesConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
    })
    .state('editor', {
      url: '/editor',
      template: '<editor></editor>'
    });

  $urlRouterProvider.otherwise('/editor');
}
