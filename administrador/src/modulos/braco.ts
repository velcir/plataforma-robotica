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
    case 'girar_esquerda':
      return [2, '+', instrucao[1]];
    case 'girar_direita':
      return [2, '-', instrucao[1]];
    case 'abrir_pinca':
      return [4, '+', 30];
    case 'fechar_pinca':
      return [4, '-', 30];
    case 'mover_frente':
      return [8, '+', instrucao[1]];
    case 'mover_baixo':
      return [12, '-', instrucao[1]];
    case 'mover_tras':
      return [8, '-', instrucao[1]];
    case 'mover_cima':
      return [12, '+', instrucao[1]];
  }
}
