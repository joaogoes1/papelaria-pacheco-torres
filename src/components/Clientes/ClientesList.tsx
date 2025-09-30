import { Edit, Plus, Search, Trash2, Upload, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApiMutation } from '../../hooks/useApi';
import { clientesAPI } from '../../services/api';
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
  HeaderActions,
  HeaderSection,
  Title,
} from '../../styles/components';
import { theme } from '../../styles/theme';
import { Cliente } from '../../types';
import { TableSkeleton, SearchBarSkeleton, SearchInputSkeleton, PaginationSkeleton, Skeleton } from '../Skeleton';
import ClienteImportModal from './ClienteImportModal';
import ClienteModal from './ClienteModal';

const ClientesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);

  const { mutate: deleteCliente } = useApiMutation();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch paginated data
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const searchParam = debouncedSearchTerm.trim() || undefined;
      const response = await clientesAPI.getAll(currentPage, pageSize, searchParam);

      // Check if response is paginated (Spring Boot Page format)
      if (response.data && typeof response.data === 'object' && 'content' in response.data) {
        const pageData = response.data as any;
        setClientes(pageData.content);
        setTotalPages(pageData.totalPages);
        setTotalElements(pageData.totalElements);
      } else {
        // Fallback for non-paginated response (simple array)
        const items = response.data as Cliente[];
        setClientes(items);
        setTotalElements(items.length);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, pageSize, or search term changes
  useEffect(() => {
    fetchClientes();
  }, [currentPage, pageSize, debouncedSearchTerm]);

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      await deleteCliente(
        () => clientesAPI.delete(id),
        undefined,
        {
          successMessage: 'Cliente excluído com sucesso!',
          onSuccess: () => fetchClientes(),
        }
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCliente(null);
  };

  const handleSaveSuccess = () => {
    fetchClientes();
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

  const handleImportSuccess = () => {
    fetchClientes();
    setImportModalOpen(false);
  };

  return (
    <>
      <HeaderSection>
        <Title>Clientes</Title>
        <HeaderActions>
          <Button onClick={() => setImportModalOpen(true)} variant="secondary">
            <Upload size={16} />
            Importar
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <Plus size={16} />
            Novo Cliente
          </Button>
        </HeaderActions>
      </HeaderSection>

      {loading ? (
        <>
          <SearchBarSkeleton>
            <SearchInputSkeleton>
              <Skeleton width="100%" height="44px" radius="12px" />
            </SearchInputSkeleton>
          </SearchBarSkeleton>

          <Card>
            <TableSkeleton rows={pageSize} columns={4} />
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
                  placeholder="Buscar por nome, CPF ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </SearchBar>
          </Card>

          <Card>
            {clientes.length === 0 ? (
              <EmptyState>
                <EmptyIcon>
                  <User size={32} color="#86868b" />
                </EmptyIcon>
                <h3>Nenhum cliente encontrado</h3>
                <p>
                  {searchTerm
                    ? 'Tente ajustar os filtros de busca'
                    : 'Comece cadastrando seu primeiro cliente'}
                </p>
              </EmptyState>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>CPF</TableHeader>
                    <TableHeader>Telefone</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Ações</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell>{cliente.nome}</TableCell>
                      <TableCell>{cliente.cpf}</TableCell>
                      <TableCell>{cliente.telefone}</TableCell>
                      <TableCell>{cliente.email}</TableCell>
                      <TableCell>
                        <ActionButtons>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleEdit(cliente)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(cliente.id)}
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
                Mostrando {clientes.length} de {totalElements} registros
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

      <ClienteModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        cliente={editingCliente}
        onSave={handleSaveSuccess}
      />
      <ClienteImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportSuccess={handleImportSuccess}
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

export default ClientesList;