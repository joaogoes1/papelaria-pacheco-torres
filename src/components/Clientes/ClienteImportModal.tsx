import React, { useState } from 'react';
import styled from 'styled-components';
import { X, FileText } from 'lucide-react';
import { Button, Modal as GlobalModal, ModalContent as GlobalModalContent } from '../../styles/GlobalStyles';
import {
  ModalHeader,
  ModalTitle,
  CloseButton,
} from '../../styles/components';
import { useApiMutation } from '../../hooks/useApi';
import { clientesAPI } from '../../services/api';

const InputContainer = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const FilePathInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: #f8f9fa;
`;

interface ClienteImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

const ClienteImportModal: React.FC<ClienteImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [filePath, setFilePath] = useState('');
  const { mutate: importClientes, loading } = useApiMutation();

  const handleFilePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilePath(event.target.value);
  };

  const handleImport = () => {
    if (!filePath.trim()) {
      alert('Por favor, insira o caminho do arquivo CSV.');
      return;
    }

    importClientes(
      () => clientesAPI.importar(filePath),
      undefined,
      {
        successMessage: 'Clientes importados com sucesso!',
        onSuccess: () => {
          onImportSuccess();
          setFilePath('');
        },
      }
    );
  };

  const getFileName = (path: string) => {
    return path.split('/').pop() || path.split('\\').pop() || path;
  };
  
  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Importar Clientes</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <InputContainer>
          <Label htmlFor="file-path">Caminho do arquivo CSV:</Label>
          <FilePathInput
            id="file-path"
            type="text"
            placeholder="Ex: /caminho/para/arquivo.csv ou C:\caminho\para\arquivo.csv"
            value={filePath}
            onChange={handleFilePathChange}
          />
        </InputContainer>

        {filePath && (
          <FileInfo>
            <FileText size={24} color="#007aff" />
            <span>{getFileName(filePath)}</span>
            <CloseButton style={{ marginLeft: 'auto' }} onClick={() => setFilePath('')}>
              <X size={16} />
            </CloseButton>
          </FileInfo>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleImport} disabled={!filePath.trim() || loading}>
            {loading ? 'Importando...' : 'Importar'}
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ClienteImportModal; 