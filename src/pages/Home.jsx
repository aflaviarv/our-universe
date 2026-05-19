// src/pages/Home.jsx

// O componente recebe 'onStart' como Propriedade (uma função que será passada pelo App.jsx)
export function Home({ onStart }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Você me deu uma estrela.</h1>
        <p>Então eu resolvi te devolver um universo cheio delas.</p>
        
        {/* Quando o botão é clicado, ele executa a função onStart */}
        <button className="start-button" onClick={onStart}>
          Entrar no nosso universo
        </button>
      </div>
    </div>
  );
}