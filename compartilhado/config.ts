export enum Status {
  Enviado = 0,
  Validado = 1,
  Rejeitado = 2,
  Executando = 3,
  Finalizado = 4
}

export enum Cores {
  Verde = 130,
  Azul = 220,
  Vermelho = 15,
  Rosa = 300,
  Amarelo = 65
}

export const blocos = {
  girar_base_esquerda: [30, Cores.Verde, 'Girar base p/ esquerda'],
  girar_base_direita: [30, Cores.Verde, 'Girar base p/ direita'],
  girar_ombro_frente: [10, Cores.Azul, 'Girar ombro p/ frente'],
  girar_ombro_tras: [10, Cores.Azul, 'Girar ombro p/ tras'],
  girar_cotovelo_cima: [20, Cores.Vermelho, 'Girar cotovelo p/ frente'],
  girar_cotovelo_baixo: [20, Cores.Vermelho, 'Girar cotovelo p/ tras'],
  girar_punho_frente: [10, Cores.Rosa, 'Girar punho p/ frente'],
  girar_punho_tras: [10, Cores.Rosa, 'Girar punho p/ tras'],
  abrir_garra: [25, Cores.Amarelo, 'Abrir a garra'],
  fechar_garra: [25, Cores.Amarelo, 'Fechar a garra'],
};

export const instrucoes = {
  girar_base_esquerda: [2, '+'],
  girar_base_direita: [2, '-'],
  girar_ombro_frente: [4, '+'],
  girar_ombro_tras: [4, '-'],
  girar_cotovelo_cima: [6, '+'],
  girar_cotovelo_baixo: [6, '-'],
  girar_punho_frente: [8, '+'],
  girar_punho_tras: [8, '-'],
  abrir_garra: [10, '+'],
  fechar_garra: [10, '-'],
};
