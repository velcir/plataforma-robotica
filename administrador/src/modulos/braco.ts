//import * as sp from 'serialport';
import sp from './fake-serialport';

let serialPort;

export function inicializar(serial) {
  serialPort = new sp(serial, {
    baudrate: 9600,
    parser: sp.parsers.readline('\n')
  });
}

export async function executarPrograma(programa) {
  for (let instrucoes of programa) {
    console.log(instrucoes);
    instrucoes = obterInstrucoesArduino(instrucoes);
    console.log(instrucoes);
    await escreverNaSerial(instrucoes);
    await lerRetornoSerial();
  }
}

function escreverNaSerial(instrucoes) {
  return Promise.all(instrucoes.map(instrucao => {
    return new Promise((resolve, reject) => {
      serialPort.write((instrucao + ''), err => {
        if (err) reject();
        else resolve();
      });
    });
  }));
}

function lerRetornoSerial() {
  return new Promise((resolve, reject) => {
    const fn = data => {
      if ((data || '').trim() === 'p') {
        resolve(data);
      } else {
        reject('sem retorno');
      }

      serialPort.off('data', fn)
    };

    serialPort.on('data', fn);
  });
}

function obterInstrucoesArduino(instrucao) {
  switch (instrucao[0]) {
    case 'girar_base_esquerda':
      return [2, '+', instrucao[1]];
    case 'girar_base_direita':
      return [2, '-', instrucao[1]];
    case 'girar_ombro_frente':
      return [4, '+', instrucao[1]];
    case 'girar_ombro_tras':
      return [4, '-', instrucao[1]];
    case 'girar_cotovelo_cima':
      return [6, '+', instrucao[1]];
    case 'girar_cotovelo_baixo':
      return [6, '-', instrucao[1]];
    case 'girar_punho_frente':
      return [8, '-', instrucao[1]];
    case 'girar_punho_tras':
      return [8, '+', instrucao[1]];
    case 'abrir_garra':
      return [10, '+', instrucao[1]];
    case 'fechar_garra':
      return [10, '+', instrucao[1]];
  }
}
