import * as firebaseService from './modulos/firebase-service';
import * as s3 from './modulos/s3';
import * as camera from './modulos/camera';
import * as braco from './modulos/braco';

const config = require('./../config.json');

import { Status } from '../../compartilhado/config';
import { validarPrograma } from '../../compartilhado/validador';

firebaseService.inicializar(config.firebase);
s3.inicializar(config.s3);
braco.inicializar(config.serial);

Promise
  .all([
    iniciarExecutor(),
    iniciarValidador()
  ])
  .catch(err => console.error(err));

async function iniciarExecutor() {
  while (true) {
    const snapshot = await firebaseService.obterProximoPrograma(Status.Validado);

    console.log('Iniciando: ', snapshot.key);

    await firebaseService.atualizarPrograma(snapshot, { status: Status.Executando });

    let nmArquivo = `videos/${snapshot.key}.ogv`;

    let ffmpeg = camera.iniciarGravacao(nmArquivo);

    await camera.delay(1000);

    await braco.executarPrograma(snapshot.val().programa);

    await camera.delay(1000);

    camera.finalizarGravacao(ffmpeg);

    let dsUrlS3 = await s3.enviarVideo(nmArquivo);

    await firebaseService.atualizarPrograma(snapshot, {
      status: Status.Finalizado,
      video: dsUrlS3
    });

    console.log('Finalizando: ', snapshot.key);
  }
}

async function iniciarValidador() {
  while (true) {
    const snapshot = await firebaseService.obterProximoPrograma(Status.Enviado);

    console.log('Validando: ', snapshot.val());


    try {
      validarPrograma(snapshot.val().programa);
      await firebaseService.atualizarPrograma(snapshot, { status: Status.Validado });
    } catch (e) {
      await firebaseService.atualizarPrograma(snapshot, {
        status: Status.Rejeitado,
        motivo: e
      });
    }
  }
}
