import { useState } from 'react';
import { Home } from './pages/Home';
import { Universe } from './pages/Universe';
import { BackgroundStars } from './components/BackgroundStars';
import { CometTrail } from './components/CometTrail';
import { CancerConstellation } from './components/CancerConstellation'; // <-- Importou aqui
import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <main>
      <BackgroundStars />
      <CancerConstellation /> {/* <-- Adicionou aqui */}
      <CometTrail />

      {currentScreen === 'home' && (
        <Home onStart={() => setCurrentScreen('universe')} />
      )}

      {currentScreen === 'universe' && (
        <Universe />
      )}
    </main>
  );
}

export default App;