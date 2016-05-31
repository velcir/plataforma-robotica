var Firebase = require('firebase');

var ref = new Firebase("https://plataforma-robotica.firebaseio.com");

login();
ref.offAuth(login);

function login() {
  ref.authWithPassword({email: 'admin@admin.com', password: '4dm1n'});
}

ref.onAuth((authData) => {
  if (authData) {
    ref.child('programas').push({
      usuario: 'facebook:826707294093603',
      programa: [
        ['girar_esquerda', 20],
        ['mover_frente', 10],
        ['mover_baixo', 5],
        ['fechar_pinca'],
        ['mover_cima', 2],
        ['mover_tras', 3],
        ['girar_direita', 45],
        ['abrir_pinca']
      ]
    }, () => process.exit());
  }
});
