export function MemoryModal({ memory, onClose, onDelete, isViewingMode }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* O mesmo botão X padronizado */}
        <button className="modal-close" onClick={onClose}>×</button>
        
        {memory.date && <span className="modal-date">{memory.date}</span>}
        <h2>{memory.title}</h2>
        
        {memory.imageUrl && (
          <div className="modal-media-container">
            <img src={memory.imageUrl} alt="Memória" className="modal-media" />
          </div>
        )}
        
        <p>{memory.text}</p>

        {/* Botão de apagar: Só aparece no Modo Criador */}
        {!isViewingMode && onDelete && (
          <button 
            onClick={() => onDelete(memory.id)}
            style={{
              marginTop: '25px',
              background: 'rgba(255, 50, 50, 0.05)',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              color: '#ff8888',
              padding: '8px 16px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: '0.2s',
              width: '100%'
            }}
          >
            Apagar Estrela
          </button>
        )}
      </div>
    </div>
  );
}