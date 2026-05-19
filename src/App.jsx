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

  useEffect(() => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const urlData = queryParams.get('u');
      if (urlData) {
        const decoded = decodeUniverse(urlData);
        if (decoded) {
          setUniverseData(decoded);
          setConstellation(decoded.constellation || 'cancer');
          setIsViewingMode(true);
        }
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }, []);

  return (
    <main>
      <BackgroundStars />
      <CometTrail /> {/* REMOVIDO: CancerConstellation daqui */}

      {currentScreen === 'home' && (
        <Home onChooseMode={(mode) => {
          setIsViewingMode(mode === 'viewer');
          setCurrentScreen('universe');
        }} />
      )}

      {currentScreen === 'universe' && (
        <Universe 
          memories={universeData.memories} 
          constellation={constellation}
          onChangeConstellation={setConstellation}
          isViewingMode={isViewingMode}
          onUpdateMemories={(newMemories) => setUniverseData({ ...universeData, memories: newMemories })}
        />
      )}
    </main>
  );
}

export default App;