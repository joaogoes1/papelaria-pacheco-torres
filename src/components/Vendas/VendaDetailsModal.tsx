import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import {
  Button,
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from '../../styles/GlobalStyles';
import AnimatedModal from '../AnimatedModal';
import { Venda, Cliente, Produto } from '../../types';

const ModalContentWrapper = styled.div`
  padding: 32px;
  max-width: 600px;
  width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  color: #86868b;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f7;
    color: #1d1d1f;
  }
`;

const InfoSection = styled.div`
  background: #f5f5f7;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #86868b;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
`;

const TotalSection = styled.div`
  background: #f0f8ff;
  padding: 16px;
  border-radius: 8px;
  text-align: right;
  margin-top: 16px;
`;

const TotalValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #007aff;
`;

interface VendaWithDetails extends Venda {
  cliente?: Cliente;
  produtosDetalhes?: Produto[];
}

interface VendaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  venda?: VendaWithDetails | null;
}

const VendaDetailsModal: React.FC<VendaDetailsModalProps> = ({
  isOpen,
  onClose,
  venda,
}) => {
  if (!venda) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <ModalContentWrapper>
        <ModalHeader>
          <ModalTitle>Detalhes da Venda #{venda.id}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <InfoSection>
          <InfoRow>
            <InfoLabel>Cliente:</InfoLabel>
            <InfoValue>{venda.cliente?.nome}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Data:</InfoLabel>
            <InfoValue>{formatDate(venda.data)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>CPF:</InfoLabel>
            <InfoValue>{venda.cliente?.cpf}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{venda.cliente?.email}</InfoValue>
          </InfoRow>
        </InfoSection>

        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          Itens da Venda
        </h3>

        <Table>
          <thead>
            <tr>
              <TableHeader>Produto</TableHeader>
              <TableHeader>Quantidade</TableHeader>
              <TableHeader>Preço Unit.</TableHeader>
              <TableHeader>Subtotal</TableHeader>
            </tr>
          </thead>
          <tbody>
            {venda.itens.map((item, index) => {
              const produto = venda.produtosDetalhes?.find(p => p?.id === item.produtoId);
              const subtotal = item.quantidade * item.precoUnitario;
              
              return (
                <TableRow key={index}>
                  <TableCell>{produto?.nome || 'Produto não encontrado'}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>R$ {item.precoUnitario.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell>R$ {subtotal.toFixed(2).replace('.', ',')}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>

        <TotalSection>
          <div style={{ fontSize: '16px', marginBottom: '8px', color: '#86868b' }}>
            Total da Venda
          </div>
          <TotalValue>R$ {venda.total.toFixed(2).replace('.', ',')}</TotalValue>
        </TotalSection>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </ModalContentWrapper>
    </AnimatedModal>
  );
};

export default VendaDetailsModal;