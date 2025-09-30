import { AlertCircle, Eye, EyeOff, Loader, Lock, ShoppingBag, User, Shield, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import {
  ErrorMessage,
  ForgotPassword,
  FormField,
  InputIcon,
  InputLabel,
  InputWrapper,
  LoginButton,
  LoginCard,
  LoginContainer,
  LoginFooter,
  LoginForm,
  LoginHeader,
  LoginLogo,
  LoginSubtitle,
  LoginTitle,
  PasswordToggle,
  RememberForgotRow,
  RememberMe,
  SignupLink,
  StyledInput,
  LoginLeftPanel,
  LoginRightPanel,
  BrandSection,
  BrandLogo,
  BrandTitle,
  BrandSubtitle,
  FeaturesList,
  FeatureItem
} from '../../styles/components';

const Login: React.FC = () => {
  usePageTitle('Login');
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username.trim()) {
      setError('Por favor, insira seu usuário');
      return;
    }

    if (!formData.password) {
      setError('Por favor, insira sua senha');
      return;
    }

    if (formData.password.length < 3) {
      setError('A senha deve ter no mínimo 3 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.username, formData.password);
      // Navigation is handled by AuthContext and useEffect above
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Show loading state during auth initialization
  if (authLoading) {
    return (
      <LoginContainer>
        <LoginRightPanel>
          <LoginCard>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '16px', color: '#86868b' }}>Carregando...</p>
            </div>
          </LoginCard>
        </LoginRightPanel>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <LoginLeftPanel>
        <BrandSection>
          <BrandTitle>ERP de Gestão Empresarial</BrandTitle>
          <BrandSubtitle>
            Transforme dados em decisões estratégicas. Potencialize seu negócio com tecnologia de ponta e inteligência artificial.
          </BrandSubtitle>

          <FeaturesList>
            <FeatureItem>
              <TrendingUp size={24} />
              <div>
                <strong>Analytics em Tempo Real</strong>
                <span>KPIs e métricas atualizadas instantaneamente</span>
              </div>
            </FeatureItem>
            <FeatureItem>
              <BarChart3 size={24} />
              <div>
                <strong>Inteligência Artificial</strong>
                <span>Previsões de vendas com Machine Learning</span>
              </div>
            </FeatureItem>
            <FeatureItem>
              <Zap size={24} />
              <div>
                <strong>Automação Inteligente</strong>
                <span>Processos otimizados e produtividade máxima</span>
              </div>
            </FeatureItem>
            <FeatureItem>
              <Shield size={24} />
              <div>
                <strong>Segurança Enterprise</strong>
                <span>Criptografia e compliance garantidos</span>
              </div>
            </FeatureItem>
          </FeaturesList>
        </BrandSection>
      </LoginLeftPanel>

      <LoginRightPanel>
        <LoginCard>
          <LoginHeader>
            <LoginTitle>Acesse sua Plataforma</LoginTitle>
            <LoginSubtitle>Entre com suas credenciais para continuar</LoginSubtitle>
          </LoginHeader>

          <LoginForm onSubmit={handleSubmit}>
            <FormField>
              <InputLabel htmlFor="username">Usuário</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <User size={20} />
                </InputIcon>
                <StyledInput
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="username"
                  autoFocus
                />
              </InputWrapper>
            </FormField>

            <FormField>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <InputWrapper>
                <InputIcon>
                  <Lock size={20} />
                </InputIcon>
                <StyledInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <PasswordToggle
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputWrapper>
            </FormField>

            {error && (
              <ErrorMessage>
                <AlertCircle size={18} />
                <span>{error}</span>
              </ErrorMessage>
            )}

            <RememberForgotRow>
              <RememberMe>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span>Lembrar-me</span>
              </RememberMe>
              <ForgotPassword href="#" onClick={(e) => e.preventDefault()}>
                Esqueceu a senha?
              </ForgotPassword>
            </RememberForgotRow>

            <LoginButton type="submit" disabled={isLoading} $isLoading={isLoading}>
              {isLoading ? (
                <>
                  <Loader size={20} />
                  <span>Entrando...</span>
                </>
              ) : (
                <span>Entrar</span>
              )}
            </LoginButton>
          </LoginForm>

          <LoginFooter>
            Não tem uma conta?{' '}
            <SignupLink href="#" onClick={(e) => e.preventDefault()}>
              Cadastre-se
            </SignupLink>
          </LoginFooter>
        </LoginCard>
      </LoginRightPanel>
    </LoginContainer>
  );
};

export default Login;
