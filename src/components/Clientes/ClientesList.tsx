import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, Edit, Trash2, User, Upload } from 'lucide-react';
import {
  Card,
  Button,
  Input,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  SearchBar,
} from '../../styles/GlobalStyles';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { clientesAPI } from '../../services/api';
import { Cliente } from '../../types';
import ClienteModal from './ClienteModal';
import ClienteImportModal from './ClienteImportModal';

const HeaderSection = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
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

const ClientesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  const { data: clientes, loading, refetch } = useApi(() => clientesAPI.getAll());
  const { mutate: deleteCliente } = useApiMutation();

  const filteredClientes = clientes?.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
          onSuccess: () => refetch(),
        }
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCliente(null);
  };

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
  };

  const handleImportSuccess = () => {
    refetch();
    setImportModalOpen(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

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
        {filteredClientes.length === 0 ? (
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
              {filteredClientes.map((cliente) => (
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
      </Card>

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

export default ClientesList;