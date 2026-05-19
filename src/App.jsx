import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Universe } from './pages/Universe';
import { BackgroundStars } from './components/BackgroundStars';
import { CometTrail } from './components/CometTrail';
import { CancerConstellation } from './components/CancerConstellation';
import { DEFAULT_UNIVERSE } from './universe.config';
import { decodeUniverse } from './utils/urlParser';
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
        setIsViewingMode(true); // O parceiro apenas visualiza, não edita
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