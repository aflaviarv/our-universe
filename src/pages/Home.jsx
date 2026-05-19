export function Home({ data, onStart }) {
  // Evita que o app quebre se os dados demorarem um milissegundo a carregar
  const title = data?.title || "Você me deu uma estrela.";
  const subtitle = data?.subtitle || "Então eu resolvi te devolver um universo cheio delas.";
  const buttonText = data?.buttonText || "Entrar no nosso universo";

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        
        <button className="start-button" onClick={onStart}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}