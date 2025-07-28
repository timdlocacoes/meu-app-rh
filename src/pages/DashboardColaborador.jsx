import React from 'react';
import { useAuth } from '../hooks/useAuth'; // ✅ Importa o hook de autenticação
import './dashboardColaborador.css';

function DashboardColaborador() {
  const { user } = useAuth(); // ✅ Obtém o usuário logado

  return (
    <div className="dashboard-colaborador">
      <div className="card-colaborador">
        <h2>Dashboard do Colaborador</h2>
        {user && (
  <p className="bem-vindo">
    Bem-vindo, {user.displayName || user.email.split('@')[0]}!
  </p>
)}
        <p>Use o menu acima para acessar suas opções.</p>
      </div>
    </div>
  );
}

export default DashboardColaborador;