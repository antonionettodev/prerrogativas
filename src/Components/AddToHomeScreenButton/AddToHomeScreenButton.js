import React from 'react';

const AddToHomeScreenButton = () => {
  const handleAddToHomeScreen = () => {
    // Verifique se o navegador suporta a funcionalidade
    if ('BeforeInstallPromptEvent' in window) {
      // Solicite a instalação do aplicativo
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        const promptEvent = e;

        // Exiba um botão ou mensagem para que o usuário possa instalar o aplicativo
        // Por exemplo, você pode mostrar um modal de confirmação
        if (
          window.confirm('Deseja adicionar este aplicativo à tela inicial?')
        ) {
          promptEvent.prompt();
        }
      });
    }
  };

  return (
    <div>
      <button className="button" onClick={handleAddToHomeScreen}>
        Adicionar à Tela Inicial
      </button>
    </div>
  );
};

export default AddToHomeScreenButton;
