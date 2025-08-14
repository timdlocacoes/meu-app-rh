import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc
} from 'firebase/firestore';
import './cadastro.css';
import { useNavigate } from 'react-router-dom';

// 🔐 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCzQmAuv4pxN_ehzkpd4b_92LDBmSsHnIw",
  authDomain: "appmeurh-208f2.firebaseapp.com",
  projectId: "appmeurh-208f2",
  storageBucket: "appmeurh-208f2.appspot.com",
  messagingSenderId: "524174458098",
  appId: "1:524174458098:web:a7d3893bd11643a663646b",
  measurementId: "G-46L64MCF4R"
};

// 🔧 Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('colaborador');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'usuarios', uid), {
        nome,
        email,
        tipo,
      });

      setMensagem('Cadastro realizado com sucesso!');
      await signOut(auth);
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
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Cadastro</h2>
        <form className="cadastro-form" onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="colaborador">Colaborador</option>
            <option value="rh">RH</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && (
          <div className="cadastro-sucesso">
            <p className="cadastro-mensagem">{mensagem}</p>
            <button className="btn-login" onClick={() => navigate('/login')}>
              Ir para Login
            </button>
          </div>
        )}

        <button className="btn-voltar-home" onClick={() => navigate('/')}>
          Voltar para Home
        </button>
      </div>
    </div>
  );
}

export default Cadastro;