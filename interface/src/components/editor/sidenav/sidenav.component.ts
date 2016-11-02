export const sidenav: angular.IComponentOptions = {
  template: require('./sidenav.component.html'),
  controller: SidenavController
};

SidenavController.$inject = ['$mdDialog'];

function SidenavController($mdDialog) {

  const $ctrl = this;

  $ctrl.abrirDialog = abrirDialog;

  function abrirDialog($event, image) {
    $mdDialog.show({
      template: require('./dialog.html'),
      controller: function () {
        this.fechar = () => $mdDialog.hide();
        this.image = image;
      },
      targetEvent: $event,
      controllerAs: '$ctrl',
      bindToController: true,
      clickOutsideToClose: true,
      escapeToClose: true
    });
  }
}
