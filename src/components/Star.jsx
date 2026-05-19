export function Star({ memory, onClick }) {
  const positionStyle = {
    top: memory.position?.top || '50%',
    left: memory.position?.left || '50%',
  };

  return (
    <div 
      className="star" 
      style={positionStyle} 
      onClick={() => onClick(memory)}
      title="Clique para ver a memória"
    ></div>
  );
}