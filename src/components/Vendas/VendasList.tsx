import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Trash2, ShoppingCart } from 'lucide-react';
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
import {
  HeaderSection,
  Title,
  EmptyState,
  EmptyIcon,
  ActionButtons,
  TotalCell,
} from '../../styles/components';
import { useApi, useApiMutation } from '../../hooks/useApi';
import { vendasAPI, clientesAPI, produtosAPI } from '../../services/api';
import { Venda, Cliente, Produto } from '../../types';
import VendaModal from './VendaModal';
import VendaDetailsModal from './VendaDetailsModal';

interface VendaWithDetails extends Venda {
  cliente?: Cliente;
  produtosDetalhes?: Produto[];
}

const VendasList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState<VendaWithDetails | null>(null);
  const [vendasWithDetails, setVendasWithDetails] = useState<VendaWithDetails[]>([]);

  const { data: vendas, loading: loadingVendas, refetch } = useApi(() => vendasAPI.getAll());
  const { data: clientes, loading: loadingClientes } = useApi(() => clientesAPI.getAll());
  const { data: produtos, loading: loadingProdutos } = useApi(() => produtosAPI.getAll());
  const { mutate: deleteVenda } = useApiMutation();

  // Combina dados de vendas com clientes e produtos
  useEffect(() => {
    if (vendas && clientes && produtos) {
      const combined = vendas.map(venda => ({
        ...venda,
        cliente: clientes.find(c => c.id === venda.clienteId),
        produtosDetalhes: venda.itens.map(item => 
          produtos.find(p => p.id === item.produtoId)
        ).filter(Boolean) as Produto[]
      }));
      setVendasWithDetails(combined);
    }
  }, [vendas, clientes, produtos]);

  const filteredVendas = vendasWithDetails.filter((venda) => {
    if (!venda.cliente) return false;
    
    const matchesSearch = 
      venda.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.id.toString().includes(searchTerm);
    
    return matchesSearch;
  });

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
          onSuccess: () => refetch(),
        }
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveSuccess = () => {
    refetch();
    handleCloseModal();
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

  if (loadingVendas || loadingClientes || loadingProdutos) {
    return <div>Carregando...</div>;
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
              placeholder="Buscar por cliente ou número da venda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </SearchBar>
      </Card>

      <Card>
        {filteredVendas.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <ShoppingCart size={32} color="#86868b" />
            </EmptyIcon>
            <h3>Nenhuma venda encontrada</h3>
            <p>
              {searchTerm
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
              {filteredVendas.map((venda) => (
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

export default VendasList;