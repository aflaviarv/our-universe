export function WelcomeOverlay({ onOpen }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#090a0f', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', zIndex: 9999, color: 'white'
    }}>
      <button onClick={onOpen} style={{
        padding: '20px 40px', fontSize: '1.2rem', cursor: 'pointer',
        background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '50px'
      }}>
        Abrir seu Presente
      </button>
    </div>
  );
}