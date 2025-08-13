import { useState } from 'react';
import './DocumentacaoRequest.css';
import { FaFileAlt, FaPaperPlane, FaArrowLeft, FaUser, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function DocumentacaoRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipoDocumento: '',
    motivo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosSolicitacao = {
      criadoPor: user?.displayName || 'Colaborador',
      email: user?.email || '',
      tipo: 'documentacao',
      motivo: formData.motivo,
      documento: formData.tipoDocumento,
      data: Timestamp.now(),
      status: 'pendente',
    };

    try {
      await addDoc(collection(db, 'solicitacoes'), dadosSolicitacao);
      alert('Solicitação de documentação enviada com sucesso!');
      navigate(-1);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação');
    }
  };

  return (
    <div className="documentacao-page">
      <div className="documentacao-card">
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <div className="documentacao-header">
          <FaFileAlt className="documentacao-icon" />
          <h2>Solicitação de Documentação</h2>
        </div>

        <form onSubmit={handleSubmit} className="documentacao-form">
          <div className="documentacao-info">
            <p><FaUser className="icone-dado" /> {user?.displayName || 'Colaborador'}</p>
            <p><FaEnvelope className="icone-dado" /> {user?.email || 'email@empresa.com'}</p>
          </div>

          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <input
            type="text"
            name="tipoDocumento"
            id="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            placeholder="Ex: Declaração de vínculo"
            required
          />

          <label htmlFor="motivo">Motivo:</label>
          <textarea
            name="motivo"
            id="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Descreva o motivo da solicitação"
            required
          />

          <button type="submit" className="btn-enviar">
            Enviar Solicitação <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}