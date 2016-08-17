import * as firebase from 'firebase';
import {join} from 'path';

interface IFirebaseConfig {
  serviceAccount: string;
  databaseURL: string;
}

interface IDados {
  status?: number;
  video?: string;
}

function programas(key?: string) {
  return firebase.database().ref(join('programas', key || ''));
}

function historico(key?: string) {
  return firebase.database().ref(join('historico', key || ''));
}

export function inicializar(config: IFirebaseConfig) {
  firebase.initializeApp(config);
}

export async function obterProximoPrograma(status: number) {
  return programas().orderByChild('status').equalTo(status).once('child_added');
}

export async function atualizarPrograma(snapshot, dados: IDados) {
  const [key, programa] = [snapshot.key, snapshot.val()];
  const update = Object.assign(programa, dados);

  return Promise.all([
    programas(key).update(update),
    historico(join(programa.usuario, key)).update(update)
  ]);
}

