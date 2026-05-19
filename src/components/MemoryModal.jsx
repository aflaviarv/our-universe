export function MemoryModal({ memory, onClose }) {
  if (!memory) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <span className="modal-date">{memory.date}</span>
        <h2>{memory.title}</h2>
        <p>{memory.text}</p>
      </div>
    </div>
  );
}