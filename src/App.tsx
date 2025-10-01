import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles, Container } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PageTransition from './components/PageTransition';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import ClientesList from './components/Clientes/ClientesList';
import ProdutosList from './components/Produtos/ProdutosList';
import EstoqueList from './components/Estoque/EstoqueList';
import VendasList from './components/Vendas/VendasList';
import Relatorios from './components/Relatorios/Relatorios';
import Login from './components/Login/Login';
import SalesForecast from './components/Forecast/SalesForecast';
import Financeiro from './components/Financeiro/Financeiro';

// Page titles mapping
const pageTitles: Record<string, string> = {
  '/': 'Início',
  '/login': 'Login',
  '/dashboard': 'Dashboard',
  '/clientes': 'Clientes',
  '/produtos': 'Produtos',
  '/estoque': 'Estoque',
  '/vendas': 'Vendas',
  '/financeiro': 'Financeiro',
  '/previsao': 'Previsão de Vendas',
  '/relatorios': 'Relatórios',
};

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

  // Update page title based on route
  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] || 'Sistema';
    document.title = `ERP - ${pageTitle}`;
  }, [location.pathname]);

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
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Public Route */}
                <Route path="/login" element={
                  <PageTransition>
                    <Login />
                  </PageTransition>
                } />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <Home />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <Dashboard />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clientes"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <ClientesList />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/produtos"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <ProdutosList />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/estoque"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <EstoqueList />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vendas"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <VendasList />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/relatorios"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <Relatorios />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/financeiro"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <Financeiro />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/previsao"
                  element={
                    <ProtectedRoute>
                      <PageTransition>
                        <Container>
                          <SalesForecast />
                        </Container>
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />

                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
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