import { useState, useEffect } from 'react';
import { Home } from './pages/Home.jsx';
import { Universe } from './pages/Universe.jsx';
import { BackgroundStars } from './components/BackgroundStars.jsx';
import { CancerConstellation } from './components/CancerConstellation.jsx';
import { CometTrail } from './components/CometTrail.jsx';
import { DEFAULT_UNIVERSE } from './universe.config.js';
import { decodeUniverse } from './utils/urlParser.js';
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [universeData, setUniverseData] = useState(DEFAULT_UNIVERSE);
  const [isViewingMode, setIsViewingMode] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlData = queryParams.get('u');

    if (urlData) {
      const decoded = decodeUniverse(urlData);
      if (decoded) {
        setUniverseData(decoded);
        setIsViewingMode(true);
      }
    }
  }, []);

  return (
    <main>
      <BackgroundStars />
      <CancerConstellation />
      <CometTrail />

      {currentScreen === 'home' && (
        <Home 
          data={universeData.home} 
          onStart={() => setCurrentScreen('universe')} 
        />
      )}

      {currentScreen === 'universe' && (
        <Universe 
          memories={universeData.memories} 
          isViewingMode={isViewingMode}
          onUpdateMemories={(newMemories) => setUniverseData({ ...universeData, memories: newMemories })}
        />
      )}
    </main>
  );
}

export default App;