// src/universe.config.js

export const UNIVERSE_CONFIG = {
  // Configurações da tela inicial (Home)
  home: {
    title: "Sua frase principal aqui.",
    subtitle: "Sua frase secundária aqui.",
    buttonText: "Entrar no nosso universo"
  },

  // Banco de dados das memórias e posições das estrelas
  // O usuário pode adicionar quantas quiser seguindo este padrão
  memories: [
    {
      id: 1,
      date: "01/01/2026",
      title: "Primeira Memória Exemplo",
      text: "Texto da sua primeira memória aqui. Explique o que aconteceu neste dia.",
      position: { top: "30%", left: "25%" } // Posição da estrela na tela
    },
    {
      id: 2,
      date: "14/02/2026",
      title: "Segunda Memória Exemplo",
      text: "Texto da sua segunda memória aqui. Explique o que aconteceu neste dia.",
      position: { top: "60%", left: "70%" }
    }
  ]
};