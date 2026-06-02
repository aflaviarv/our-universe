// src/App.jsx
import { useState, useEffect } from 'react';
import { Home } from './pages/Home.jsx';
import { Universe } from './pages/Universe.jsx';
import { BackgroundStars } from './components/BackgroundStars.jsx';
import { CometTrail } from './components/CometTrail.jsx';
import { DEFAULT_UNIVERSE } from './universe.config.js';
import { decodeUniverse } from './utils/urlParser.js';
import './index.css';

// Overlay que segue o estilo da Home
function WelcomeOverlay({ onOpen }) {
  return (
    <div className="welcome-container">
      <h1>ANATHEUS</h1>
      <button onClick={onOpen}>Abrir Presente</button>
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [universeData, setUniverseData] = useState(DEFAULT_UNIVERSE);
  const [isViewingMode, setIsViewingMode] = useState(false);
  const [constellation, setConstellation] = useState('cancer');
  const [isGiftLink, setIsGiftLink] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

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
          setIsGiftLink(true);
          setCurrentScreen('universe');
        }
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }, []);

  const handleGoBack = () => {
    setCurrentScreen('home');
    setUniverseData(DEFAULT_UNIVERSE);
    setConstellation('cancer');
    setIsViewingMode(false);
    setIsGiftLink(false);
    setIsOpened(false);
  };

  return (
    <main>
      <BackgroundStars />
      <CometTrail />

      {/* A overlay aparece apenas para presenteados antes do clique inicial */}
      {isGiftLink && !isOpened && (
        <WelcomeOverlay onOpen={() => setIsOpened(true)} />
      )}

      {currentScreen === 'home' && (
        <Home 
          isGift={isGiftLink}
          onChooseMode={(mode) => {
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
          isGiftLink={isGiftLink}
          // Passando as novas configurações de música vindas do código decodificado
          initialBgMusic={universeData.bgMusic || ''}
          initialMusicStart={universeData.musicStart || '0'}
          onUpdateMemories={(newMemories) => setUniverseData({ ...universeData, memories: newMemories })}
          onGoBack={handleGoBack}
        />
      )}
    </main>
  );
}

export default App;