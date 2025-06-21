import React from 'react';
import styled from 'styled-components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles, Container } from './styles/GlobalStyles';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import ClientesList from './components/Clientes/ClientesList';
import ProdutosList from './components/Produtos/ProdutosList';
import EstoqueList from './components/Estoque/EstoqueList';
import VendasList from './components/Vendas/VendasList';
import Relatorios from './components/Relatorios/Relatorios';
import Login from './components/Login/Login';

const AppWrapper = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const MainContent = styled.main<{ isLogin: boolean }>`
  margin-left: ${({ isLogin }) => (isLogin ? '0' : '250px')};
  padding: 32px;
  min-height: calc(100vh - 73px);
`;

const AppContent: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        {!isLoginPage && <Header />}
        {!isLoginPage && <Navigation />}
        <MainContent isLogin={isLoginPage}>
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/clientes" element={<ClientesList />} />
              <Route path="/produtos" element={<ProdutosList />} />
              <Route path="/estoque" element={<EstoqueList />} />
              <Route path="/vendas" element={<VendasList />} />
              <Route path="/relatorios" element={<Relatorios />} />
            </Routes>
          </Container>
        </MainContent>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AppWrapper>
    </>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;