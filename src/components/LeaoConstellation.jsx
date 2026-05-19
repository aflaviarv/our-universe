import { useEffect, useState } from 'react';

export function LeaoConstellation() {
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
    const interval = setInterval(() => { generateNewConstellation(); }, 6000); 
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
        {/* O Path Corrigido de Leão baseado na imagem de referência:
            M 35 125   -> Começa na cauda na extrema esquerda (Denebola)
            L 85 85    -> Sobe para o lombo superior esquerdo
            L 85 122   -> Desce reto para a pata traseira
            L 35 125   -> Fecha o triângulo da cauda
            M 85 85    -> Volta para o lombo superior esquerdo
            L 155 92   -> Segue a linha das costas até o pescoço
            L 158 55   -> Sobe verticalmente para a base da juba
            L 185 35   -> Curva para o topo da cabeça
            L 195 52   -> Desce para o focinho
            M 155 92   -> Volta para o pescoço
            L 170 150  -> Desce para o peito/pata dianteira (Regulus)
            L 85 122   -> Fecha a linha da barriga conectando à pata traseira */}
        <path
          className="constellation-path-live"
          d="
            M 35 125 L 85 85 L 85 122 L 35 125 
            M 85 85 L 155 92 L 158 55 L 185 35 L 195 52 
            M 155 92 L 170 150 L 85 122
          "
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* As 9 estrelas posicionadas exatamente como na imagem de referência */}
        {/* Triângulo Traseiro / Cauda */}
        <circle cx="35" cy="125" r="4" fill="#ffffff" className="draw-star-live" />   {/* Denebola */}
        <circle cx="85" cy="85" r="4" fill="#ffffff" className="draw-star-live" />    
        <circle cx="85" cy="122" r="3.5" fill="#ffffff" className="draw-star-live" /> 

        {/* Corpo e Peito */}
        <circle cx="155" cy="92" r="3.5" fill="#ffffff" className="draw-star-live" />  {/* Pescoço */}
        <circle cx="170" cy="150" r="5" fill="#ffffff" className="draw-star-live" style={{ filter: 'drop-shadow(0 0 4px #fff)' }} />  {/* Regulus (A mais brilhante embaixo) */}

        {/* Foice da Cabeça / Juba (Subindo à direita) */}
        <circle cx="158" cy="55" r="3.5" fill="#ffffff" className="draw-star-live" /> 
        <circle cx="185" cy="35" r="4" fill="#ffffff" className="draw-star-live" />    {/* Topo da cabeça */}
        <circle cx="195" cy="52" r="3" fill="#ffffff" className="draw-star-live" />    {/* Focinho */}
      </svg>
    </div>
  );
}