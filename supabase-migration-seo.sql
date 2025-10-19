-- Migration para melhorar SEO dos produtos
-- Execute este script no Supabase SQL Editor

-- 1. Adicionar campo slug à tabela products
ALTER TABLE products ADD COLUMN slug VARCHAR(200);

-- 2. Criar índice para melhor performance nas buscas por slug
CREATE INDEX idx_products_slug ON products(slug);

-- 3. Criar índice composto para buscas otimizadas
CREATE INDEX idx_products_active_slug ON products(is_active, slug);

-- 4. Atualizar produtos existentes com slugs baseados no nome, marca e part_number
UPDATE products 
SET slug = LOWER(
  REGEXP_REPLACE(
    CONCAT(
      COALESCE(name, ''),
      CASE WHEN brand IS NOT NULL AND brand != '' THEN '-' || brand ELSE '' END,
      CASE WHEN part_number IS NOT NULL AND part_number != '' THEN '-' || part_number ELSE '' END
    ),
    '[^a-z0-9\-]', '', 'g'
  )
)
WHERE slug IS NULL OR slug = '';

-- 5. Adicionar campo image_url se não existir (para SEO com imagens)
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 6. Criar índice para buscas por imagem
CREATE INDEX IF NOT EXISTS idx_products_image_url ON products(image_url) WHERE image_url IS NOT NULL;

-- 7. Adicionar campo para SEO description específica
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- 8. Adicionar campo para keywords específicas do produto
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_keywords TEXT;

-- 9. Criar função para gerar slug automaticamente
CREATE OR REPLACE FUNCTION generate_product_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Gerar slug baseado no nome, marca e part_number
  NEW.slug := LOWER(
    REGEXP_REPLACE(
      CONCAT(
        COALESCE(NEW.name, ''),
        CASE WHEN NEW.brand IS NOT NULL AND NEW.brand != '' THEN '-' || NEW.brand ELSE '' END,
        CASE WHEN NEW.part_number IS NOT NULL AND NEW.part_number != '' THEN '-' || NEW.part_number ELSE '' END
      ),
      '[^a-z0-9\-]', '', 'g'
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Criar trigger para gerar slug automaticamente em novos produtos
DROP TRIGGER IF EXISTS trigger_generate_product_slug ON products;
CREATE TRIGGER trigger_generate_product_slug
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION generate_product_slug();

-- 11. Adicionar constraint para garantir slugs únicos
ALTER TABLE products ADD CONSTRAINT unique_product_slug UNIQUE (slug);

-- 12. Criar view para produtos com dados completos para SEO
CREATE OR REPLACE VIEW products_seo AS
SELECT 
  p.id,
  p.name,
  p.description,
  p.part_number,
  p.brand,
  p.price,
  p.stock_quantity,
  p.is_active,
  p.specifications,
  p.slug,
  p.image_url,
  p.seo_description,
  p.seo_keywords,
  p.created_at,
  p.updated_at,
  c.id as category_id,
  c.name as category_name,
  -- Gerar URL canônica
  CONCAT('https://thdistribuicao.com/produtos/', p.slug) as canonical_url,
  -- Gerar meta description se não tiver seo_description
  COALESCE(
    p.seo_description,
    CONCAT(
      'Produto ', p.name,
      CASE WHEN p.brand IS NOT NULL THEN ' da marca ' || p.brand ELSE '' END,
      CASE WHEN c.name IS NOT NULL THEN ' na categoria ' || c.name ELSE '' END,
      '. Peças automotivas e ferramentas industriais em Parauapebas.'
    )
  ) as meta_description,
  -- Gerar keywords se não tiver seo_keywords
  COALESCE(
    p.seo_keywords,
    CONCAT(
      p.name,
      CASE WHEN p.brand IS NOT NULL THEN ', ' || p.brand ELSE '' END,
      CASE WHEN c.name IS NOT NULL THEN ', ' || c.name ELSE '' END,
      ', peças automotivas, ferramentas industriais, Parauapebas',
      CASE WHEN p.part_number IS NOT NULL THEN ', ' || p.part_number ELSE '' END
    )
  ) as meta_keywords
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true;

-- 13. Comentários para documentação
COMMENT ON COLUMN products.slug IS 'URL amigável para SEO, gerada automaticamente baseada no nome, marca e part_number';
COMMENT ON COLUMN products.image_url IS 'URL da imagem principal do produto para SEO e redes sociais';
COMMENT ON COLUMN products.seo_description IS 'Descrição específica para SEO, sobrescreve a descrição padrão';
COMMENT ON COLUMN products.seo_keywords IS 'Keywords específicas para SEO, sobrescreve as keywords padrão';

-- 14. Verificar se a migration foi executada com sucesso
SELECT 
  'Migration executada com sucesso!' as status,
  COUNT(*) as total_produtos,
  COUNT(CASE WHEN slug IS NOT NULL AND slug != '' THEN 1 END) as produtos_com_slug
FROM products;
