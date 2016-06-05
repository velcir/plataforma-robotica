export const editor: angular.IComponentOptions = {
  template: require('./editor.component.html'),
  controller: EditorController
};

EditorController.$inject = ['$timeout'];

function EditorController($timeout) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    const clientRect = window.document.body.getBoundingClientRect();

    $ctrl.style = {height: (clientRect.height - 120) + 'px'};

    configBlockly();
    $timeout(initBlockly, 50);
  };
}

function configBlockly() {
  Blockly.Blocks['girar_esquerda'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Girar p/ esquerda')
        .appendField(new Blockly.FieldAngle(90), 'graus');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(120);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['girar_direita'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Girar p/ direita')
        .appendField(new Blockly.FieldAngle(90), 'graus');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(120);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['abrir_pinca'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Abrir a pinça');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(210);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['fechar_pinca'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Fechar a pinça');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(20);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['mover_frente'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Mover p/ Frente')
        .appendField(new Blockly.FieldTextInput(''), 'distancia')
        .appendField('cm');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(160);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['mover_baixo'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Mover p/ Baixo')
        .appendField(new Blockly.FieldTextInput(''), 'distancia')
        .appendField('cm');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(160);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['mover_tras'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Mover p/ Tras')
        .appendField(new Blockly.FieldTextInput(''), 'distancia')
        .appendField('cm');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(160);
      vm.setTooltip('');
    }
  };

  Blockly.Blocks['mover_cima'] = {
    init() {
      let vm: any = this;
      vm.appendDummyInput()
        .appendField('Mover p/ Cima')
        .appendField(new Blockly.FieldTextInput(''), 'distancia')
        .appendField('cm');
      vm.setPreviousStatement(true);
      vm.setNextStatement(true);
      vm.setColour(160);
      vm.setTooltip('');
    }
  };
}

function initBlockly() {

  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    sounds: false,
    trashcan: true
  });

  console.log(workspace);
}
