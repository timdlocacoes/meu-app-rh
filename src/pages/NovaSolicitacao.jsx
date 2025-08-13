import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaUser, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import './NovaSolicitacao.css';

export default function NovaSolicitacao() {
  const [tipo, setTipo] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipo) {
      alert('Selecione o tipo de solicitação.');
      return;
    }

    navigate(`/${tipo}`);
  };

  return (
    <div className="nova-solicitacao-card">
      <div className="cabecalho-solicitacao">
        <FaClipboardList className="icone-cabecalho" />
        <h2>Nova Solicitação</h2>
      </div>

      <div className="dados-colaborador">
        <p><FaUser className="icone-dado" /> {user?.displayName || 'Colaborador'}</p>
        <p><FaEnvelope className="icone-dado" /> {user?.email || 'email@empresa.com'}</p>
      </div>

      <form onSubmit={handleSubmit} className="formulario-solicitacao">
        <label htmlFor="tipo">Tipo de Solicitação:</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="ferias">Férias</option>
          <option value="folga">Folga</option>
          <option value="documentacao">Documentação</option>
        </select>

        <button type="submit" className="btn-continuar">
          Continuar <FaChevronRight />
        </button>
      </form>
    </div>
  );
}