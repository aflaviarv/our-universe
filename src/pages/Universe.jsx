// src/pages/Universe.jsx
import { useState } from 'react';
import { Star } from '../components/Star.jsx';
import { MemoryModal } from '../components/MemoryModal.jsx';
import { encodeUniverse } from '../utils/urlParser.js';

// Importação das Constelações
import { AriesConstellation } from '../components/AriesConstellation.jsx';
import { TouroConstellation } from '../components/TouroConstellation.jsx';
import { GemeosConstellation } from '../components/GemeosConstellation.jsx';
import { CancerConstellation } from '../components/CancerConstellation.jsx';
import { LeaoConstellation } from '../components/LeaoConstellation.jsx';
import { VirgemConstellation } from '../components/VirgemConstellation.jsx';
import { LibraConstellation } from '../components/LibraConstellation.jsx';
import { EscorpiaoConstellation } from '../components/EscorpiaoConstellation.jsx';
import { SagitarioConstellation } from '../components/SagitarioConstellation.jsx';
import { CapricornioConstellation } from '../components/CapricornioConstellation.jsx';
import { AquarioConstellation } from '../components/AquarioConstellation.jsx';
import { PeixesConstellation } from '../components/PeixesConstellation.jsx';

export function Universe({ memories, isViewingMode, constellation, onChangeConstellation, onUpdateMemories }) {
  const [generatedLink, setGeneratedLink] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);

  const handleCanvasClick = (e) => {
    if (isViewingMode) return;

    if (
      e.target.closest('.star') || 
      e.target.closest('.admin-panel') || 
      e.target.closest('.modal-content') ||
      e.target.closest('.constellation-selector')
    ) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const title = prompt("Digite o título da memória:");
    if (!title) return;

    const date = prompt("Digite a data (ex: 12/06/2026):");
    const text = prompt("Escreva a sua memória:");

    const newMemory = {
      id: Date.now(),
      date: date || "",
      title: title,
      text: text || "",
      position: { top: `${y}%`, left: `${x}%` }
    };

    onUpdateMemories([...memories, newMemory]);
  };

  const handleGenerateLink = () => {
    const currentData = {
      home: { title: "Anatheus", subtitle: "Sua história eternizada entre estrelas." },
      constellation: constellation,
      memories: memories
    };

    const code = encodeUniverse(currentData);
    const link = `${window.location.origin}${window.location.pathname}?u=${code}`;
    setGeneratedLink(link);
    navigator.clipboard.writeText(link);
    alert("Link do universo personalizado copiado!");
  };

  return (
    <div className="universe-container" onClick={handleCanvasClick}>
      
      {/* Constelação Dinâmica */}
      {constellation === 'aries' && <AriesConstellation />}
      {constellation === 'touro' && <TouroConstellation />}
      {constellation === 'gemeos' && <GemeosConstellation />}
      {constellation === 'cancer' && <CancerConstellation />}
      {constellation === 'leao' && <LeaoConstellation />}
      {constellation === 'virgem' && <VirgemConstellation />}
      {constellation === 'libra' && <LibraConstellation />}
      {constellation === 'escorpiao' && <EscorpiaoConstellation />}
      {constellation === 'sagitario' && <SagitarioConstellation />}
      {constellation === 'capricornio' && <CapricornioConstellation />}
      {constellation === 'aquario' && <AquarioConstellation />}
      {constellation === 'peixes' && <PeixesConstellation />}

      {/* Estrelas */}
      {memories.map((memory) => (
        <Star key={memory.id} memory={memory} onClick={(m) => setSelectedMemory(m)} />
      ))}

      {selectedMemory && (
        <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
      )}

      {/* Painel Administrativo */}
      {!isViewingMode && (
        <div className="admin-panel">
          <div className="admin-header">
            <p>Anatheus Engine — Modo Criador</p>
          </div>

          <div className="constellation-selector">
            <label htmlFor="constellation-select">Constelação: </label>
            <select 
              id="constellation-select"
              value={constellation} 
              onChange={(e) => onChangeConstellation(e.target.value)}
            >
              <option value="aries">Áries</option>
              <option value="touro">Touro</option>
              <option value="gemeos">Gémeos</option>
              <option value="cancer">Câncer</option>
              <option value="leao">Leão</option>
              <option value="virgem">Virgem</option>
              <option value="libra">Libra</option>
              <option value="escorpiao">Escorpião</option>
              <option value="sagitario">Sagitário</option>
              <option value="capricornio">Capricórnio</option>
              <option value="aquario">Aquário</option>
              <option value="peixes">Peixes</option>
            </select>
          </div>

          <button className="btn-generate" onClick={handleGenerateLink}>
            Gerar Link do Presente
          </button>
          
          {generatedLink && (
            <input type="text" readOnly value={generatedLink} onClick={(e) => e.target.select()} />
          )}
        </div>
      )}
    </div>
  );
}