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

export function Universe({ memories, isViewingMode, constellation, onChangeConstellation, onUpdateMemories, onGoBack, isGiftLink }) {
  const [generatedLink, setGeneratedLink] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [creatingPosition, setCreatingPosition] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY; 

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

  const handleCanvasClick = (e) => {
    if (isViewingMode || e.target.closest('.star') || e.target.closest('.admin-panel') || e.target.closest('.modal-content') || e.target.closest('.btn-back')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCreatingPosition({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const handleCreateMemory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get('image');
    let uploadedImageUrl = "";

    if (imageFile && imageFile.size > 0) {
      setIsUploading(true);
      try {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        imgData.append('expiration', '86400'); 
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: imgData });
        const result = await response.json();
        if (result.success) uploadedImageUrl = result.data.url;
        else alert("Erro ao enviar a imagem.");
      } catch (error) { alert("Falha na conexão."); }
      setIsUploading(false);
    }

    onUpdateMemories([...memories, { id: Date.now(), title: formData.get('title'), date: formData.get('date'), text: formData.get('text'), imageUrl: uploadedImageUrl, position: { top: `${creatingPosition.y}%`, left: `${creatingPosition.x}%` } }]);
    setCreatingPosition(null);
  };

  return (
    <div className="universe-container" onClick={handleCanvasClick}>
      {!isGiftLink && <button className="btn-back" onClick={onGoBack}><i className="fa-solid fa-arrow-left"></i> Voltar</button>}
      {constellation === 'aries' && <AriesConstellation />}{constellation === 'touro' && <TouroConstellation />}{constellation === 'gemeos' && <GemeosConstellation />}{constellation === 'cancer' && <CancerConstellation />}{constellation === 'leao' && <LeaoConstellation />}{constellation === 'virgem' && <VirgemConstellation />}{constellation === 'libra' && <LibraConstellation />}{constellation === 'escorpiao' && <EscorpiaoConstellation />}{constellation === 'sagitario' && <SagitarioConstellation />}{constellation === 'capricornio' && <CapricornioConstellation />}{constellation === 'aquario' && <AquarioConstellation />}{constellation === 'peixes' && <PeixesConstellation />}
      {memories.map((m) => <Star key={m.id} memory={m} onClick={setSelectedMemory} />)}
      {selectedMemory && <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}

      {creatingPosition && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setCreatingPosition(null)}>×</button>
            <h2>Nova Estrela</h2>
            <form onSubmit={handleCreateMemory} className="create-memory-form">
              <input type="text" name="title" placeholder="Título" required />
              <input type="text" name="date" placeholder="Data" />
              <textarea name="text" placeholder="História..." rows="4"></textarea>
              <div className="file-upload-wrapper">
                <input type="file" name="image" accept="image/*" />
              </div>
              <button type="submit" className="btn-stelar" disabled={isUploading}>{isUploading ? "Enviando..." : "Criar Estrela"}</button>
            </form>
          </div>
        </div>
      )}

      {!isViewingMode && (
        <div className="admin-panel">
          <div className="admin-header"><p>Anatheus Engine</p></div>
          <div className="constellation-selector">
            <select value={constellation} onChange={(e) => onChangeConstellation(e.target.value)}>
              {['aries','touro','gemeos','cancer','leao','virgem','libra','escorpiao','sagitario','capricornio','aquario','peixes'].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <button className="btn-guide" onClick={() => setShowGuide(true)}><i className="fa-solid fa-circle-question"></i> Como Usar</button>
          <button className="btn-generate" onClick={() => { const code = encodeUniverse({constellation, memories}); const link = `${window.location.origin}${window.location.pathname}?u=${code}`; setGeneratedLink(link); navigator.clipboard.writeText(link); alert("Link copiado!"); }}><i className="fa-solid fa-share-nodes"></i> Link do Presente</button>
          {generatedLink && <input type="text" readOnly value={generatedLink} />}
        </div>
      )}
    </div>
  );
}