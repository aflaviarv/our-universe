import { useEffect, useState } from 'react';

export function GemeosConstellation() {
  const [constellation, setConstellation] = useState(null);

  useEffect(() => {
    const generateNewConstellation = () => {
      setConstellation({
        key: Date.now(), 
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`,
        scale: Math.random() * 0.4 + 0.4,
        rotation: Math.random() * 360,
      });
    };

    generateNewConstellation();

    const interval = setInterval(() => {
      generateNewConstellation();
    }, 6000); 

    return () => clearInterval(interval);
  }, []);

  if (!constellation) return null;

  return (
    <div className="constellation-layer">
      <svg
        key={constellation.key} 
        className="cancer-svg-live"
        style={{
          top: constellation.top,
          left: constellation.left,
          transform: `scale(${constellation.scale}) rotate(${constellation.rotation}deg)`,
        }}
        width="200"
        height="200"
        viewBox="0 0 200 200"
      >
        {/* O Path Real de Gêmeos baseado na imagem:
            M 50 65   -> Começa na estrela do meio à esquerda
            L 65 35   -> Sobe até a ponta superior esquerda (Castor)
            L 90 33   -> Vai para a ponta superior direita (Pollux)
            L 140 70  -> Desce pela diagonal direita longa
            L 175 80  -> Ponta saliente da direita
            L 155 88  -> Volta para o corpo principal
            L 140 120 -> Continua descendo até a base direita
            L 140 145 -> Desce reto para o "pé" da ponta inferior
            M 140 120 -> Volta para a junção da base
            L 100 110 -> Sobe pela linha inferior voltando para a esquerda
            L 75 100  -> Estrela do meio inferior
            L 52 90   -> Estrela inferior esquerda
            L 50 65   -> Fecha o contorno na estrela inicial */}
        <path
          className="constellation-path-live"
          d="M 50 65 L 65 35 L 90 33 L 140 70 L 175 80 L 155 88 L 140 120 L 140 145 M 140 120 L 100 110 L 75 100 L 52 90 L 50 65"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* As 11 estrelas posicionadas exatamente nos nós do contorno da imagem */}
        <circle cx="50" cy="65" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="65" cy="35" r="3.5" fill="#ffffff" className="draw-star-live" />  {/* Castor */}
        <circle cx="90" cy="33" r="4" fill="#ffffff" className="draw-star-live" />     {/* Pollux */}
        <circle cx="140" cy="70" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="175" cy="80" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="155" cy="88" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="140" cy="120" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="140" cy="145" r="3" fill="#ffffff" className="draw-star-live" />  {/* Ponta de baixo */}
        <circle cx="100" cy="110" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="75" cy="100" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="52" cy="90" r="3" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}