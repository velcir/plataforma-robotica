import { Editor } from '../../common/services/editor.service';
import * as angular from 'angular';
import {statusDescription, blocos} from '../../compartilhado/config';
import * as moment from 'moment';

export const historico: angular.IComponentOptions = {
  template: require('./historico.component.html'),
  controller: HistoricoController
};

HistoricoController.$inject = ['Editor'];

function HistoricoController(editor: Editor) {
  const $ctrl = this;

  $ctrl.$onInit = () => {

    const programas = editor.obterProgramas();

    programas.$watch(() => {
      $ctrl.programas = programas.map(programa => {
        return {
          dataEnvio: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
          status: statusDescription[programa.status],
          video: programa.video,
          instrucoes: programa.programa.map(i => `${blocos[i[0]][2]} - ${i[1]}º`).join(', ')
        };
      }).reverse();
    });
  };
}

