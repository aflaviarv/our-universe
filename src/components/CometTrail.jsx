import { useEffect } from 'react';

export function CometTrail() {
  useEffect(() => {
    // 1. Cria a Estrela Fixa do Ponteiro
    const cursorStar = document.createElement('div');
    cursorStar.className = 'cursor-star';
    document.body.appendChild(cursorStar);

    let lastDrawTime = 0; // Variável para controlar a velocidade do rastro

    const createDust = (x, y) => {
      const dust = document.createElement('div');
      dust.className = 'comet-dust';
      
      dust.style.left = `${x}px`;
      dust.style.top = `${y}px`;
      dust.style.setProperty('--spread-x', `${(Math.random() - 0.5) * 80}px`);
      dust.style.setProperty('--spread-y', `${(Math.random() - 0.5) * 80}px`);

      document.body.appendChild(dust);

      setTimeout(() => {
        if (document.body.contains(dust)) {
          document.body.removeChild(dust);
        }
      }, 600);
    };

    const handleMouseMove = (e) => {
      // A estrela principal atualiza a posição imediatamente
      cursorStar.style.left = `${e.clientX}px`;
      cursorStar.style.top = `${e.clientY}px`;

      const now = Date.now();
      // O rastro só é criado se tiver passado 30ms desde a última bolinha
      // Isso impede que o navegador engasgue com milhares de divs invisíveis
      if (now - lastDrawTime > 30) {
        createDust(e.clientX, e.clientY);
        lastDrawTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(cursorStar)) {
        document.body.removeChild(cursorStar);
      }
    };
  }, []);

  return null;
}