import { Eye, Plus, Search, ShoppingCart, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { clientesAPI, produtosAPI, vendasAPI } from '../../services/api';
import {
  Button,
  Card,
  Input,
  SearchBar,
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
  TotalCell,
} from '../../styles/components';
import { theme } from '../../styles/theme';
import { Cliente, Produto, Venda } from '../../types';
import VendaDetailsModal from './VendaDetailsModal';
import VendaModal from './VendaModal';

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

interface VendaWithDetails extends Venda {
  cliente?: Cliente;
  produtosDetalhes?: Produto[];
}

const VendasList: React.FC = () => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [debouncedNomeCliente, setDebouncedNomeCliente] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [debouncedValorMin, setDebouncedValorMin] = useState('');
  const [debouncedValorMax, setDebouncedValorMax] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState<VendaWithDetails | null>(null);
  const [vendasWithDetails, setVendasWithDetails] = useState<VendaWithDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: clientes, loading: loadingClientes } = useApi(() => clientesAPI.getAll());
  const { data: produtos, loading: loadingProdutos } = useApi(() => produtosAPI.getAll());
  const { mutate: deleteVenda } = useApiMutation();

  // Debounce filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNomeCliente(nomeCliente);
      setDebouncedValorMin(valorMin);
      setDebouncedValorMax(valorMax);
    }, 500);

    return () => clearTimeout(timer);
  }, [nomeCliente, valorMin, valorMax]);

  // Fetch paginated vendas data
  const fetchVendas = async () => {
    try {
      setLoading(true);

      const valorMinNum = debouncedValorMin ? parseFloat(debouncedValorMin) : undefined;
      const valorMaxNum = debouncedValorMax ? parseFloat(debouncedValorMax) : undefined;

      const response = await vendasAPI.getAll(
        currentPage,
        pageSize,
        debouncedNomeCliente || undefined,
        valorMinNum,
        valorMaxNum
      );
      let vendasData: Venda[] = [];

      // Check if response is paginated (Spring Boot Page format)
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        const pageData = response.data as any;
        vendasData = pageData.content;
        setTotalPages(pageData.totalPages);
        setTotalElements(pageData.totalElements);
      } else {
        // Fallback for non-paginated response (simple array)
        vendasData = response.data as Venda[];
        setTotalElements(vendasData.length);
        setTotalPages(1);
      }

      // Combine with clientes and produtos
      if (clientes && produtos) {
        const combined = vendasData.map(venda => ({
          ...venda,
          cliente: clientes.find(c => c.id === venda.clienteId),
          produtosDetalhes: venda.itens.map(item =>
            produtos.find(p => p.id === item.produtoId)
          ).filter(Boolean) as Produto[]
        }));

        setVendasWithDetails(combined);
      }
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, pageSize, filters, clientes, or produtos change
  useEffect(() => {
    if (clientes && produtos) {
      fetchVendas();
    }
  }, [currentPage, pageSize, debouncedNomeCliente, debouncedValorMin, debouncedValorMax, clientes, produtos]);

  const handleViewDetails = (venda: VendaWithDetails) => {
    setSelectedVenda(venda);
    setDetailsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
      await deleteVenda(
        () => vendasAPI.delete(id),
        undefined,
        {
          successMessage: 'Venda excluída com sucesso!',
          onSuccess: () => fetchVendas(),
        }
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveSuccess = () => {
    fetchVendas();
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || loadingClientes || loadingProdutos) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Carregando vendas...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <>
      <HeaderSection>
        <Title>Vendas</Title>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          Nova Venda
        </Button>
      </HeaderSection>

      <Card style={{ padding: '24px', marginBottom: '24px' }}>
        <SearchBar style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px', minWidth: '250px' }}>
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
              placeholder="Buscar por nome do cliente..."
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Input
              type="number"
              placeholder="Valor mínimo"
              value={valorMin}
              onChange={(e) => setValorMin(e.target.value)}
              style={{ minWidth: '150px' }}
              step="0.01"
            />
            <span style={{ color: '#86868b' }}>até</span>
            <Input
              type="number"
              placeholder="Valor máximo"
              value={valorMax}
              onChange={(e) => setValorMax(e.target.value)}
              style={{ minWidth: '150px' }}
              step="0.01"
            />
          </div>
        </SearchBar>
      </Card>

      <Card>
        {vendasWithDetails.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <ShoppingCart size={32} color="#86868b" />
            </EmptyIcon>
            <h3>Nenhuma venda encontrada</h3>
            <p>
              {nomeCliente || valorMin || valorMax
                ? 'Tente ajustar os filtros de busca'
                : 'Comece registrando sua primeira venda'}
            </p>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>#</TableHeader>
                <TableHeader>Cliente</TableHeader>
                <TableHeader>Data</TableHeader>
                <TableHeader>Itens</TableHeader>
                <TableHeader>Total</TableHeader>
                <TableHeader>Ações</TableHeader>
              </tr>
            </thead>
            <tbody>
              {vendasWithDetails.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell>#{venda.id}</TableCell>
                  <TableCell>{venda.cliente?.nome}</TableCell>
                  <TableCell>{formatDate(venda.data)}</TableCell>
                  <TableCell>{venda.itens.length} item(s)</TableCell>
                  <TotalCell>
                    R$ {venda.total.toFixed(2).replace('.', ',')}
                  </TotalCell>
                  <TableCell>
                    <ActionButtons>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleViewDetails(venda)}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(venda.id)}
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
            Mostrando {vendasWithDetails.length} de {totalElements} registros
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

      <VendaModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSuccess}
      />

      <VendaDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        venda={selectedVenda}
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

export default VendasList;