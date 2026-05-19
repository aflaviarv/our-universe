// src/App.jsx
import { useState } from 'react';
import { Home } from './pages/Home';
import { Universe } from './pages/Universe';
import './index.css';

function App() {
  // Declaramos o Estado: a variável 'currentScreen' começa com o valor 'home'.
  // 'setCurrentScreen' é a função que usaremos para alterar esse valor.
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <main>
      {/* Lógica Condicional: Se currentScreen for 'home', renderiza o componente Home */}
      {currentScreen === 'home' && (
        <Home onStart={() => setCurrentScreen('universe')} />
      )}

      {/* Se currentScreen for 'universe', renderiza o componente Universe */}
      {currentScreen === 'universe' && (
        <Universe />
      )}
    </main>
  );
}

export default App;