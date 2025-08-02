import React, { useState } from 'react';
import './paginaPadrao.css';

const Perfil = () => {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [dados, setDados] = useState({
    nome: 'Bruno Oliveira',
    email: 'bruno.oliveira@empresa.com',
    cargo: 'Analista de RH',
  });

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSalvar = () => {
    setModoEdicao(false);
    // Aqui você pode integrar com Firebase ou API
    console.log('Dados salvos:', dados);
  };

  return (
    <div className="pagina-padrao">
      <h2>Perfil do Colaborador</h2>

      <div style={{ marginTop: '20px' }}>
        <label>Nome:</label>
        {modoEdicao ? (
          <input type="text" name="nome" value={dados.nome} onChange={handleChange} />
        ) : (
          <p>{dados.nome}</p>
        )}

        <label>Email:</label>
        {modoEdicao ? (
          <input type="email" name="email" value={dados.email} onChange={handleChange} />
        ) : (
          <p>{dados.email}</p>
        )}

        <label>Cargo:</label>
        {modoEdicao ? (
          <input type="text" name="cargo" value={dados.cargo} onChange={handleChange} />
        ) : (
          <p>{dados.cargo}</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        {modoEdicao ? (
          <button onClick={handleSalvar}>Salvar</button>
        ) : (
          <button onClick={() => setModoEdicao(true)}>Editar</button>
        )}
      </div>
    </div>
  );
};

export default Perfil;