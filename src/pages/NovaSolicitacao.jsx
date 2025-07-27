import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NovaSolicitacao() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipo) {
      alert('Selecione o tipo de solicitação.');
      return;
    }

    // Redireciona para a página específica
    navigate(`/${tipo}`);
  };

  return (
    <div style={styles.container}>
      <h2>Nova Solicitação</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Tipo de Solicitação:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="">Selecione...</option>
          <option value="ferias">Férias</option>
          <option value="abono">Abono</option>
          <option value="folga">Folga</option>
        </select>

        <button type="submit">Continuar</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Arial',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default NovaSolicitacao;