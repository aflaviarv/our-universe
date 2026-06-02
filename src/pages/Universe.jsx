// src/pages/Universe.jsx
import { useState, useEffect } from 'react';
import { Star } from '../components/Star.jsx';
import { MemoryModal } from '../components/MemoryModal.jsx';
import { GuideModal } from '../components/GuideModal.jsx';
import { encodeUniverse } from '../utils/urlParser.js';

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

export function Universe({ memories, isViewingMode, constellation, onChangeConstellation, onUpdateMemories, onGoBack, isGiftLink, initialBgMusic = '', initialMusicStart = '' }) {
  const [generatedLink, setGeneratedLink] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [creatingPosition, setCreatingPosition] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  // Estados da Música
  const [showMusicConfig, setShowMusicConfig] = useState(false);
  const [bgMusic, setBgMusic] = useState(initialBgMusic);
  const [musicStart, setMusicStart] = useState(initialMusicStart);
  const [hasInteracted, setHasInteracted] = useState(false);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY; 

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Transforma formato humano "1:15" em "75" segundos automaticamente
  const parseStartSeconds = (str) => {
    if (!str) return 0;
    const parts = String(str).split(':');
    if (parts.length === 2) {
      return (parseInt(parts[0], 10) * 60) + (parseInt(parts[1], 10) || 0);
    }
    return parseInt(str, 10) || 0;
  };

  useEffect(() => {
    const handleInteraction = () => setHasInteracted(true);
    document.addEventListener('click', handleInteraction, { once: true });
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isViewingMode && memories.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [memories, isViewingMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (creatingPosition) setCreatingPosition(null);
        if (showMusicConfig) setShowMusicConfig(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [creatingPosition, showMusicConfig]);

  useEffect(() => {
    if (!isViewingMode && memories.length === 0) {
      const savedMemories = localStorage.getItem('anatheus_draft_memories');
      const savedConstellation = localStorage.getItem('anatheus_draft_constellation');
      const savedMusic = localStorage.getItem('anatheus_draft_music');
      const savedMusicStart = localStorage.getItem('anatheus_draft_music_start');

      if (savedMemories && savedMemories !== "[]") {
        try {
          onUpdateMemories(JSON.parse(savedMemories));
          if (savedConstellation) onChangeConstellation(savedConstellation);
          if (savedMusic) setBgMusic(savedMusic);
          if (savedMusicStart) setMusicStart(savedMusicStart);
        } catch (e) {
          console.error("Erro ao ler o rascunho", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isViewingMode) {
      localStorage.setItem('anatheus_draft_memories', JSON.stringify(memories));
      localStorage.setItem('anatheus_draft_constellation', constellation);
      localStorage.setItem('anatheus_draft_music', bgMusic);
      localStorage.setItem('anatheus_draft_music_start', musicStart);
    }
  }, [memories, constellation, bgMusic, musicStart, isViewingMode]);

  const handleClearDraft = () => {
    if (window.confirm("Tem certeza de que quer apagar todas as estrelas e começar de novo?")) {
      onUpdateMemories([]); 
      setBgMusic('');
      setMusicStart('');
      localStorage.removeItem('anatheus_draft_memories');
      localStorage.removeItem('anatheus_draft_constellation');
      localStorage.removeItem('anatheus_draft_music');
      localStorage.removeItem('anatheus_draft_music_start');
    }
  };

  const handleDeleteMemory = (id) => {
    if (window.confirm("Tem certeza de que quer apagar esta estrela?")) {
      const updatedMemories = memories.filter(memory => memory.id !== id);
      onUpdateMemories(updatedMemories);
      setSelectedMemory(null);
    }
  };

  const handleCanvasClick = (e) => {
    if (isViewingMode || e.target.closest('.star') || e.target.closest('.admin-panel') || e.target.closest('.modal-content') || e.target.closest('.btn-back')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCreatingPosition({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const handleCreateMemory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const date = formData.get('date');
    const text = formData.get('text');
    const imageFile = formData.get('image');
    
    let uploadedImageUrl = "";

    if (imageFile && imageFile.size > 0) {
      if (!IMGBB_API_KEY) {
        alert("Erro: Chave API do ImgBB não encontrada.");
        return;
      }

      setIsUploading(true);
      try {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        imgData.append('expiration', '86400');
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: imgData });
        const result = await response.json();
        
        if (result.success) {
          uploadedImageUrl = result.data.url;
        } else {
          alert(`Erro: ${result.error?.message || "Foto muito grande."}`);
          setIsUploading(false);
          return; 
        }
      } catch (error) { 
        alert("Falha na conexão.");
        setIsUploading(false);
        return; 
      }
      setIsUploading(false);
    }

    const newMemory = { 
      id: Date.now(), title, date: date || "", text: text || "", imageUrl: uploadedImageUrl, 
      position: { top: `${creatingPosition.y}%`, left: `${creatingPosition.x}%` } 
    };
    
    onUpdateMemories([...memories, newMemory]);
    setCreatingPosition(null); 
  };

  const handleGenerateLink = () => {
    const currentData = {
      home: { title: "Anatheus", subtitle: "Sua história eternizada entre estrelas." },
      constellation, memories, bgMusic, musicStart
    };
    const code = encodeUniverse(currentData);
    const link = `${window.location.origin}${window.location.pathname}?u=${code}`;
    setGeneratedLink(link);
    navigator.clipboard.writeText(link);
    alert("Link copiado para a área de transferência!");
  };

  return (
    <div className="universe-container" onClick={handleCanvasClick}>
      {!isGiftLink && (
        <button className="btn-back" onClick={onGoBack}>
          <i className="fa-solid fa-arrow-left"></i> Voltar
        </button>
      )}
      
      {/* O SOM SÓ TOCA SE FOR O PRESENTEADO (isViewingMode === true) */}
      {getYouTubeId(bgMusic) && hasInteracted && isViewingMode && (
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeId(bgMusic)}?autoplay=1&loop=1&playlist=${getYouTubeId(bgMusic)}&start=${parseStartSeconds(musicStart)}&controls=0&showinfo=0&autohide=1`}
          allow="autoplay"
          style={{ position: 'absolute', width: '0', height: '0', border: '0', opacity: 0, pointerEvents: 'none' }}
          title="Background Music"
        ></iframe>
      )}

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

      {memories.map((m) => <Star key={m.id} memory={m} onClick={setSelectedMemory} />)}
      
      {selectedMemory && (
        <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} isViewingMode={isViewingMode} onDelete={handleDeleteMemory} />
      )}
      
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}

      {/* NOVO MODAL DE MÚSICA INTELIGENTE */}
      {showMusicConfig && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowMusicConfig(false)}>×</button>
            <h2>Som de Fundo</h2>
            
            <div className="create-memory-form">
              <input 
                type="text" 
                placeholder="Cole o link do YouTube aqui..." 
                value={bgMusic}
                onChange={(e) => setBgMusic(e.target.value)}
              />

              {/* SE O LINK FOR VÁLIDO, MOSTRA O VÍDEO PARA A PESSOA ESCOLHER O TEMPO */}
              {getYouTubeId(bgMusic) && (
                <div style={{ marginTop: '12px', animation: 'fadeInUp 0.3s ease' }}>
                  <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <iframe 
                      width="100%" 
                      height="160" 
                      src={`https://www.youtube.com/embed/${getYouTubeId(bgMusic)}?controls=1`} 
                      title="Preview" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>

                  <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', display: 'block', marginTop: '15px', marginBottom: '6px' }}>
                    Em qual momento a música deve começar? (Ex: 1:15)
                  </label>
                  <input 
                    type="text" 
                    placeholder="0:00" 
                    value={musicStart}
                    onChange={(e) => setMusicStart(e.target.value)}
                  />
                </div>
              )}

              <button className="btn-stelar" onClick={() => setShowMusicConfig(false)} style={{ marginTop: '20px', width: '100%' }}>
                Concluir Configuração
              </button>
            </div>
          </div>
        </div>
      )}

      {creatingPosition && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setCreatingPosition(null)}>×</button>
            <h2>Nova Estrela</h2>
            <form onSubmit={handleCreateMemory} className="create-memory-form">
              <input type="text" name="title" placeholder="Título" required />
              <input type="text" name="date" placeholder="Data" />
              <textarea name="text" placeholder="História..." rows="3"></textarea>
              <div className="file-upload-wrapper">
                <label>Foto (Some em 24h)</label>
                <input type="file" name="image" accept="image/*" />
              </div>
              <button type="submit" className="btn-stelar" disabled={isUploading}>
                {isUploading ? "Eternizando Imagem..." : "Criar Estrela"}
              </button>
            </form>
          </div>
        </div>
      )}

      {!isViewingMode && (
        <div className="admin-panel">
          <div className="admin-header"><p>Anatheus Engine</p></div>
          
          <div className="constellation-selector">
            <select value={constellation} onChange={(e) => onChangeConstellation(e.target.value)}>
              <option value="aries">Áries</option>
              <option value="touro">Touro</option>
              <option value="gemeos">Gêmeos</option>
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

          <button className="btn-guide" onClick={() => setShowMusicConfig(true)}>
            🎵 Configurar Música
          </button>

          <button className="btn-guide" onClick={() => setShowGuide(true)}>
            Como Usar
          </button>

          {memories.length > 0 && (
            <button onClick={handleClearDraft} style={{
              width: '100%', background: 'transparent', border: '1px solid rgba(255, 100, 100, 0.4)', color: '#ff8888', padding: '8px 14px', borderRadius: '50px', fontSize: '0.8rem', cursor: 'pointer', marginBottom: '6px'
            }}>
              Começar de Novo
            </button>
          )}

          <button className="btn-generate" onClick={handleGenerateLink}>
            Gerar Link do Presente
          </button>
          
          {generatedLink && <input type="text" readOnly value={generatedLink} onClick={(e) => e.target.select()} style={{
              width: '100%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.5)', padding: '6px 0', borderRadius: '6px', fontSize: '0.75rem', textAlign: 'center', outline: 'none', marginTop: '2px'
            }}/>}
        </div>
      )}
    </div>
  );
}