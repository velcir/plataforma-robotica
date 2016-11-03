import * as firebaseService from './modulos/firebase-service';
import * as s3 from './modulos/s3';
import * as camera from './modulos/camera';
import * as braco from './modulos/braco';

const config = require('./../config.json');

import {Status} from '../../interface/src/compartilhado/config';

firebaseService.inicializar(config.firebase);
s3.inicializar(config.s3);
braco.inicializar(config.serial);

iniciarExecutor().catch(err => console.error(err));

async function iniciarExecutor() {
  while (true) {
    const snapshot = await firebaseService.obterProximoPrograma(Status.Validado);

    console.log('Iniciando: ', snapshot.key);

    await firebaseService.atualizarPrograma(snapshot, {status: Status.Executando});

    let nmArquivo = `videos/${snapshot.key}.ogv`;

    let ffmpeg = camera.iniciarGravacao(nmArquivo);

    await camera.delay(1000);
    console.log('finalizou execucao');

    await braco.executarPrograma(snapshot.val().programa);

    await camera.delay(1000);

    camera.finalizarGravacao(ffmpeg);
    console.log('finalizou gravacao');

    let dsUrlS3 = await s3.enviarVideo(nmArquivo);
    console.log('enviou video');
    
    await firebaseService.atualizarPrograma(snapshot, {
      status: Status.Finalizado,
      video: dsUrlS3
    });

    console.log('Finalizando: ', snapshot.key);
  }
}
