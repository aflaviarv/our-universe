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
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const urlData = queryParams.get('u');

      if (urlData) {
        // Se existir o parâmetro 'u' na URL, descodifica as memórias do presente
        const decoded = decodeUniverse(urlData);
        if (decoded && decoded.home && decoded.memories) {
          setUniverseData(decoded);
          setIsViewingMode(true); // Bloqueia a criação de novas estrelas para o presenteado
        } else {
          // Se o código da URL for inválido, força o estado padrão limpo
          setUniverseData(DEFAULT_UNIVERSE);
          setIsViewingMode(false);
        }
      } else {
        // Se for um acesso normal ou reload sem parâmetros, começa do zero
        setUniverseData(DEFAULT_UNIVERSE);
        setIsViewingMode(false);
      }
    } catch (error) {
      console.error("Erro ao carregar dados iniciais do universo:", error);
      setUniverseData(DEFAULT_UNIVERSE);
    }
  }, []);

  return (
    <main>
      {/* Camadas visuais do fundo do espaço */}
      <BackgroundStars />
      <CancerConstellation />
      <CometTrail />

      {/* Ecrã Inicial (Intro) */}
      {currentScreen === 'home' && (
        <Home 
          data={universeData.home} 
          onStart={() => setCurrentScreen('universe')} 
        />
      )}

      {/* Ecrã do Universo Interativo */}
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