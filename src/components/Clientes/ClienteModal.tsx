import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import {
  Modal,
  ModalContent,
  Button,
  Input,
  FormGroup,
  Label,
  ErrorMessage,
} from '../../styles/GlobalStyles';
import {
  ModalHeader,
  ModalTitle,
  CloseButton,
  Form,
  ButtonGroup,
} from '../../styles/components';
import { useApiMutation } from '../../hooks/useApi';
import { clientesAPI } from '../../services/api';
import { Cliente } from '../../types';

interface ClienteFormData {
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
}

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente?: Cliente | null;
  onSave: () => void;
}

const ClienteModal: React.FC<ClienteModalProps> = ({
  isOpen,
  onClose,
  cliente,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClienteFormData>({
    defaultValues: cliente ? {
      nome: cliente.nome,
      cpf: cliente.cpf,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
      email: cliente.email,
    } : {
      nome: '',
      cpf: '',
      endereco: '',
      telefone: '',
      email: '',
    },
  });

  const { mutate: saveCliente, loading } = useApiMutation();

  React.useEffect(() => {
    if (isOpen) {
      reset(cliente ? {
        nome: cliente.nome,
        cpf: cliente.cpf,
        endereco: cliente.endereco,
        telefone: cliente.telefone,
        email: cliente.email,
      } : {
        nome: '',
        cpf: '',
        endereco: '',
        telefone: '',
        email: '',
      });
    }
  }, [isOpen, cliente, reset]);

  const onSubmit = async (data: ClienteFormData) => {
    try {
      if (cliente) {
        await saveCliente(
          (params) => clientesAPI.update(cliente.id, params),
          data,
          {
            successMessage: 'Cliente atualizado com sucesso!',
            onSuccess: onSave,
          }
        );
      } else {
        await saveCliente(
          (params) => clientesAPI.create(params),
          data,
          {
            successMessage: 'Cliente cadastrado com sucesso!',
            onSuccess: onSave,
          }
        );
      }
    } catch (error) {
      // Error handling é feito no hook
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {cliente ? 'Editar Cliente' : 'Novo Cliente'}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              {...register('nome', { required: 'Nome é obrigatório' })}
              placeholder="Nome completo"
            />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              {...register('cpf', { 
                required: 'CPF é obrigatório',
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: 'CPF deve estar no formato 000.000.000-00'
                }
              })}
              placeholder="000.000.000-00"
            />
            {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              {...register('endereco', { required: 'Endereço é obrigatório' })}
              placeholder="Endereço completo"
            />
            {errors.endereco && <ErrorMessage>{errors.endereco.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              {...register('telefone', { required: 'Telefone é obrigatório' })}
              placeholder="(00) 00000-0000"
            />
            {errors.telefone && <ErrorMessage>{errors.telefone.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              placeholder="email@exemplo.com"
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default ClienteModal;