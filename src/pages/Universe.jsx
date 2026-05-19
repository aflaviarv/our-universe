// src/pages/Universe.jsx
import { memories } from '../data/memories';

export function Universe() {
  return (
    <div className="universe-container">
      {/* Aqui nós iteramos sobre o nosso array de dados */}
      {memories.map((memory) => (
        <div key={memory.id} className="star-placeholder">
          {/* Por enquanto, apenas imprimimos o título da memória na tela para testar */}
          <p>{memory.title}</p>
        </div>
      ))}
    </div>
  );
}