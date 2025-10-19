// Função utilitária para gerar slug a partir do nome do produto
export const generateProductSlug = (product: { name: string; brand?: string; part_number?: string }): string => {
  const name = product.name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  
  const brand = product.brand ? `-${product.brand.toLowerCase().replace(/[^a-z0-9]/g, '')}` : '';
  const partNumber = product.part_number ? `-${product.part_number.toLowerCase().replace(/[^a-z0-9]/g, '')}` : '';
  
  return `${name}${brand}${partNumber}`;
};

// Função para extrair informações do slug
export const parseProductSlug = (slug: string) => {
  const parts = slug.split('-');
  return {
    name: parts[0] || '',
    brand: parts[1] || '',
    partNumber: parts[2] || ''
  };
};
