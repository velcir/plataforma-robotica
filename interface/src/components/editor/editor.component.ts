import {Editor} from '../../common/services/editor.service';
import IToastService = angular.material.IToastService;

export const editor: angular.IComponentOptions = {
  template: require('./editor.component.html'),
  controller: EditorController
};

EditorController.$inject = ['$timeout', 'Editor', '$mdToast'];

function EditorController($timeout, editorService: Editor, $mdToast: IToastService) {
  const $ctrl = this;

  $ctrl.submeterPrograma = submeterPrograma;

  $ctrl.$onInit = () => {
    const clientRect = window.document.body.getBoundingClientRect();

    $ctrl.style = {height: (clientRect.height - 120) + 'px'};

    $timeout(initBlockly, 50);
  };

  function initBlockly() {
    $ctrl.workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      sounds: false,
      trashcan: true
    });
  }

  function submeterPrograma() {
    const toast = $mdToast.simple();

    try {
      const programa = editorService.blocklyParser(this.workspace);
      editorService.submeterPrograma(programa);
      toast.textContent('Programa enviado com sucesso!');
    } catch (e) {
      toast.textContent(e);
    }

    $mdToast.show(toast);
  }
}
