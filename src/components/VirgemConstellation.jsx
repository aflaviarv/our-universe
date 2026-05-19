import { useEffect, useState } from 'react';

export function VirgemConstellation() {
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
        {/* O Path de Virgem corrigido de acordo com a imagem real:
            M 45 135   -> Começa na estrela super brilhante (Spica) na ponta inferior esquerda
            L 75 125   -> Sobe fazendo a primeira curva da perna
            L 95 135   -> Segunda curva do zigue-zague da perna
            L 115 110  -> Chega na base do tronco (quadril inferior)
            L 135 85   -> Sobe para a lateral direita do losango
            L 110 65   -> Sobe para o ombro superior direito
            L 95 85    -> Desce fechando o losango central do tronco
            L 115 110  -> Conecta de volta à base do tronco
            M 110 65   -> Volta para o ombro superior direito
            L 125 45   -> Estende o braço para a ponta superior direita
            M 95 85    -> Volta para a lateral esquerda do losango
            L 75 80    -> Ponto de partida do braço esquerdo longo
            L 55 90    -> Extensão do braço esquerdo
            L 30 100   -> Ponta final do braço esquerdo solto
            M 110 65   -> Ponto do ombro
            L 80 55    -> Linha da cabeça alta
            L 65 40    -> Ponta extrema superior esquerda */}
        <path
          className="constellation-path-live"
          d="
            M 45 135 L 75 125 L 95 135 L 115 110 L 135 85 L 110 65 L 95 85 L 115 110 
            M 110 65 L 125 45 
            M 95 85 L 75 80 L 55 90 L 30 100 
            M 110 65 L 80 55 L 65 40
          "
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* As 12 estrelas posicionadas nos eixos verticais e horizontais corretos */}
        {/* Perna e Base de Baixo (Esquerda para a Direita) */}
        <circle cx="45" cy="135" r="5.5" fill="#ffffff" className="draw-star-live" style={{ filter: 'drop-shadow(0 0 5px #fff)' }} /> {/* Spica (A mais brilhante na ponta inferior esquerda) */}
        <circle cx="75" cy="125" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="95" cy="135" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="115" cy="110" r="4" fill="#ffffff" className="draw-star-live" /> {/* Quadril Inferior */}

        {/* Losango Central do Tronco */}
        <circle cx="135" cy="85" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="95" cy="85" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="110" cy="65" r="4" fill="#ffffff" className="draw-star-live" /> {/* Ombro Superior */}

        {/* Braço Direito Alto */}
        <circle cx="125" cy="45" r="4.5" fill="#ffffff" className="draw-star-live" style={{ filter: 'drop-shadow(0 0 3px #fff)' }} /> 

        {/* Cabeça / Extremidade Superior Esquerda */}
        <circle cx="80" cy="55" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="65" cy="40" r="3.5" fill="#ffffff" className="draw-star-live" />

        {/* Braço Esquerdo Longo (Estendendo para fora) */}
        <circle cx="75" cy="80" r="2.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="55" cy="90" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="30" cy="100" r="4" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}