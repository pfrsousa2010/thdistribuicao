# Página em Construção - TH Distribuição

## Como Ativar/Desativar a Página em Construção

Para controlar se o site deve mostrar a página em construção ou o site completo, edite o arquivo:

```
src/config/site-config.ts
```

### Configuração Atual

```typescript
export const SITE_CONFIG = {
  // Flag para controlar se o site está em construção
  // true = mostra página em construção
  // false = mostra o site completo
  UNDER_CONSTRUCTION: true,
  
  // Informações de contato para a página em construção
  CONTACT_INFO: {
    phone: '(XX) XXXX-XXXX',
    email: 'contato@thdistribuicao.com.br',
    whatsapp: '5511999999999', // Número com código do país
    whatsappDisplay: '(11) 99999-9999'
  }
} as const;
```

### Para Ativar o Site Completo

1. Abra o arquivo `src/config/site-config.ts`
2. Altere `UNDER_CONSTRUCTION: true` para `UNDER_CONSTRUCTION: false`
3. Salve o arquivo
4. O site agora mostrará todas as páginas normalmente

### Para Voltar à Página em Construção

1. Abra o arquivo `src/config/site-config.ts`
2. Altere `UNDER_CONSTRUCTION: false` para `UNDER_CONSTRUCTION: true`
3. Salve o arquivo
4. O site agora mostrará apenas a página em construção

### Personalizar Informações de Contato

Você também pode personalizar as informações de contato na página em construção editando o objeto `CONTACT_INFO` no mesmo arquivo:

- `phone`: Telefone para exibição
- `email`: Email de contato
- `whatsapp`: Número do WhatsApp com código do país (para link direto)
- `whatsappDisplay`: Número do WhatsApp formatado para exibição

### Exemplo de Ativação

```typescript
// Site em construção
UNDER_CONSTRUCTION: true

// Site ativo
UNDER_CONSTRUCTION: false
```

## Funcionalidades da Página em Construção

- ✅ Logo da empresa (logo-th.png)
- ✅ Design responsivo e moderno
- ✅ Informações de contato configuráveis
- ✅ Link direto para WhatsApp
- ✅ Animações suaves
- ✅ Gradiente atrativo
- ✅ Fácil ativação/desativação via flag

## Arquivos Criados

- `src/components/UnderConstruction.tsx` - Componente da página
- `src/components/UnderConstruction.css` - Estilos da página
- `src/config/site-config.ts` - Configurações do site

