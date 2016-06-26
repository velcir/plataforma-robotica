import {Editor} from '../../../common/services/editor.service';

export const blockly: angular.IComponentOptions = {
  template: require('./blockly.component.html'),
  controller: BlocklyController
};

BlocklyController.$inject = ['$timeout', '$window', 'Editor'];

function BlocklyController($timeout, $window, editorService: Editor) {
  const $ctrl = this;

  $ctrl.$onInit = $onInit;

  function $onInit() {
    const clientRect = window.document.body.getBoundingClientRect();

    $ctrl.style = {height: (clientRect.height - 120) + 'px'};

    $timeout(initBlockly, 50);
  }

  function initBlockly() {
    editorService.workspace = Blockly.inject('blockly', {
      toolbox: $window.document.getElementById('toolbox'),
      sounds: false,
      trashcan: true
    });
  }
}
