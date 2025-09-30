import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import {
  Card,
  Button,
  Input,
  Select,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  SearchBar,
} from '../../styles/GlobalStyles';
import {
  HeaderSection,
  Title,
  EmptyState,
  EmptyIcon,
  ActionButtons,
  PriceCell,
} from '../../styles/components';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { produtosAPI } from '../../services/api';
import { Produto } from '../../types';
import ProdutoModal from './ProdutoModal';
import { theme } from '../../styles/theme';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: ${theme.spacing[4]};
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${theme.colors.gray[200]};
  border-top-color: ${theme.colors.blue.DEFAULT};
  border-radius: ${theme.borderRadius.full};
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text.secondary};
`;

const ProdutosList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);

  const { data: produtos, loading, refetch } = useApi(() => produtosAPI.getAll());
  const { mutate: deleteProduto } = useApiMutation();

  const categories = [...new Set(produtos?.map(p => p.categoria) || [])];

  const filteredProdutos = produtos?.filter((produto) => {
    const matchesSearch = 
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || produto.categoria === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }) || [];

  const handleEdit = (produto: Produto) => {
    setEditingProduto(produto);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await deleteProduto(
        () => produtosAPI.delete(id),
        undefined,
        {
          successMessage: 'Produto excluído com sucesso!',
          onSuccess: () => refetch(),
        }
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduto(null);
  };

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Carregando produtos...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <>
      <HeaderSection>
        <Title>Produtos</Title>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          Novo Produto
        </Button>
      </HeaderSection>

      <Card style={{ padding: '24px', marginBottom: '24px' }}>
        <SearchBar>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#86868b',
              }}
            />
            <Input
              type="text"
              placeholder="Buscar por nome, código ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </SearchBar>
      </Card>

      <Card>
        {filteredProdutos.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Package size={32} color="#86868b" />
            </EmptyIcon>
            <h3>Nenhum produto encontrado</h3>
            <p>
              {searchTerm || categoryFilter
                ? 'Tente ajustar os filtros de busca'
                : 'Comece cadastrando seu primeiro produto'}
            </p>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Código</TableHeader>
                <TableHeader>Categoria</TableHeader>
                <TableHeader>Preço</TableHeader>
                <TableHeader>Descrição</TableHeader>
                <TableHeader>Ações</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.codigo}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <PriceCell>
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </PriceCell>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell>
                    <ActionButtons>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleEdit(produto)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(produto.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      <ProdutoModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        produto={editingProduto}
        onSave={handleSaveSuccess}
      />
    </>
  );
};

export default ProdutosList;