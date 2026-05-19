// src/pages/Home.jsx
export function Home({ onChooseMode }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="logo-anatheus">ANATHEUS</h1>
        <p className="tagline">Sua história eternizada entre estrelas.</p>
        
        <div className="mode-selection">
          {/* Botão para visualizar (o botão que brilha e sobe ao recarregar) */}
          <button 
            className="btn-stelar" 
            onClick={() => onChooseMode('viewer')}
          >
            Entrar no Universo
          </button>
          
          {/* Botão para modo ADM (o botão que brilha e sobe ao recarregar) */}
          <button 
            className="btn-stelar" 
            onClick={() => onChooseMode('adm')}
          >
            <i className="fa-solid fa-gear"></i> Modo ADM (Criar Estrelas)
          </button>
        </div>
        
        <p className="purpose-text">
          Anatheus é uma ferramenta de engenharia emocional para transformar 
          memórias digitais em mapas astronômicos interativos.
        </p>
      </div>
    </div>
  );
}