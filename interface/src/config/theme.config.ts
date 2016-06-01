/** @ngInject */
export function themingConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('amber')
    .warnPalette('red');
}
