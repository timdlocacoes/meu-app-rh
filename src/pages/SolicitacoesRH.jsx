import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import BotaoVoltar from '../components/BotaoVoltar';

function SolicitacoesRH() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [buscaNome, setBuscaNome] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const fetchSolicitacoes = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'solicitacoes'));
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Solicitações carregadas:', lista);
      setSolicitacoes(lista);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      const ref = doc(db, 'solicitacoes', id);
      await updateDoc(ref, { status: novoStatus });
      setSolicitacoes((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: novoStatus } : item
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatarData = (timestamp) => {
    try {
      return timestamp?.toDate().toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  const solicitacoesFiltradas = solicitacoes.filter((item) => {
    const statusOk = filtroStatus ? item.status === filtroStatus : true;
    const nomeOk = buscaNome ? item.criadoPor?.toLowerCase().includes(buscaNome.toLowerCase()) : true;
    const dataSolicitacao = item.data?.toDate?.();
    const inicio = dataInicial ? new Date(dataInicial) : null;
    const fim = dataFinal ? new Date(dataFinal) : null;
    const dataOk = (!inicio || dataSolicitacao >= inicio) && (!fim || dataSolicitacao <= fim);
    return statusOk && nomeOk && dataOk;
  });

  return (
    <div style={{ padding: '1rem' }}>
      <BotaoVoltar destino="/dashboard-rh" />
      <h2>Solicitações Recebidas</h2>

      {/* Filtros */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Status:{' '}
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
          </select>
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Buscar por nome:{' '}
          <input
            type="text"
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
            placeholder="Digite o nome"
          />
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Data Inicial:{' '}
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </label>

        <label style={{ marginLeft: '1rem' }}>
          Data Final:{' '}
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </label>
      </div>

      {/* Lista filtrada */}
      {solicitacoesFiltradas.length === 0 ? (
        <p>Nenhuma solicitação encontrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {solicitacoesFiltradas.map((item) => {
            const estiloCaixa = {
              marginBottom: '1rem',
              border: '1px solid',
              borderColor:
                item.status === 'aprovado' ? '#4CAF50' :
                item.status === 'rejeitado' ? '#F44336' :
                '#ccc',
              backgroundColor:
                item.status === 'aprovado' ? '#e8f5e9' :
                item.status === 'rejeitado' ? '#ffebee' :
                '#fff',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
            };

            return (
              <li key={item.id} style={estiloCaixa}>
                <p><strong>Colaborador:</strong> {item.criadoPor || 'Não informado'}</p>
                <p><strong>Tipo:</strong> {item.tipo || 'Não informado'}</p>
                <p><strong>Data:</strong> {formatarData(item.data)}</p>
                <p><strong>Motivo:</strong> {item.motivo || 'Não informado'}</p>

                {item.tipo === 'documentacao' && (
                  <p><strong>Documento:</strong> {item.documento || 'Não informado'}</p>
                )}

                {item.tipo === 'folga' && (
                  <p><strong>Data da Folga:</strong> {item.dataFolga || 'Não informado'}</p>
                )}

                {item.tipo === 'ferias' && (
                  <>
                    <p><strong>Início:</strong> {item.inicio || 'Não informado'}</p>
                    <p><strong>Fim:</strong> {item.fim || 'Não informado'}</p>
                  </>
                )}

                <p><strong>Status:</strong> {item.status || 'Não informado'}</p>

                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    onClick={() => atualizarStatus(item.id, 'aprovado')}
                    style={{ marginRight: '0.5rem' }}
                  >
                    ✅ Aprovar
                  </button>
                  <button onClick={() => atualizarStatus(item.id, 'rejeitado')}>
                    ❌ Rejeitar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SolicitacoesRH;