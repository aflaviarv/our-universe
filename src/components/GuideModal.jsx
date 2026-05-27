// src/components/GuideModal.jsx
export function GuideModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content guide-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        
        <h2>Como criar seu Universo</h2>
        
        <div className="guide-steps">
          <div className="step">
            <span className="step-number">1</span>
            <p><strong>Escolha sua constelação:</strong> Use o painel inferior para selecionar o mapa astral de fundo.</p>
          </div>
          
          <div className="step">
            <span className="step-number">2</span>
            <p><strong>Crie memórias:</strong> Clique em qualquer lugar vazio do espaço para adicionar uma estrela. Preencha o título, a história e, se quiser, a data.</p>
          </div>
          
          <div className="step">
            <span className="step-number">3</span>
            <p><strong>Fotos efêmeras:</strong> Você pode anexar uma imagem em cada estrela. Para garantir a sua privacidade, <strong>todas as fotos se autodestroem permanentemente 24 horas após o envio</strong>.</p>
          </div>
          
          <div className="step">
            <span className="step-number">4</span>
            <p><strong>Gere o presente:</strong> Quando terminar, clique em "Gerar Link do Presente". Copie o link e envie para a pessoa especial. Aquele link é único e imutável.</p>
          </div>
        </div>

        <button className="btn-stelar" onClick={onClose} style={{ marginTop: '20px' }}>
          Entendi, vamos começar
        </button>
      </div>
    </div>
  );
}