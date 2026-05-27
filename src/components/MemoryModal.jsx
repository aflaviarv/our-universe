export function MemoryModal({ memory, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        {memory.date && <span className="modal-date">{memory.date}</span>}
        <h2>{memory.title}</h2>
        {memory.imageUrl && <div className="modal-media-container"><img src={memory.imageUrl} className="modal-media" /></div>}
        <p>{memory.text}</p>
      </div>
    </div>
  );
}