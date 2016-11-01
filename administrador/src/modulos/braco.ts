 import * as SerialPort from 'serialport';
//import {FakeSerialPort as SerialPort} from './fake-serialport';
import {instrucoes} from '../../../compartilhado/config';

let serialPort;

export function inicializar(serial) {
  serialPort = new SerialPort(serial, {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\n')
  });
}

export async function executarPrograma(programa) {
  for (const [instrucao, valor] of programa) {
    console.log(instrucao, valor);
    const instrucoesArduino = [...instrucoes[instrucao], valor];
    console.log(instrucoesArduino);
    await escreverNaSerial(instrucoesArduino);
    await lerRetornoSerial();
  }

  await escreverNaSerial(instrucoes.fim);
  await lerRetornoSerial();
}

function escreverNaSerial(instrucoes) {
  return Promise.all(instrucoes.map(instrucao => {
    return new Promise((resolve, reject) => {
      serialPort.write((instrucao + ''), e => e ? reject(e) : resolve(e));
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
    };

    serialPort.once('data', fn);
  });
}
