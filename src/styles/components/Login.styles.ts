import styled, { keyframes } from 'styled-components';
import { theme } from '../theme';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${theme.colors.white};
  position: relative;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const LoginLeftPanel = styled.div`
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[16]};
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 600px;
    height: 600px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 25s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -40%;
    left: -20%;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    animation: float 20s ease-in-out infinite reverse;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-30px, -30px) rotate(180deg); }
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

export const LoginRightPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[10]};
  background: ${theme.colors.gray[50]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[6]};
  }
`;

export const LoginCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: ${theme.spacing[12]};
  width: 100%;
  max-width: 480px;
  animation: ${fadeIn} 0.6s ${theme.transitions.appleEase};
  position: relative;
  border: 1px solid ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]};
    max-width: 420px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[6]};
    border-radius: ${theme.borderRadius.xl};
  }
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[12]};
`;

export const LoginLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[6]};

  svg {
    color: ${theme.colors.blue.DEFAULT};
    stroke-width: 1.5;
  }
`;

export const LoginTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
  letter-spacing: ${theme.typography.letterSpacing.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }
`;

export const LoginSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.fontWeight.regular};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
`;

export const FormField = styled.div`
  position: relative;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: ${theme.spacing[4]};
  color: ${theme.colors.text.tertiary};
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 1;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[12]};
  border: 1.5px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.transitions.fast};
  background: ${theme.colors.white};
  font-family: ${theme.typography.fontFamily.primary};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue.DEFAULT};
    box-shadow: 0 0 0 3px ${theme.colors.blue.light}20;
  }

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:disabled {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.text.tertiary};
    cursor: not-allowed;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: ${theme.spacing[4]};
  background: none;
  border: none;
  color: ${theme.colors.text.tertiary};
  cursor: pointer;
  padding: ${theme.spacing[1]};
  display: flex;
  align-items: center;
  transition: color ${theme.transitions.fast};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    color: ${theme.colors.blue.DEFAULT};
    background: ${theme.colors.gray[100]};
  }

  &:focus {
    outline: 2px solid ${theme.colors.blue.DEFAULT};
    outline-offset: 2px;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: ${theme.colors.error}10;
  border: 1px solid ${theme.colors.error}40;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};

  svg {
    flex-shrink: 0;
  }
`;

export const RememberForgotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -${theme.spacing[2]} 0 ${theme.spacing[2]};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${theme.spacing[3]};
    align-items: flex-start;
  }
`;

export const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  user-select: none;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${theme.colors.blue.DEFAULT};
    border-radius: ${theme.borderRadius.sm};
  }
`;

export const ForgotPassword = styled.a`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.blue.DEFAULT};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.medium};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.blue.dark};
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoginButton = styled.button<{ $isLoading?: boolean }>`
  width: 100%;
  padding: ${theme.spacing[4]};
  background: ${theme.colors.blue.DEFAULT};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: ${({ $isLoading }) => ($isLoading ? 'not-allowed' : 'pointer')};
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  box-shadow: ${theme.shadows.sm};
  font-family: ${theme.typography.fontFamily.primary};

  &:hover:not(:disabled) {
    background: ${theme.colors.blue.dark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    animation: ${({ $isLoading }) => ($isLoading ? spin : 'none')} 1s linear infinite;
  }
`;

export const LoginFooter = styled.div`
  margin-top: ${theme.spacing[8]};
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const SignupLink = styled.a`
  color: ${theme.colors.blue.DEFAULT};
  text-decoration: none;
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.blue.dark};
  }
`;

export const DemoCredentials = styled.div`
  margin-top: ${theme.spacing[6]};
  padding: ${theme.spacing[4]};
  background: ${theme.colors.gray[50]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};

  strong {
    color: ${theme.colors.text.primary};
    display: block;
    margin-bottom: ${theme.spacing[2]};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  code {
    background: ${theme.colors.white};
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    border-radius: ${theme.borderRadius.sm};
    font-family: ${theme.typography.fontFamily.mono};
    color: ${theme.colors.blue.DEFAULT};
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const BrandSection = styled.div`
  text-align: center;
  z-index: 1;
  position: relative;
`;

export const BrandLogo = styled.div`
  font-size: 64px;
  margin-bottom: ${theme.spacing[6]};
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
`;

export const BrandTitle = styled.h1`
  font-size: 52px;
  font-weight: 800;
  margin-bottom: ${theme.spacing[6]};
  color: #FFFFFF;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.01em;
  line-height: 1.15;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.3) 100%);
    border-radius: 2px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 44px;
  }
`;

export const BrandSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: #FFFFFF;
  max-width: 400px;
  margin: 0 auto ${theme.spacing[12]};
  line-height: ${theme.typography.lineHeight.relaxed};
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
  max-width: 400px;
  margin: 0 auto;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[4]};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.lg};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all ${theme.transitions.normal};

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }

  svg {
    flex-shrink: 0;
    color: white;
  }

  div {
    flex: 1;

    strong {
      display: block;
      font-weight: ${theme.typography.fontWeight.semibold};
      margin-bottom: 4px;
      font-size: ${theme.typography.fontSize.base};
    }

    span {
      font-size: ${theme.typography.fontSize.sm};
      opacity: 0.9;
    }
  }
`;