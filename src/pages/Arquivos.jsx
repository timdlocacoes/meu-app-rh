import React from 'react';
import './Arquivos.css';
import { FaFilePdf, FaBuilding, FaUser } from 'react-icons/fa';

const Arquivos = () => {
  const arquivosEmpresa = [
    'Manual de Conduta.pdf',
    'Política de Férias.pdf',
  ];

  const arquivosPessoais = [
    'ContraCheque - Julho.pdf',
    'Contrato de Trabalho.pdf',
  ];

  const renderLista = (lista) =>
    lista.map((arquivo, index) => (
      <div key={index} className="arquivo-card">
        <FaFilePdf className="arquivo-icon" />
        <span>{arquivo}</span>
      </div>
    ));

  return (
    <div className="arquivos-container">
      <h2 className="arquivos-titulo">📁 Seus Arquivos</h2>

      <div className="arquivos-secao">
        <h3><FaBuilding /> Arquivos da Empresa</h3>
        <div className="arquivos-grid">
          {renderLista(arquivosEmpresa)}
        </div>
      </div>

      <div className="arquivos-secao">
        <h3><FaUser /> Seus Arquivos Pessoais</h3>
        <div className="arquivos-grid">
          {renderLista(arquivosPessoais)}
        </div>
      </div>
    </div>
  );
};

export default Arquivos;