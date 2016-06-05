import {Usuario} from '../../common/services/usuario.service';

export const app: angular.IComponentOptions = {
  template: require('./app.component.html'),
  controller: AppController
};

AppController.$inject = ['Usuario'];

function AppController(usuario: Usuario) {
  this.usuario = usuario;
}
