import {Usuario} from '../../common/services/usuario.service';

export const login: angular.IComponentOptions = {
  template: require('./login.componet.html'),
  controller: LoginController
};

LoginController.$inject = ['Usuario'];

function LoginController(usuario: Usuario) {
  const $ctrl = this;

  $ctrl.usuario = usuario;
  $ctrl.usuario.logout();
}
