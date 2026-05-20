import { useState, useEffect } from 'react';
import { Home } from './pages/Home.jsx';
import { Universe } from './pages/Universe.jsx';
import { BackgroundStars } from './components/BackgroundStars.jsx';
import { CometTrail } from './components/CometTrail.jsx';
import { DEFAULT_UNIVERSE } from './universe.config.js';
import { decodeUniverse } from './utils/urlParser.js';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [universeData, setUniverseData] = useState(DEFAULT_UNIVERSE);
  const [isViewingMode, setIsViewingMode] = useState(false);
  const [constellation, setConstellation] = useState('cancer');
  
  // NOVO: Verifica se a pessoa acessou por um link gerado
  const [isGiftLink, setIsGiftLink] = useState(false);

  useEffect(() => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const urlData = queryParams.get('u');
      
      if (urlData) {
        const decoded = decodeUniverse(urlData);
        if (decoded && decoded.memories) {
          setUniverseData(decoded);
          setConstellation(decoded.constellation || 'cancer');
          setIsViewingMode(true);
          setIsGiftLink(true); // Trava o fluxo para "Presenteado"
        }
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }, []);

  // Função para retornar à Home (disponível apenas para não-presenteados)
  const handleGoBack = () => {
    setCurrentScreen('home');
    // Reseta para o template inicial ao voltar
    setUniverseData(DEFAULT_UNIVERSE);
    setConstellation('cancer');
  };

  return (
    <main>
      <BackgroundStars />
      <CometTrail />

      {currentScreen === 'home' && (
        <Home 
          isGift={isGiftLink} // Passa a informação para a Home mudar os botões
          onChooseMode={(mode) => {
            // Se for presenteado, sempre será viewer. Se não, depende do botão clicado.
            setIsViewingMode(isGiftLink || mode === 'viewer');
            setCurrentScreen('universe');
          }} 
        />
      )}

      {currentScreen === 'universe' && (
        <Universe 
          memories={universeData.memories} 
          constellation={constellation}
          onChangeConstellation={setConstellation}
          isViewingMode={isViewingMode}
          isGiftLink={isGiftLink} // Passa para o Universo esconder o botão de voltar
          onUpdateMemories={(newMemories) => setUniverseData({ ...universeData, memories: newMemories })}
          onGoBack={handleGoBack}
        />
      )}
    </main>
  );
}

export default App;