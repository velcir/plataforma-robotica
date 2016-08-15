import { Editor } from '../../common/services/editor.service';
import IToastService = angular.material.IToastService;

export const editor: angular.IComponentOptions = {
  template: require('./editor.component.html'),
  controller: EditorController
};

EditorController.$inject = ['Editor', '$mdToast'];

function EditorController(editorService: Editor, $mdToast: IToastService) {
  const $ctrl = this;

  $ctrl.submeterPrograma = submeterPrograma;

  function submeterPrograma() {
    try {
      editorService
        .submeterPrograma()
        .then(() => mostrarToast('Programa enviado com sucesso!'))
        .catch(() => mostrarToast('Programa não pode ser enviado!'));
    } catch (e) {
      mostrarToast(e);
    }

    function mostrarToast(msg) {
      $mdToast.show($mdToast.simple().textContent(msg));
    }
  }
}
