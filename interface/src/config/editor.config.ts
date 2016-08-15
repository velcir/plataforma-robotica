import * as angular from 'angular';

export enum Cores {
  Verde = 130,
  Azul = 220,
  Vermelho = 15,
  Rosa = 300,
  Amarelo = 65
}

export const BLOCOS = {
  girar_base_esquerda: [30, Cores.Verde, 'Girar base p/ esquerda'],
  girar_base_direita: [30, Cores.Verde, 'Girar base p/ direita'],
  girar_ombro_frente: [10, Cores.Azul, 'Girar ombro p/ frente'],
  girar_ombro_tras: [10, Cores.Azul, 'Girar ombro p/ tras'],
  girar_cotovelo_cima: [20, Cores.Vermelho, 'Girar cotovelo p/ frente'],
  girar_cotovelo_baixo: [20, Cores.Vermelho, 'Girar cotovelo p/ tras'],
  girar_punho_frente: [10, Cores.Rosa, 'Girar punho p/ frente'],
  girar_punho_tras: [10, Cores.Rosa, 'Girar punho p/ tras'],
  abrir_garra: [25, Cores.Amarelo, 'Abrir a garra'],
  fechar_garra: [25, Cores.Amarelo, 'Fechar a garra'],
};

export function blocklyConfig() {
  angular.forEach(BLOCOS, (config, key) => {
    const [valorDefault, cor, label] = config;

    Blockly.Blocks[key] = {
      init() {
        let vm: any = this;
        vm.appendDummyInput()
          .appendField(label)
          .appendField(new Blockly.FieldAngle(valorDefault), 'graus')
          .appendField('graus');
        vm.setPreviousStatement(true);
        vm.setNextStatement(true);
        vm.setColour(cor);
        vm.setTooltip('');
      }
    };
  });
}
