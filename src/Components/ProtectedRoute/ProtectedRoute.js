import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verifique se há um token no Local Storage ou qualquer outra lógica de autenticação necessária
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver um token, redirecione o usuário para a página de login
    return <Navigate to="/" />;
  }

  // Se houver um token, permita o acesso à rota protegida
  return children;
};

export default ProtectedRoute;
