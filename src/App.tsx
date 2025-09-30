import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles, Container } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import ClientesList from './components/Clientes/ClientesList';
import ProdutosList from './components/Produtos/ProdutosList';
import EstoqueList from './components/Estoque/EstoqueList';
import VendasList from './components/Vendas/VendasList';
import Relatorios from './components/Relatorios/Relatorios';
import Login from './components/Login/Login';
import SalesForecast from './components/Forecast/SalesForecast';

const AppWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const MainContent = styled.main<{ $isLogin: boolean }>`
  margin-left: ${({ $isLogin }) => ($isLogin ? '0' : '250px')};
  padding: ${({ $isLogin }) => ($isLogin ? '0' : '32px')};
  min-height: ${({ $isLogin }) => ($isLogin ? '100vh' : 'calc(100vh - 73px)')};
  transition: margin-left ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    padding: ${({ $isLogin }) => ($isLogin ? '0' : '20px')};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ $isLogin }) => ($isLogin ? '0' : '16px')};
  }
`;

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <AppWrapper>
          {!isLoginPage && (
            <Header
              onMenuToggle={handleMenuToggle}
              isMenuOpen={isMobileMenuOpen}
            />
          )}
          {!isLoginPage && (
            <Navigation
              isOpen={isMobileMenuOpen}
              onClose={handleMenuClose}
            />
          )}
          <MainContent $isLogin={isLoginPage}>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Container>
                    <Dashboard />
                  </Container>
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute>
                  <Container>
                    <ClientesList />
                  </Container>
                </ProtectedRoute>
              }
            />
            <Route
              path="/produtos"
              element={
                <ProtectedRoute>
                  <Container>
                    <ProdutosList />
                  </Container>
                </ProtectedRoute>
              }
            />
            <Route
              path="/estoque"
              element={
                <ProtectedRoute>
                  <Container>
                    <EstoqueList />
                  </Container>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendas"
              element={
                <ProtectedRoute>
                  <Container>
                    <VendasList />
                  </Container>
                </ProtectedRoute>
              }
            />
            <Route
              path="/relatorios"
              element={
                <ProtectedRoute>
                  <Container>
                    <Relatorios />
                  </Container>
                </ProtectedRoute>
              }
            />
            <Route
              path="/previsao"
              element={
                <ProtectedRoute>
                  <Container>
                    <SalesForecast />
                  </Container>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;