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
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.primary};
  padding: ${theme.spacing[6]};
  position: relative;
  overflow: hidden;

  /* Apple-style subtle gradient background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60vh;
    background: linear-gradient(
      180deg,
      ${theme.colors.gray[50]} 0%,
      ${theme.colors.background.primary} 100%
    );
    z-index: 0;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]};
  }
`;

export const LoginCard = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.appleLg};
  padding: ${theme.spacing[16]};
  width: 100%;
  max-width: 480px;
  animation: ${fadeIn} 0.5s ${theme.transitions.appleEase};
  position: relative;
  z-index: 1;
  border: 1px solid ${theme.colors.gray[200]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[10]};
    max-width: 420px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[8]};
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