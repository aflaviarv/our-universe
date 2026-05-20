// src/pages/Home.jsx
export function Home({ onChooseMode, isGift }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="logo-anatheus">ANATHEUS</h1>
        
        {/* Muda a frase se for um link de presente */}
        <p className="tagline">
          {isGift ? "Alguém eternizou memórias para você." : "Sua história eternizada entre estrelas."}
        </p>
        
        <div className="mode-selection">
          {isGift ? (
            // VISÃO DO PRESENTEADO: Apenas um botão, sem opções de ADM
            <button className="btn-stelar" onClick={() => onChooseMode('viewer')}>
              Abrir Meu Presente
            </button>
          ) : (
            // VISÃO DO CRIADOR (Acesso Vercel Normal)
            <>
              <button className="btn-stelar" onClick={() => onChooseMode('viewer')}>
                Veja um Universo
              </button>
              
              <button className="btn-stelar" onClick={() => onChooseMode('adm')}>
                <i className="fa-solid fa-gear"></i> Modo ADM (Criar Estrelas)
              </button>
            </>
          )}
        </div>
        
        {/* O texto explicativo só aparece para quem está acessando a página principal sem link */}
        {!isGift && (
          <p className="purpose-text">
            Anatheus é uma ferramenta de engenharia emocional para transformar 
            memórias digitais em mapas astronômicos interativos.
          </p>
        )}
      </div>
    </div>
  );
}