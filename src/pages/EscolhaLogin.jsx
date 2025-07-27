import React from 'react';
import { useNavigate } from 'react-router-dom';
import './escolhaLogin.css';

function EscolhaLogin() {
  const navigate = useNavigate();

  return (
    <div className="escolha-container">
      <div className="escolha-card">
        <h2 className="escolha-title">Sistema de Solicitações</h2>
        <div className="escolha-buttons">
          <button className="escolha-button" onClick={() => navigate('/login-colaborador')}>
            👤 Sou Colaborador
          </button>
          <button className="escolha-button" onClick={() => navigate('/login-rh')}>
            🧑‍💼 Sou RH
          </button>
        </div>
      </div>
    </div>
  );
}

export default EscolhaLogin;