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
import { estoqueAPI } from '../../services/api';
import { Estoque, Produto } from '../../types';

const ProductInfo = styled.div`
  background: #f5f5f7;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

const ProductDetails = styled.p`
  font-size: 14px;
  color: #86868b;
`;

interface EstoqueFormData {
  quantidade: number;
  quantidadeMinima: number;
}

interface EstoqueWithProduto extends Estoque {
  produto?: Produto;
}

interface EstoqueModalProps {
  isOpen: boolean;
  onClose: () => void;
  estoque?: EstoqueWithProduto | null;
  onSave: () => void;
}

const EstoqueModal: React.FC<EstoqueModalProps> = ({
  isOpen,
  onClose,
  estoque,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EstoqueFormData>({
    defaultValues: estoque ? {
      quantidade: estoque.quantidade,
      quantidadeMinima: estoque.quantidadeMinima,
    } : {
      quantidade: 0,
      quantidadeMinima: 0,
    },
  });

  const { mutate: saveEstoque, loading } = useApiMutation();

  React.useEffect(() => {
    if (isOpen && estoque) {
      reset({
        quantidade: estoque.quantidade,
        quantidadeMinima: estoque.quantidadeMinima,
      });
    }
  }, [isOpen, estoque, reset]);

  const onSubmit = async (data: EstoqueFormData) => {
    if (!estoque) return;

    try {
      await saveEstoque(
        (params) => estoqueAPI.update(estoque.id, params),
        {
          quantidade: Number(data.quantidade),
          quantidadeMinima: Number(data.quantidadeMinima),
        },
        {
          successMessage: 'Estoque atualizado com sucesso!',
          onSuccess: onSave,
        }
      );
    } catch (error) {
      // Error handling é feito no hook
    }
  };

  if (!estoque) return null;

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Ajustar Estoque</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        {estoque.produto && (
          <ProductInfo>
            <ProductName>{estoque.produto.nome}</ProductName>
            <ProductDetails>
              Código: {estoque.produto.codigo} | Categoria: {estoque.produto.categoria}
            </ProductDetails>
          </ProductInfo>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="quantidade">Quantidade em Estoque</Label>
            <Input
              id="quantidade"
              type="number"
              min="0"
              {...register('quantidade', { 
                required: 'Quantidade é obrigatória',
                min: { value: 0, message: 'Quantidade não pode ser negativa' }
              })}
              placeholder="0"
            />
            {errors.quantidade && <ErrorMessage>{errors.quantidade.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="quantidadeMinima">Quantidade Mínima</Label>
            <Input
              id="quantidadeMinima"
              type="number"
              min="0"
              {...register('quantidadeMinima', { 
                required: 'Quantidade mínima é obrigatória',
                min: { value: 0, message: 'Quantidade mínima não pode ser negativa' }
              })}
              placeholder="0"
            />
            {errors.quantidadeMinima && <ErrorMessage>{errors.quantidadeMinima.message}</ErrorMessage>}
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

export default EstoqueModal;