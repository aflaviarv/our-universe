import { useEffect, useState } from 'react';

export function AquarioConstellation() {
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
        {/* O Desenho de Aquário adaptado para a caixa de 200x200:
            M 50 80   -> Começa no braço esquerdo (Sadachbia)
            L 80 70   -> Até a estrela central alta (Sadalmelik)
            L 100 90  -> Até o centro da jarra (Sadalsuud)
            L 140 80  -> Extensão para o braço direito (Ancha)
            L 165 105 -> Ponta extrema direita
            M 100 90  -> Volta para a jarra
            L 90 130  -> Início do fluxo de água descendo
            L 110 160 -> Curva da água (Skat)
            L 150 150 -> Fim do fluxo */}
        <path
          className="constellation-path-live"
          d="M 50 80 L 80 70 L 100 90 L 140 80 L 165 105 M 100 90 L 90 130 L 110 160 L 150 150"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* As estrelas principais nos nós do fluxo de Aquário */}
        <circle cx="50" cy="80" r="3" fill="#ffffff" className="draw-star-live" />    {/* Sadachbia */}
        <circle cx="80" cy="70" r="3.5" fill="#ffffff" className="draw-star-live" />  {/* Sadalmelik */}
        <circle cx="100" cy="90" r="3.5" fill="#ffffff" className="draw-star-live" /> {/* Sadalsuud */}
        <circle cx="140" cy="80" r="3" fill="#ffffff" className="draw-star-live" />    {/* Ancha */}
        <circle cx="165" cy="105" r="3" fill="#ffffff" className="draw-star-live" />   
        <circle cx="90" cy="130" r="2.5" fill="#ffffff" className="draw-star-live" /> 
        <circle cx="110" cy="160" r="3" fill="#ffffff" className="draw-star-live" />   {/* Skat */}
        <circle cx="150" cy="150" r="2.5" fill="#ffffff" className="draw-star-live" /> 
      </svg>
    </div>
  );
}