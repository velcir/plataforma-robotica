import { Servos, instrucoes, blocos } from './config';

const POSICAO_BASE = 97;
const POSICAO_PUNHO = 70;
const POSICAO_COTOVELO = 15;
const POSICAO_OMBRO = 90;
const POSICAO_GARRA = 50;

const LIMITES = {
  [Servos.Base]: [25, 160],
  [Servos.Punho]: [40, 120],
  [Servos.Cotovelo]: [15, 90],
  [Servos.Ombro]: [20, 140],
  [Servos.Garra]: [30, 90]
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
      posicoes[servo] -= valor;
    }

    if (posicoes[servo] < LIMITES[servo][0] || posicoes[servo] > LIMITES[servo][1]) {
      throw (
        `A instrução nº ${index + 1} ${blocos[instrucao][2]} com valor ` +
        `${valor} ultrapassou os limites permitidos!`
      );
    }

    /* Laterais */
    if (
      posicoes[Servos.Base] < 55 &&
      (posicoes[Servos.Punho] < 90 && posicoes[Servos.Cotovelo] < 25)
    ) {
      throw (
        `1A instrução nº ${index + 1} ${blocos[instrucao][2]} com valor ` +
        `${valor} ultrapassou os limites permitidos, braço pode colidir na ` +
        `cesta, levante um pouco o cotovelo ou o punho!`
      );
    }

    /* Argola */
    if (
      (posicoes[Servos.Base] > 110 && posicoes[Servos.Base] < 140) &&
      posicoes[Servos.Ombro] < 90
    ) {
      throw (
        `A instrução nº ${index + 1} ${blocos[instrucao][2]} com valor ` +
        `${valor} ultrapassou os limites permitidos, braço pode colidir na ` +
        `argola, levante um pouco o cotovelo ou o punho!`
      );
    }

    /* Solo */
    if (
      posicoes[Servos.Ombro] > 120 &&
      (posicoes[Servos.Cotovelo] < 25 && posicoes[Servos.Punho] < 110)
    ) {
      throw (
        `A instrução nº ${index + 1} ${blocos[instrucao][2]} com valor ` +
        `${valor} ultrapassou os limites permitidos, braço pode colidir com o ` +
        `cotovelo, levante um pouco o Ombro e o Cotovelo ou o Punho!`
      );
    }

    /* Cesta */
    if (
      (posicoes[Servos.Base] < 55 && posicoes[Servos.Base] > 30) &&
      (posicoes[Servos.Ombro] < 90 && posicoes[Servos.Cotovelo] < 25)
    ) {
      throw (
        `A instrução nº ${index + 1} ${blocos[instrucao][2]} com valor ` +
        `${valor} ultrapassou os limites permitidos, braço pode colidir com a ` +
        `cesta, levante um pouco o Ombro ou o Cotovelo!`
      );
    }
  }
}
