import {join} from 'path';

import * as firebaseService from './modulos/firebase-service';
import * as s3 from './modulos/s3';
import * as camera  from './modulos/camera';
import * as braco from './modulos/braco';

const config = require('./../config.json');

firebaseService.inicializar(config.firebase);
s3.inicializar(config.s3);
braco.inicializar(config.serial);

iniciarExecutor().catch(err => console.error(err));

async function iniciarExecutor() {
  let snapshot;
  while (snapshot = await firebaseService.obterProximoPrograma()) {

    console.log('Iniciando: ', snapshot.key);

    let nmArquivo = `videos/${snapshot.key}.ogv`;
    let dsCaminho = join(__dirname, '..', nmArquivo);

    let ffmpeg = camera.iniciarGravacao(dsCaminho);

    await camera.delay(500);

    await braco.executarPrograma(snapshot.val().programa);

    await camera.delay(500);

    camera.finalizarGravacao(ffmpeg);

    let dsUrlS3 = await s3.enviarVideo(dsCaminho, nmArquivo);

    await firebaseService.finalizarPrograma(snapshot, dsUrlS3);

    console.log('Finalizando: ', snapshot.key);
  }
}
