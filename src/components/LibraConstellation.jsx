import { useEffect, useState } from 'react';

export function LibraConstellation() {
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
        {/* O Path Corrigido de Libra seguindo a imagem de referência:
            M 95 30   -> Estrela mais alta do topo (Zubeneschamali)
            L 145 55  -> Linha para a direita alta
            L 155 125 -> Desce para a direita média (Zubenelgenubi)
            L 95 30   -> Fecha o triângulo superior conectando de volta ao topo
            M 155 125 -> Volta para a estrela média da direita
            L 120 170 -> Linha que desce para o pé inferior 1
            L 125 185 -> Ponta final do pé inferior 2
            M 95 30   -> Volta para o topo mais alto
            L 85 80   -> Desce pela linha da esquerda
            L 50 100  -> Continua descendo à esquerda
            L 65 115  -> Dobra da bifurcação esquerda
            M 50 100  -> Ponto da bifurcação esquerda
            L 35 105  -> Ponta solta final da esquerda */}
        <path
          className="constellation-path-live"
          d="
            M 95 30 L 145 55 L 155 125 L 95 30 
            M 155 125 L 120 170 L 125 185 
            M 95 30 L 85 80 L 50 100 L 65 115 
            M 50 100 L 35 105
          "
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Nós das Estrelas posicionados exatamente como na imagem */}
        <circle cx="95" cy="30" r="4.5" fill="#ffffff" className="draw-star-live" />  {/* Estrela do topo mais alta */}
        <circle cx="145" cy="55" r="3.5" fill="#ffffff" className="draw-star-live" /> 
        <circle cx="155" cy="125" r="4" fill="#ffffff" className="draw-star-live" />   {/* Nó de junção da direita */}
        
        {/* Cauda inferior direita */}
        <circle cx="120" cy="170" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="125" cy="185" r="3" fill="#ffffff" className="draw-star-live" />
        
        {/* Braço descendente esquerdo e bifurcação */}
        <circle cx="85" cy="80" r="3.5" fill="#ffffff" className="draw-star-live" />
        <circle cx="50" cy="100" r="3.5" fill="#ffffff" className="draw-star-live" />  {/* Vértice esquerdo */}
        <circle cx="65" cy="115" r="3" fill="#ffffff" className="draw-star-live" />
        <circle cx="35" cy="105" r="2.5" fill="#ffffff" className="draw-star-live" />
      </svg>
    </div>
  );
}