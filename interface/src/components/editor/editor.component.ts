import {Editor} from '../../common/services/editor.service';
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
    const toast = $mdToast.simple();

    try {
      editorService.submeterPrograma();
      toast.textContent('Programa enviado com sucesso!');
    } catch (e) {
      toast.textContent(e);
    }

    $mdToast.show(toast);
  }
}
