import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoRecorder from '../VideoRecorder/VideoRecorder';
import AddToHomeScreenButton from '../AddToHomeScreenButton/AddToHomeScreenButton';
import styles from './styles.css';

const Home = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAccepted, setConfirmationAccepted] = useState(false);
  const navigate = useNavigate();

  // Função para sair (logout)
  const handleLogout = () => {
    // Remova o token do Local Storage
    localStorage.removeItem('token');

    // Redirecione o usuário de volta para a página de login
    navigate('/');
  };
  const sendToDatabase = async (data) => {
    try {
      // Simulação de uma solicitação POST para a sua API
      const response = await fetch('http://188.34.165.119:8800/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Verificar se a solicitação foi bem-sucedida (código de status 200)
      if (response.status === 200) {
        console.log('Dados enviados com sucesso para a base de dados:', data);
      } else {
        console.error(
          'Erro ao enviar dados para a base de dados:',
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a base de dados:', error);
    }
  };

  const collectUserLocationAndInfo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const local = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Obter informações do usuário do Local Storage
        const name = localStorage.name;
        const oab_card = localStorage.oab_card;

        // Obter a data e hora atuais
        const currentDate = new Date();
        const date = currentDate.toLocaleDateString('en-CA');
        const options = { hour: 'numeric', minute: 'numeric' };
        const hour = currentDate.toLocaleTimeString(undefined, options);

        // Criar um objeto com todas as informações
        const userLocationAndInfo = {
          name,
          oab_card,
          date,
          hour,
          local,
        };

        // Enviar as informações para sua base de dados (substitua isso com sua lógica de envio real)
        sendToDatabase(userLocationAndInfo);

        // Define a confirmação como aceita após enviar os dados para a base de dados
        setConfirmationAccepted(true);
      });
    }
  };

  const showConfirmationMessage = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="home">
      <h2>App Prerrogativas</h2>
      {
        <span>
          <p>{localStorage.name}</p>
          <p>OAB: {localStorage.oab_card}</p>
        </span>
      }
      <div className="button-list">
        <button className="button" onClick={showConfirmationMessage}>
          Intervenção Emergencial
        </button>
        {showConfirmation && !confirmationAccepted && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Intervenção Emergencial</h3>
              <p>
                Atenção: esta opção somente deve ser utilizada em casos urgentes
                de violação das prerrogativas, a saber, prisão de advogado no
                exercício profissional, busca e apreensão em escritório, livre
                acesso à autoridade, acesso ao cliente preso, impedimento em
                participar de audiência ou reunião. Seu acesso poderá implicar
                em deslocamento de representante de OAB.
              </p>
              <div className="modal-buttons">
                <button onClick={collectUserLocationAndInfo}>
                  <a href="tel:61998829535">Concordar</a>
                </button>
                <button onClick={() => setShowConfirmation(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
        {userLocation && (
          <div>
            <p>Localização do usuário:</p>
            <a href={userLocation} target="_blank" rel="noopener noreferrer">
              Abrir no Google Maps
            </a>
          </div>
        )}
        <button className="button">Registre sua Denúncia</button>
        <VideoRecorder />
        <AddToHomeScreenButton />
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Home;
