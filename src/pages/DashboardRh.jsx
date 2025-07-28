import React from 'react';
import { useAuth } from '../hooks/useAuth'; // ✅ Importa o hook de autenticação
import './dashboardRh.css';

function DashboardRh() {
  const { user } = useAuth(); // ✅ Obtém o usuário logado

  return (
    <main className="dashboard-rh">
      <div className="card-rh">
        <h2>Dashboard do RH</h2>
        {user && (
          <p className="bem-vindo">Bem-vindo, {user.displayName || user.email.split('@')[0]}!</p>
        )} {/* ✅ Exibe nome ou parte do email */}
        <p>Use o menu acima para acessar suas opções.</p>
      </div>
    </main>
  );
}

export default DashboardRh;