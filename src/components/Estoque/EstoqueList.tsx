import { AlertTriangle, Edit, Package, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import { estoqueAPI, produtosAPI } from '../../services/api';
import {
  Badge,
  Button,
  Card,
  Input,
  SearchBar,
  Select,
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '../../styles/GlobalStyles';
import {
  ActionButtons,
  EmptyIcon,
  EmptyState,
  HeaderSection,
  Title,
} from '../../styles/components';
import { theme } from '../../styles/theme';
import { Estoque, Produto } from '../../types';
import { TableSkeleton, SearchBarSkeleton, SearchInputSkeleton, PaginationSkeleton, Skeleton } from '../Skeleton';
import EstoqueModal from './EstoqueModal';

interface EstoqueWithProduto extends Estoque {
  produto?: Produto;
}

const EstoqueList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEstoque, setEditingEstoque] = useState<EstoqueWithProduto | null>(null);
  const [estoqueWithProdutos, setEstoqueWithProdutos] = useState<EstoqueWithProduto[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: produtos, loading: loadingProdutos } = useApi(() => produtosAPI.getAll());

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch paginated estoque data
  const fetchEstoque = async () => {
    try {
      setLoading(true);
      const searchParam = debouncedSearchTerm.trim() || undefined;
      const lowStockParam = showLowStock || undefined;
      const response = await estoqueAPI.getAll(currentPage, pageSize, searchParam, lowStockParam);
      let estoqueData: Estoque[] = [];

      // Check if response is paginated (Spring Boot Page format)
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        const pageData = response.data as any;
        estoqueData = pageData.content;
        setTotalPages(pageData.totalPages);
        setTotalElements(pageData.totalElements);
      } else {
        // Fallback for non-paginated response (simple array)
        estoqueData = response.data as Estoque[];
        setTotalElements(estoqueData.length);
        setTotalPages(1);
      }

      // Combine with produtos
      if (produtos) {
        let combined = estoqueData.map(item => ({
          ...item,
          produto: produtos.find(p => p.id === item.produtoId)
        }));

        // Apply client-side category filter (backend doesn't support this)
        if (categoryFilter) {
          combined = combined.filter((item) => {
            if (!item.produto) return false;
            return item.produto.categoria === categoryFilter;
          });
        }

        setEstoqueWithProdutos(combined);
      }
    } catch (error) {
      console.error('Erro ao carregar estoque:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, pageSize, search, lowStock filter, category, or produtos change
  useEffect(() => {
    if (produtos) {
      fetchEstoque();
    }
  }, [currentPage, pageSize, debouncedSearchTerm, showLowStock, categoryFilter, produtos]);

  const categories = [...new Set(produtos?.map(p => p.categoria) || [])];

  const handleEdit = (item: EstoqueWithProduto) => {
    setEditingEstoque(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEstoque(null);
  };

  const handleSaveSuccess = () => {
    fetchEstoque();
    handleCloseModal();
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <PageButton
            key={i}
            $active={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </PageButton>
        );
      }
    } else {
      // Show first page
      pages.push(
        <PageButton
          key={0}
          $active={currentPage === 0}
          onClick={() => setCurrentPage(0)}
        >
          1
        </PageButton>
      );

      // Show ellipsis if needed
      if (currentPage > 2) {
        pages.push(<PageEllipsis key="ellipsis1">...</PageEllipsis>);
      }

      // Show pages around current page
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PageButton
            key={i}
            $active={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </PageButton>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 3) {
        pages.push(<PageEllipsis key="ellipsis2">...</PageEllipsis>);
      }

      // Show last page
      pages.push(
        <PageButton
          key={totalPages - 1}
          $active={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(totalPages - 1)}
        >
          {totalPages}
        </PageButton>
      );
    }

    return pages;
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

  return (
    <>
      <HeaderSection>
        <Title>Controle de Estoque</Title>
      </HeaderSection>

      {loading || loadingProdutos ? (
        <>
          <SearchBarSkeleton>
            <SearchInputSkeleton>
              <Skeleton width="100%" height="44px" radius="12px" />
            </SearchInputSkeleton>
            <div style={{ minWidth: '150px' }}>
              <Skeleton width="100%" height="44px" radius="12px" />
            </div>
            <div style={{ minWidth: '200px' }}>
              <Skeleton width="100%" height="44px" radius="12px" />
            </div>
          </SearchBarSkeleton>

          <Card>
            <TableSkeleton rows={pageSize} columns={6} />
            <PaginationSkeleton />
          </Card>
        </>
      ) : (
        <>
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
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                <input
                  type="checkbox"
                  checked={showLowStock}
                  onChange={(e) => setShowLowStock(e.target.checked)}
                />
                Mostrar apenas estoque baixo
              </label>
            </SearchBar>
          </Card>

          <Card>
            {estoqueWithProdutos.length === 0 ? (
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
                  {estoqueWithProdutos.map((item) => {
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
            <PaginationContainer>
              <PageSizeSelector>
                <label>Itens por página:</label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(0);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </PageSizeSelector>

              <PaginationInfo>
                Mostrando {estoqueWithProdutos.length} de {totalElements} registros
              </PaginationInfo>

              <PaginationButtons>
                <PageButton
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage === 0}
                >
                  ←
                </PageButton>

                {renderPageNumbers()}

                <PageButton
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage >= totalPages - 1}
                >
                  →
                </PageButton>
              </PaginationButtons>
            </PaginationContainer>
          </Card>
        </>
      )}

      <EstoqueModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        estoque={editingEstoque}
        onSave={handleSaveSuccess}
      />
    </>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 15px 15px;
  border-top: 1px solid #ddd;
  flex-wrap: wrap;
  gap: 15px;
`;

const PageSizeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    color: #666;
    font-size: 14px;
  }

  select {
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

const PaginationInfo = styled.div`
  color: #666;
  font-size: 14px;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 8px 12px;
  background-color: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : '#007bff'};
  border: 1px solid ${props => props.$active ? '#007bff' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#0056b3' : '#f0f0f0'};
    border-color: #007bff;
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #ccc;
    border-color: #e9ecef;
    cursor: not-allowed;
  }
`;

const PageEllipsis = styled.span`
  padding: 8px 4px;
  color: #666;
`;

export default EstoqueList;