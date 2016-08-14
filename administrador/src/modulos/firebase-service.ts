import * as firebase from 'firebase';

enum Status {Enviado = 0, Validado = 1, Executado = 2}

interface IFirebaseConfig {
  serviceAccount: string,
  databaseURL: string
}

let ref;

export function inicializar(config: IFirebaseConfig) {
  firebase.initializeApp(config);
  ref = firebase.database().ref('/programas');
}

export async function obterProximoPrograma() {
  return ref.orderByChild("status").equalTo(Status.Validado).once('child_added');
}

export async function finalizarPrograma(snapshot: firebase.database.DataSnapshot, video) {
  return ref.child(snapshot.key).update({status: Status.Executado, video});
}
