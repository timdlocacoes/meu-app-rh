import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase'; // ✅ usa seu firebase

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('colaborador'); // padrão
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        nome,
        email,
        tipo, // 'colaborador' ou 'rh'
      });

      setMensagem('Cadastro realizado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
      setTipo('colaborador');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setMensagem('Erro ao cadastrar: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro} style={styles.form}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={styles.input}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={styles.select}>
          <option value="colaborador">Colaborador</option>
          <option value="rh">RH</option>
        </select>
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>
      {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2a5298',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  mensagem: {
    marginTop: '12px',
    color: '#333',
  },
};

export default Cadastro;