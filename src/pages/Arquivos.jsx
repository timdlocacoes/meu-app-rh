// src/pages/Arquivos.jsx
import React from 'react';
import './Arquivos.css'; // opcional

const Arquivos = () => {
  const arquivosEmpresa = [
    { nome: 'Manual de Conduta.pdf', tipo: 'empresa' },
    { nome: 'Política de Férias.pdf', tipo: 'empresa' },
  ];

  const arquivosPessoais = [
    { nome: 'Contracheque - Julho.pdf', tipo: 'pessoal' },
    { nome: 'Contrato de Trabalho.pdf', tipo: 'pessoal' },
  ];

  return (
    <div className="arquivos-container">
      <h2>📂 Arquivos</h2>

      <section>
        <h3>Arquivos da Empresa</h3>
        <ul>
          {arquivosEmpresa.map((arquivo, index) => (
            <li key={index}>
              <a href="#">{arquivo.nome}</a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Seus Arquivos Pessoais</h3>
        <ul>
          {arquivosPessoais.map((arquivo, index) => (
            <li key={index}>
              <a href="#">{arquivo.nome}</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Arquivos;