import {Firebase} from './firebase.service';
import {Usuario} from './usuario.service';

export class Editor {
  static $inject = ['Firebase', 'Usuario'];

  public workspace;

  constructor(private firebase: Firebase, private usuario: Usuario) {}

  public submeterPrograma() {
    const programa = this.blocklyParser();
    this.firebase.loadArray(`programas`).$add({usuario: this.usuario.id, programa});
  }

  private blocklyParser() {
    const blocks = this.workspace.getTopBlocks(true);

    if (!blocks.length) {
      throw 'Adicione uma ou mais operações no programa!';
    } else if (blocks.length > 1) {
      throw 'Todas as operações devem estar em um bloco só!';
    } else {
      return this.blockParser(blocks[0]);
    }
  }

  private blockParser(block) {
    const child = block.childBlocks_.length && block.childBlocks_[0];
    return [PARSERS[block.type](block)].concat(child ? this.blockParser(child) : []);
  }
}

const PARSERS = {
  girar_esquerda: numberInput,
  girar_direita: numberInput,
  abrir_pinca: noInput,
  fechar_pinca: noInput,
  mover_frente: numberInput,
  mover_baixo: numberInput,
  mover_tras: numberInput,
  mover_cima: numberInput,
};

function noInput(block) {
  return [block.type];
}

function numberInput(block) {

  const valor = block.inputList[0].fieldRow[1].text_;

  if (/^\d+$/.test(valor)) {
    return [block.type, parseInt(valor)];
  } else {
    const label = block.inputList[0].fieldRow[0].text_;
    throw `Preencha o campo '${label}' com um valor numérico!`;
  }
}
