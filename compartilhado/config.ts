export enum Status {
  Enviado = 0,
  Validado = 1,
  Rejeitado = 2,
  Executando = 3,
  Finalizado = 4
}

export const statusDescription = {
  [Status.Enviado]: 'Aguardando validação',
  [Status.Validado]: 'Na fila para execução',
  [Status.Rejeitado]: 'Inválido p/ execução',
  [Status.Executando]: 'Em execução',
  [Status.Finalizado]: 'Executado'
};

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

export enum Servos {
  Base = 12,
  Ombro = 8,
  Cotovelo = 6,
  Punho = 4,
  Garra = 2
}

export const instrucoes = {
  girar_base_esquerda: [Servos.Base, '+'],
  girar_base_direita: [Servos.Base, '-'],
  girar_ombro_frente: [Servos.Ombro, '+'],
  girar_ombro_tras: [Servos.Ombro, '-'],
  girar_cotovelo_cima: [Servos.Cotovelo, '+'],
  girar_cotovelo_baixo: [Servos.Cotovelo, '-'],
  girar_punho_frente: [Servos.Punho, '+'],
  girar_punho_tras: [Servos.Punho, '-'],
  abrir_garra: [Servos.Garra, '+'],
  fechar_garra: [Servos.Garra, '-'],
  fim: [19]
};
