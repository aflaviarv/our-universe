import { useState } from 'react';
import { Star } from '../components/Star.jsx';
import { MemoryModal } from '../components/MemoryModal.jsx';
import { encodeUniverse } from '../utils/urlParser.js';

export function Universe({ memories, isViewingMode, onUpdateMemories }) {
  const [generatedLink, setGeneratedLink] = useState('');
  const [selectedMemory, setSelectedMemory] = useState(null);

  const handleCanvasClick = (e) => {
    // Se o parceiro estiver a ver o presente, ele não pode criar estrelas
    if (isViewingMode) return;

    // Impede a abertura do prompt se o utilizador clicar numa estrela existente,
    // no painel de administração ou dentro do modal de memória
    if (e.target.closest('.star') || e.target.closest('.admin-panel') || e.target.closest('.modal-content')) return;

    // Calcula a posição exata em percentagem baseado no tamanho do ecrã do utilizador
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Abre as caixas de diálogo nativas do navegador para recolher os dados
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

    // Atualiza o estado global no App.jsx com a nova lista de memórias
    onUpdateMemories([...memories, newMemory]);
  };

  const handleGenerateLink = () => {
    // Monta o objeto estruturado para codificação em Base64
    const currentData = {
      home: {
        title: "Você me deu uma estrela.",
        subtitle: "Então eu resolvi te devolver um universo cheio delas.",
        buttonText: "Entrar no nosso universo"
      },
      memories: memories
    };

    const code = encodeUniverse(currentData);
    const link = `${window.location.origin}${window.location.pathname}?u=${code}`;
    setGeneratedLink(link);
    
    // Copia o link gerado automaticamente para a área de transferência (clipboard)
    navigator.clipboard.writeText(link);
    alert("Link do universo copiado para a área de transferência!");
  };

  return (
    <div className="universe-container" onClick={handleCanvasClick}>
      {/* Renderização dinâmica das estrelas criadas */}
      {memories.map((memory) => (
        <Star 
          key={memory.id} 
          memory={memory} 
          onClick={(m) => setSelectedMemory(m)} 
        />
      ))}

      {/* Abre o Modal elegante apenas se houver uma estrela selecionada */}
      {selectedMemory && (
        <MemoryModal 
          memory={selectedMemory} 
          onClose={() => setSelectedMemory(null)} 
        />
      )}

      {/* Painel do Modo Criador visível apenas para quem está a construir o céu */}
      {!isViewingMode && (
        <div className="admin-panel">
          <p>Modo Criador Ativo</p>
          <span>Clique em qualquer lugar do céu para fixar uma nova memória.</span>
          <button onClick={handleGenerateLink}>Gerar Link do Presente</button>
          
          {generatedLink && (
            <input 
              type="text" 
              readOnly 
              value={generatedLink} 
              onClick={(e) => e.target.select()} 
            />
          )}
        </div>
      )}
    </div>
  );
}