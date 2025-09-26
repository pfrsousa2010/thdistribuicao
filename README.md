# TH Distribuição & Representação - Site Moderno

Site moderno desenvolvido em React + Vite para a TH Distribuição & Representação, empresa especializada em peças e suprimentos para linha pesada, fora de estrada, industrial, mineração, siderurgia e agrícola.

## 🚀 Tecnologias Utilizadas

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Supabase** para backend e banco de dados
- **React Router** para navegação
- **CSS3** com design responsivo e moderno

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── Footer.tsx      # Rodapé da aplicação
│   ├── Hero.tsx        # Seção hero da página inicial
│   └── WhatsAppButton.tsx # Botão flutuante do WhatsApp
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── About.tsx       # Página sobre nós
│   ├── Products.tsx    # Página de produtos
│   └── Representations.tsx # Página de representações
├── services/           # Serviços e configurações
│   └── supabase.ts     # Configuração do Supabase
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Interfaces e tipos
└── assets/             # Recursos estáticos
    ├── images/         # Imagens
    └── logos/          # Logos das marcas
```

## 🗄️ Banco de Dados

O banco de dados está configurado no Supabase com as seguintes tabelas:

- **products** - Produtos da empresa
- **categories** - Categorias de produtos
- **brands** - Marcas representadas
- **representations** - Representações comerciais
- **contacts** - Contatos/leads

Execute o arquivo `database-schema.sql` no Supabase para criar a estrutura do banco.

## 🎨 Design e Funcionalidades

### Páginas Implementadas

1. **Home** - Página inicial com hero section, estatísticas e preview de produtos
2. **Sobre nós** - Informações sobre a empresa, setores atendidos e localização
3. **Produtos** - Listagem de produtos com filtros por categoria e marca
4. **Representações** - Marcas e representações comerciais

### Características do Design

- **Design moderno** com gradientes e sombras
- **Totalmente responsivo** para mobile, tablet e desktop
- **Cores da marca**: Preto, branco e dourado (#ffd700)
- **Tipografia**: Inter (Google Fonts)
- **Animações suaves** e transições
- **Botão WhatsApp** flutuante para contato direto

## 🛠️ Instalação e Execução

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar Supabase:**
   - Acesse o dashboard do Supabase
   - Execute o script `database-schema.sql`
   - Atualize as credenciais em `src/services/supabase.ts`

3. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Build para produção:**
   ```bash
   npm run build
   ```

## 📱 Funcionalidades Implementadas

### ✅ Página Inicial
- Hero section com call-to-action
- Estatísticas da empresa
- Preview de produtos
- Seção de marcas
- Informações de contato

### ✅ Página de Produtos
- Listagem dinâmica de produtos
- Filtros por categoria e marca
- Busca por nome/descrição
- Integração com WhatsApp para interesse
- Design de cards responsivos

### ✅ Página Sobre Nós
- Informações sobre a empresa
- Setores atendidos
- Estatísticas e compromissos
- Localização da unidade

### ✅ Página de Representações
- Listagem de marcas representadas
- Informações detalhadas de cada representação
- Contato direto via WhatsApp
- Design profissional

### ✅ Componentes Globais
- Header com navegação ativa
- Footer com informações de contato
- Botão WhatsApp flutuante
- Design responsivo em todas as telas

## 🔧 Configuração do Supabase

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Crie um novo projeto ou use o existente
3. Execute o script SQL do arquivo `database-schema.sql`
4. Copie a URL e chave anônima do projeto
5. Atualize as credenciais em `src/services/supabase.ts`

## 📞 Contato

- **Email**: threpresentacoes.pa@thdistribuicao.com
- **WhatsApp Vendas**: (94) 9 9267-6134
- **WhatsApp Financeiro**: (94) 9 8171-6387
- **Endereço**: Avenida Presidente Prudente, QD 48 LT 18, Bairro Paraíso, Parauapebas, PA, Brasil, CEP 68.515-000

## 🚀 Próximos Passos

- [ ] Adicionar imagens reais dos produtos
- [ ] Implementar sistema de carrinho de compras
- [ ] Adicionar formulário de contato
- [ ] Implementar blog/notícias
- [ ] Adicionar sistema de busca avançada
- [ ] Implementar área do cliente

---

Desenvolvido com ❤️ para TH Distribuição & Representação