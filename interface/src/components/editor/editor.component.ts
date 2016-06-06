import {Editor} from '../../common/services/editor.service';

export const editor: angular.IComponentOptions = {
  template: require('./editor.component.html'),
  controller: EditorController
};

EditorController.$inject = ['$timeout', 'Editor'];

function EditorController($timeout, editorService: Editor) {
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
    try {
      const programa = editorService.blocklyParser(this.workspace);
      editorService.submeterPrograma(programa);
    } catch (e) {
      console.error(e);
    }
  }
}
