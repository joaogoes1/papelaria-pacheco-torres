# Papelaria Pacheco Torres - Sistema de Gestão

Sistema completo de gestão para papelaria desenvolvido em React com TypeScript, styled-components e JSON Server.

## 🚀 Funcionalidades

### Módulos Principais
- **Dashboard**: Visão geral com estatísticas e ações rápidas
- **Clientes**: CRUD completo de clientes com validações
- **Produtos**: Gerenciamento de produtos e categorias
- **Estoque**: Controle de estoque com alertas automáticos
- **Vendas**: Sistema de vendas integrado com estoque
- **Relatórios**: Estatísticas e relatórios de vendas

### Características Técnicas
- ✅ Interface moderna inspirada no Apple UI
- ✅ Componentes totalmente reutilizáveis e modulares
- ✅ Validação de formulários com React Hook Form
- ✅ API simulada com JSON Server
- ✅ Notificações toast para feedback
- ✅ Design responsivo para todos os dispositivos
- ✅ Tipagem completa com TypeScript

## 🛠 Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização modular
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **JSON Server** - API fake para desenvolvimento
- **React Toastify** - Notificações
- **Lucide React** - Ícones

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd papelaria-pacheco-torres

# Instale as dependências
npm install
```

### Executando o projeto
```bash
# Executa o JSON Server e o frontend simultaneamente
npm run dev:full

# Ou execute separadamente:
# JSON Server (API fake - porta 3001)
npm run server

# Frontend (porta 5173)
npm run dev
```

### Scripts Disponíveis
- `npm run dev` - Executa apenas o frontend
- `npm run server` - Executa apenas o JSON Server
- `npm run dev:full` - Executa ambos simultaneamente
- `npm run build` - Build de produção
- `npm run preview` - Preview do build

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Layout/          # Componentes de layout
│   ├── Dashboard/       # Dashboard principal
│   ├── Clientes/        # Módulo de clientes
│   ├── Produtos/        # Módulo de produtos
│   ├── Estoque/         # Módulo de estoque
│   ├── Vendas/          # Módulo de vendas
│   └── Relatorios/      # Módulo de relatórios
├── hooks/               # Custom hooks
├── services/            # Configuração da API
├── styles/              # Estilos globais
├── types/               # Definições TypeScript
└── App.tsx             # Componente principal
```

## 🎨 Design System

### Cores Principais
- **Primary**: #007aff (Azul Apple)
- **Success**: #34c759 (Verde)
- **Warning**: #ffa500 (Laranja)
- **Danger**: #ff6b6b (Vermelho)
- **Neutral**: #1d1d1f, #86868b, #f5f5f7

### Componentes Reutilizáveis
- **Button**: Botões com variantes (primary, secondary, danger)
- **Input/Select**: Campos de formulário com validação
- **Modal**: Modais responsivos e acessíveis
- **Table**: Tabelas com hover e ordenação
- **Card**: Containers com shadow e border-radius

## 🔄 Fluxo de Dados

1. **Clientes**: Cadastro, edição, exclusão e busca
2. **Produtos**: Gerenciamento completo do catálogo
3. **Estoque**: Controle automático com alertas de baixo estoque
4. **Vendas**: 
   - Seleção de cliente e produtos
   - Validação de estoque disponível
   - Atualização automática do estoque
   - Cálculo automático do total

## 📊 API (JSON Server)

### Endpoints Disponíveis
- `GET /clientes` - Lista todos os clientes
- `POST /clientes` - Cria novo cliente
- `PUT /clientes/:id` - Atualiza cliente
- `DELETE /clientes/:id` - Remove cliente

*(Similar para produtos, estoque e vendas)*

### Estrutura dos Dados
```typescript
// Cliente
interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
  createdAt: string;
}

// Produto
interface Produto {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  categoria: string;
  descricao: string;
  createdAt: string;
}

// Venda
interface Venda {
  id: number;
  clienteId: number;
  itens: ItemVenda[];
  total: number;
  data: string;
}
```

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Configuração para Produção
- Substitua o JSON Server por uma API real
- Configure variáveis de ambiente
- Ajuste as URLs da API em `src/services/api.ts`

## 🧪 Próximas Funcionalidades

- [ ] Autenticação de usuários
- [ ] Backup automático de dados
- [ ] Relatórios em PDF
- [ ] Dashboard com gráficos
- [ ] Integração com API de pagamento
- [ ] Histórico de alterações
- [ ] Notificações por email

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido para Papelaria Pacheco Torres**  
Sistema moderno e escalável para gestão completa de papelaria.