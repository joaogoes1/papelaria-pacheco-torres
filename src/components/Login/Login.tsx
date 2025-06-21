import React, { useState } from 'react';
import styled from 'styled-components';
import { useApiMutation } from '../../hooks/useApi';
import { authAPI } from '../../services/api';
import { Card, Button, Input } from '../../styles/GlobalStyles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f7;
`;

const LoginCard = styled(Card)`
  width: 400px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, loading } = useApiMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(
      () => authAPI.login({ username, password }),
      {},
      {
        onSuccess: (data: any) => {
          localStorage.setItem('token', data.token);
          toast.success('Login bem-sucedido!');
          navigate('/');
        },
      }
    );
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login; 