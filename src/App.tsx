import React, { useState } from 'react';
import styled from 'styled-components';
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

const AppWrapper = styled.div`
  min-height: 100vh;
  background: #fafafa;
`;

const MainContent = styled.main`
  margin-left: 250px;
  padding: 32px;
  min-height: calc(100vh - 73px);
`;

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'clientes':
        return <ClientesList />;
      case 'produtos':
        return <ProdutosList />;
      case 'estoque':
        return <EstoqueList />;
      case 'vendas':
        return <VendasList />;
      case 'relatorios':
        return <Relatorios />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <Header />
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <MainContent>
          <Container>
            {renderContent()}
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

export default App;