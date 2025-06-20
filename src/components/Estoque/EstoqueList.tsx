import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Package, Edit, AlertTriangle } from 'lucide-react';
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
  Badge,
} from '../../styles/GlobalStyles';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { estoqueAPI, produtosAPI } from '../../services/api';
import { Estoque, Produto } from '../../types';
import EstoqueModal from './EstoqueModal';

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

interface EstoqueWithProduto extends Estoque {
  produto?: Produto;
}

const EstoqueList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEstoque, setEditingEstoque] = useState<EstoqueWithProduto | null>(null);
  const [estoqueWithProdutos, setEstoqueWithProdutos] = useState<EstoqueWithProduto[]>([]);

  const { data: estoque, loading: loadingEstoque, refetch } = useApi(() => estoqueAPI.getAll());
  const { data: produtos, loading: loadingProdutos } = useApi(() => produtosAPI.getAll());

  // Combina dados de estoque com produtos
  useEffect(() => {
    if (estoque && produtos) {
      const combined = estoque.map(item => ({
        ...item,
        produto: produtos.find(p => p.id === item.produtoId)
      }));
      setEstoqueWithProdutos(combined);
    }
  }, [estoque, produtos]);

  const categories = [...new Set(produtos?.map(p => p.categoria) || [])];

  const filteredEstoque = estoqueWithProdutos.filter((item) => {
    if (!item.produto) return false;
    
    const matchesSearch = 
      item.produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.produto.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || item.produto.categoria === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (item: EstoqueWithProduto) => {
    setEditingEstoque(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEstoque(null);
  };

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
  };

  const getStockStatus = (quantidade: number, minima: number) => {
    if (quantidade === 0) {
      return { variant: 'danger' as const, label: 'Sem estoque' };
    } else if (quantidade <= minima) {
      return { variant: 'warning' as const, label: 'Estoque baixo' };
    } else {
      return { variant: 'success' as const, label: 'Em estoque' };
    }
  };

  if (loadingEstoque || loadingProdutos) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <HeaderSection>
        <Title>Controle de Estoque</Title>
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
              placeholder="Buscar por produto ou código..."
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
        {filteredEstoque.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Package size={32} color="#86868b" />
            </EmptyIcon>
            <h3>Nenhum item encontrado</h3>
            <p>
              {searchTerm || categoryFilter
                ? 'Tente ajustar os filtros de busca'
                : 'Não há itens no estoque'}
            </p>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Produto</TableHeader>
                <TableHeader>Código</TableHeader>
                <TableHeader>Categoria</TableHeader>
                <TableHeader>Quantidade</TableHeader>
                <TableHeader>Mínimo</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Ações</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredEstoque.map((item) => {
                const status = getStockStatus(item.quantidade, item.quantidadeMinima);
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.produto?.nome}
                        {item.quantidade <= item.quantidadeMinima && (
                          <AlertTriangle size={16} color="#ffa500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{item.produto?.codigo}</TableCell>
                    <TableCell>{item.produto?.categoria}</TableCell>
                    <TableCell>
                      <strong>{item.quantidade}</strong>
                    </TableCell>
                    <TableCell>{item.quantidadeMinima}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ActionButtons>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit size={14} />
                          Ajustar
                        </Button>
                      </ActionButtons>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      <EstoqueModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        estoque={editingEstoque}
        onSave={handleSaveSuccess}
      />
    </>
  );
};

export default EstoqueList;