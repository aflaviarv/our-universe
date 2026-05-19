import { useEffect, useState } from 'react';

export function CancerConstellation() {
  const [constellation, setConstellation] = useState(null);

  useEffect(() => {
    const generateNewConstellation = () => {
      setConstellation({
        key: Date.now(), 
        top: `${Math.random() * 70 + 15}%`, // Margem de segurança para não cortar nas bordas
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
        {/* O Path Real de Câncer:
            M 100 100 -> Começa no centro (Asellus Australis)
            L 60 50   -> Linha até a estrela superior esquerda (Asellus Borealis)
            L 40 20   -> Linha até a ponta superior esquerda (Tegmine)
            M 100 100 -> Volta para o centro
            L 110 150 -> Linha até a dobra inferior (Altarf)
            M 100 100 -> Volta para o centro
            L 160 90  -> Linha até a ponta direita (Acubens) */}
        <path
          className="constellation-path-live"
          d="M 100 100 L 60 50 L 40 20 M 100 100 L 110 150 M 100 100 L 160 90"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* As 5 estrelas principais nos nós exatos do desenho */}
        <circle cx="100" cy="100" r="3.5" fill="#ffffff" className="draw-star-live" /> {/* Asellus Australis */}
        <circle cx="60" cy="50" r="3" fill="#ffffff" className="draw-star-live" />   {/* Asellus Borealis */}
        <circle cx="40" cy="20" r="3" fill="#ffffff" className="draw-star-live" />   {/* Tegmine */}
        <circle cx="110" cy="150" r="3.5" fill="#ffffff" className="draw-star-live" /> {/* Altarf */}
        <circle cx="160" cy="90" r="3" fill="#ffffff" className="draw-star-live" />   {/* Acubens */}
      </svg>
    </div>
  );
}