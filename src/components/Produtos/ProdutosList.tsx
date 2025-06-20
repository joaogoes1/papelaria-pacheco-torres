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
import { useApi, useApiMutation } from '../../hooks/useApi';
import { produtosAPI } from '../../services/api';
import { Produto } from '../../types';
import ProdutoModal from './ProdutoModal';

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
  flex: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #86868b;
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PriceCell = styled(TableCell)`
  font-weight: 600;
  color: #34c759;
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
    return <div>Carregando...</div>;
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