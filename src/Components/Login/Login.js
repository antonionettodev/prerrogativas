import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.css';

const Login = () => {
  const [oab_card, setOabCard] = useState('');
  const [security_number, setSecurityNumber] = useState('');
  const [token, setToken] = useState(''); // Estado para armazenar o token
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://188.34.165.119:8800/login', {
        oab_card,
        security_number,
      });

      // Armazena o token na variável de estado
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('oab_card', response.data.user.oab_card);

      // Limpa os campos de entrada após o login
      setOabCard('');
      setSecurityNumber('');
      navigate('/home');
    } catch (error) {
      setError(
        'Erro ao fazer login. Verifique suas credenciais e tente novamente.',
      );
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="oab_card">Carteira OAB:</label>
          <input
            type="text"
            id="oab_card"
            placeholder="Insira sua Carteira OAB"
            required
            value={oab_card}
            onChange={(e) => setOabCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="security_number">Número de Segurança:</label>
          <input
            type="password"
            id="security_number"
            placeholder="Insira seu Número de Segurança"
            required
            value={security_number}
            onChange={(e) => setSecurityNumber(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Não possui as suas credenciais? <br /> Entre em Contato{' '}
          <a
            href="https://www.oab.org.br/ouvidoria/faleconosco"
            target="_blank"
          >
            OAB - DF
          </a>
        </p>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
