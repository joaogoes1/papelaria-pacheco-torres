import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { X, Plus, Trash2 } from 'lucide-react';
import {
  Modal,
  ModalContent,
  Button,
  Select,
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
} from '../../styles/components';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { vendasAPI, clientesAPI, produtosAPI, estoqueAPI } from '../../services/api';
import { ItemVenda } from '../../types';

const ItemsSection = styled.div`
  border: 1px solid #e5e5e7;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 12px;
  align-items: end;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TotalSection = styled.div`
  background: #f5f5f7;
  padding: 16px;
  border-radius: 8px;
  text-align: right;
`;

const TotalValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

interface VendaFormData {
  clienteId: number;
  itens: {
    produtoId: number;
    quantidade: number;
  }[];
}

interface VendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const VendaModal: React.FC<VendaModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [total, setTotal] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<VendaFormData>({
    defaultValues: {
      clienteId: 0,
      itens: [{ produtoId: 0, quantidade: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itens',
  });

  const { data: clientes } = useApi(() => clientesAPI.getAll());
  const { data: produtos } = useApi(() => produtosAPI.getAll());
  const { data: estoque } = useApi(() => estoqueAPI.getAll());
  const { mutate: saveVenda, loading } = useApiMutation();

  const watchedItens = watch('itens');

  // Calcula o total sempre que os itens mudam
  useEffect(() => {
    let newTotal = 0;
    watchedItens.forEach((item) => {
      const produto = produtos?.find(p => p.id === Number(item.produtoId));
      if (produto && item.quantidade) {
        newTotal += produto.preco * Number(item.quantidade);
      }
    });
    setTotal(newTotal);
  }, [watchedItens, produtos]);

  React.useEffect(() => {
    if (isOpen) {
      reset({
        clienteId: 0,
        itens: [{ produtoId: 0, quantidade: 1 }],
      });
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: VendaFormData) => {
    try {
      // Valida se há estoque suficiente
      for (const item of data.itens) {
        const estoqueItem = estoque?.find(e => e.produtoId === Number(item.produtoId));
        if (!estoqueItem || estoqueItem.quantidade < Number(item.quantidade)) {
          throw new Error(`Estoque insuficiente para o produto selecionado`);
        }
      }

      const vendaData = {
        clienteId: Number(data.clienteId),
        itens: data.itens.map(item => {
          const produto = produtos?.find(p => p.id === Number(item.produtoId));
          return {
            produtoId: Number(item.produtoId),
            quantidade: Number(item.quantidade),
            precoUnitario: produto?.preco || 0,
          };
        }),
        total,
      };

      await saveVenda(
        (params) => vendasAPI.create(params),
        vendaData,
        {
          successMessage: 'Venda registrada com sucesso!',
          onSuccess: onSave,
        }
      );

      // Atualiza o estoque
      for (const item of data.itens) {
        const estoqueItem = estoque?.find(e => e.produtoId === Number(item.produtoId));
        if (estoqueItem) {
          await estoqueAPI.update(estoqueItem.id, {
            quantidade: estoqueItem.quantidade - Number(item.quantidade),
          });
        }
      }
    } catch (error) {
      // Error handling é feito no hook
    }
  };

  const addItem = () => {
    append({ produtoId: 0, quantidade: 1 });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getAvailableStock = (produtoId: number) => {
    const estoqueItem = estoque?.find(e => e.produtoId === produtoId);
    return estoqueItem?.quantidade || 0;
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent style={{ maxWidth: '700px' }}>
        <ModalHeader>
          <ModalTitle>Nova Venda</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="clienteId">Cliente</Label>
            <Select
              id="clienteId"
              {...register('clienteId', { 
                required: 'Cliente é obrigatório',
                validate: (value) => Number(value) > 0 || 'Selecione um cliente'
              })}
            >
              <option value={0}>Selecione um cliente</option>
              {clientes?.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </Select>
            {errors.clienteId && <ErrorMessage>{errors.clienteId.message}</ErrorMessage>}
          </FormGroup>

          <ItemsSection>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Label>Itens da Venda</Label>
              <Button type="button" size="sm" onClick={addItem}>
                <Plus size={14} />
                Adicionar Item
              </Button>
            </div>

            {fields.map((field, index) => (
              <ItemRow key={field.id}>
                <FormGroup>
                  <Label>Produto</Label>
                  <Select
                    {...register(`itens.${index}.produtoId`, { 
                      required: 'Produto é obrigatório',
                      validate: (value) => Number(value) > 0 || 'Selecione um produto'
                    })}
                  >
                    <option value={0}>Selecione um produto</option>
                    {produtos?.map((produto) => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome} - R$ {produto.preco.toFixed(2)}
                      </option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    min="1"
                    max={getAvailableStock(Number(watchedItens[index]?.produtoId))}
                    {...register(`itens.${index}.quantidade`, { 
                      required: 'Quantidade é obrigatória',
                      min: { value: 1, message: 'Mínimo 1' },
                      max: { 
                        value: getAvailableStock(Number(watchedItens[index]?.produtoId)),
                        message: 'Estoque insuficiente'
                      }
                    })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Estoque</Label>
                  <div style={{ 
                    padding: '12px 16px', 
                    background: '#f5f5f7', 
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#86868b'
                  }}>
                    {getAvailableStock(Number(watchedItens[index]?.produtoId))}
                  </div>
                </FormGroup>

                <div style={{ display: 'flex', alignItems: 'end', paddingBottom: '2px' }}>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => removeItem(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </ItemRow>
            ))}
          </ItemsSection>

          <TotalSection>
            <Label>Total da Venda</Label>
            <TotalValue>R$ {total.toFixed(2).replace('.', ',')}</TotalValue>
          </TotalSection>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || total === 0}>
              {loading ? 'Salvando...' : 'Finalizar Venda'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default VendaModal;