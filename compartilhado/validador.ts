import { Servos, instrucoes, blocos } from './config';

const POSICAO_BASE = 97;
const POSICAO_PUNHO = 70;
const POSICAO_COTOVELO = 15;
const POSICAO_OMBRO = 97;
const POSICAO_GARRA = 50;

const LIMITES = {
  [Servos.Base]: [25, 160],
  [Servos.Punho]: [40, 120],
  [Servos.Cotovelo]: [15, 90],
  [Servos.Ombro]: [20, 120],
  [Servos.Garra]: [50, 70]
};

export function validarPrograma(programa: [[string, number]]) {
  const posicoes = {
    [Servos.Base]: POSICAO_BASE,
    [Servos.Punho]: POSICAO_PUNHO,
    [Servos.Cotovelo]: POSICAO_COTOVELO,
    [Servos.Ombro]: POSICAO_OMBRO,
    [Servos.Garra]: POSICAO_GARRA
  };

  programa.map(validarInstrucao);

  function validarInstrucao([instrucao, valor], index) {
    const [servo, sinal] = instrucoes[instrucao];

    if (sinal === '+') {
      posicoes[servo] += valor;
    } else {
      posicoes[servo] += valor;
    }

    if (posicoes[servo] < LIMITES[servo][0] || posicoes[servo] > LIMITES[servo][1]) {
      throw new Error(
        `A instrução nº ${index + 1} ${blocos[instrucao][2]} com valor ` +
        `${valor} ultrapassou os limites permitidos!`
      );
    }
  }
}
