import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
import { produtosAPI } from '../../services/api';
import { Produto } from '../../types';

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }

  &::placeholder {
    color: #86868b;
  }
`;

interface ProdutoFormData {
  nome: string;
  codigo: string;
  preco: number;
  categoria: string;
  descricao: string;
}

interface ProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto | null;
  onSave: () => void;
}

const ProdutoModal: React.FC<ProdutoModalProps> = ({
  isOpen,
  onClose,
  produto,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProdutoFormData>({
    defaultValues: produto ? {
      nome: produto.nome,
      codigo: produto.codigo,
      preco: produto.preco,
      categoria: produto.categoria,
      descricao: produto.descricao,
    } : {
      nome: '',
      codigo: '',
      preco: 0,
      categoria: '',
      descricao: '',
    },
  });

  const { mutate: saveProduto, loading } = useApiMutation();

  React.useEffect(() => {
    if (isOpen) {
      reset(produto ? {
        nome: produto.nome,
        codigo: produto.codigo,
        preco: produto.preco,
        categoria: produto.categoria,
        descricao: produto.descricao,
      } : {
        nome: '',
        codigo: '',
        preco: 0,
        categoria: '',
        descricao: '',
      });
    }
  }, [isOpen, produto, reset]);

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      const produtoData = {
        ...data,
        preco: Number(data.preco),
      };

      if (produto) {
        await saveProduto(
          (params) => produtosAPI.update(produto.id, params),
          produtoData,
          {
            successMessage: 'Produto atualizado com sucesso!',
            onSuccess: onSave,
          }
        );
      } else {
        await saveProduto(
          (params) => produtosAPI.create(params),
          produtoData,
          {
            successMessage: 'Produto cadastrado com sucesso!',
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
            {produto ? 'Editar Produto' : 'Novo Produto'}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="nome">Nome do Produto</Label>
            <Input
              id="nome"
              {...register('nome', { required: 'Nome é obrigatório' })}
              placeholder="Nome do produto"
            />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="codigo">Código</Label>
            <Input
              id="codigo"
              {...register('codigo', { required: 'Código é obrigatório' })}
              placeholder="Código do produto"
            />
            {errors.codigo && <ErrorMessage>{errors.codigo.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="preco">Preço</Label>
            <Input
              id="preco"
              type="number"
              step="0.01"
              min="0"
              {...register('preco', { 
                required: 'Preço é obrigatório',
                min: { value: 0, message: 'Preço deve ser maior que zero' }
              })}
              placeholder="0,00"
            />
            {errors.preco && <ErrorMessage>{errors.preco.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="categoria">Categoria</Label>
            <Input
              id="categoria"
              {...register('categoria', { required: 'Categoria é obrigatória' })}
              placeholder="Categoria do produto"
            />
            {errors.categoria && <ErrorMessage>{errors.categoria.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="descricao">Descrição</Label>
            <TextArea
              id="descricao"
              {...register('descricao', { required: 'Descrição é obrigatória' })}
              placeholder="Descrição do produto"
            />
            {errors.descricao && <ErrorMessage>{errors.descricao.message}</ErrorMessage>}
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

export default ProdutoModal;