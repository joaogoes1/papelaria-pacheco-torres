import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { X, Plus, Trash2 } from 'lucide-react';
import {
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
import AnimatedModal from '../AnimatedModal';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { vendasAPI, clientesAPI, produtosAPI, estoqueAPI } from '../../services/api';
import { ItemVenda } from '../../types';

const ModalContentWrapper = styled.div`
  padding: 32px;
  min-width: 1000px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 1280px) {
    min-width: 90vw;
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

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
  clienteId: string;
  itens: {
    produtoId: string;
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
      clienteId: '',
      itens: [],
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
      const produto = produtos?.find(p => p.id === item.produtoId);
      console.log('Calculando total - Item:', item, 'Produto encontrado:', produto);
      if (produto && item.quantidade) {
        newTotal += produto.preco * Number(item.quantidade);
      }
    });
    console.log('Total calculado:', newTotal);
    setTotal(newTotal);
  }, [watchedItens, produtos]);

  React.useEffect(() => {
    if (isOpen) {
      reset({
        clienteId: '',
        itens: [],
      });
      setTotal(0);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: VendaFormData) => {
    try {
      // Valida se há pelo menos um item
      if (!data.itens || data.itens.length === 0) {
        throw new Error('Adicione pelo menos um item à venda');
      }

      // Valida se há estoque suficiente
      for (const item of data.itens) {
        const estoqueItem = estoque?.find(e => e.produtoId === item.produtoId);
        if (!estoqueItem || estoqueItem.quantidade < Number(item.quantidade)) {
          throw new Error(`Estoque insuficiente para o produto selecionado`);
        }
      }

      const vendaData = {
        clienteId: data.clienteId,
        itens: data.itens.map(item => {
          const produto = produtos?.find(p => p.id === item.produtoId);
          return {
            produtoId: item.produtoId,
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
          successMessage: 'Venda registrada com sucesso! Estoque atualizado automaticamente.',
          onSuccess: () => {
            onSave();
            onClose();
          },
        }
      );

      // Não precisa atualizar estoque manualmente - o backend já faz isso automaticamente
    } catch (error) {
      // Error handling é feito no hook
    }
  };

  const addItem = () => {
    append({ produtoId: '', quantidade: 1 });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  const getAvailableStock = (produtoId: string) => {
    if (!produtoId) return 0;
    const estoqueItem = estoque?.find(e => e.produtoId === produtoId);
    return estoqueItem?.quantidade || 0;
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <ModalContentWrapper>
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
                validate: (value) => value !== '' || 'Selecione um cliente'
              })}
            >
              <option value="">Selecione um cliente</option>
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
                      validate: (value) => value !== '' || 'Selecione um produto'
                    })}
                  >
                    <option value="">Selecione um produto</option>
                    {produtos?.map((produto) => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome} - R$ {produto.preco.toFixed(2)}
                      </option>
                    ))}
                  </Select>
                  {errors.itens?.[index]?.produtoId && (
                    <ErrorMessage>{errors.itens[index]?.produtoId?.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Quantidade</Label>
                  <Input
                    type="number"
                    min="1"
                    max={getAvailableStock(watchedItens[index]?.produtoId)}
                    {...register(`itens.${index}.quantidade`, {
                      required: 'Quantidade é obrigatória',
                      min: { value: 1, message: 'Mínimo 1' },
                      validate: (value) => {
                        const stock = getAvailableStock(watchedItens[index]?.produtoId);
                        return Number(value) <= stock || `Máximo ${stock} unidades`;
                      }
                    })}
                  />
                  {errors.itens?.[index]?.quantidade && (
                    <ErrorMessage>{errors.itens[index]?.quantidade?.message}</ErrorMessage>
                  )}
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
                    {getAvailableStock(watchedItens[index]?.produtoId)}
                  </div>
                </FormGroup>

                <div style={{ display: 'flex', alignItems: 'end', paddingBottom: '2px' }}>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() => removeItem(index)}
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
            <Button type="submit" disabled={loading || fields.length === 0}>
              {loading ? 'Salvando...' : 'Finalizar Venda'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContentWrapper>
    </AnimatedModal>
  );
};

export default VendaModal;