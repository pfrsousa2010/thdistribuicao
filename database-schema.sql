-- Schema simplificado para TH Distribuição & Representação

-- Tabela de categorias de produtos
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  part_number VARCHAR(100),
  category_id UUID REFERENCES categories(id),
  brand VARCHAR(100), -- Nome da marca como string simples
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  specifications JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir categorias padrão
INSERT INTO categories (name, description) VALUES
('Motores de Partida', 'Motores de partida para veículos pesados e equipamentos industriais'),
('Turbinas', 'Turbinas e componentes relacionados'),
('Alternadores', 'Alternadores e sistemas de geração de energia'),
('Sistemas de Freio', 'Sistemas de freio eletromagnético e hidráulico'),
('Ferramentas', 'Ferramentas industriais e equipamentos de torque'),
('Soldagem', 'Equipamentos e consumíveis de soldagem'),
('Peças de Fundição', 'Peças fundidas e usinadas sob medida'),
('Sistemas Hidráulicos', 'Componentes hidráulicos e pneumáticos');

-- Inserir alguns produtos de exemplo
INSERT INTO products (name, description, part_number, category_id, brand, price) VALUES
('Motor De Partida 24V', 'Motor de partida 24V para veículos pesados', 'MP24V001', (SELECT id FROM categories WHERE name = 'Motores de Partida'), 'Delco Remy', 1250.00),
('Placa Retificador 12V 90A C/ Mancal Hilux', 'Placa retificadora 12V 90A com mancal para Hilux', 'PR12V90A', (SELECT id FROM categories WHERE name = 'Alternadores'), 'SEG', 450.00),
('Polia 8Pk 48,8Mm Constellation', 'Polia 8Pk 48,8mm para Constellation', 'POL8PK48', (SELECT id FROM categories WHERE name = 'Sistemas Hidráulicos'), 'SEG', 180.00),
('Porta Escovas 12V Hilux', 'Porta escovas 12V para Hilux', 'PE12VH', (SELECT id FROM categories WHERE name = 'Motores de Partida'), 'SEG', 95.00),
('Regulador De Voltagem 12V 90Amp', 'Regulador de voltagem 12V 90A', 'RV12V90', (SELECT id FROM categories WHERE name = 'Alternadores'), 'SEG', 320.00),
('Ferramenta de Torque HYTORC', 'Ferramenta de torque controlado para aplicações industriais', 'HYT001', (SELECT id FROM categories WHERE name = 'Ferramentas'), 'HYTORC', 2500.00),
('Sistema de Freio Eletromagnético', 'Sistema de freio eletromagnético para veículos pesados', 'FRE001', (SELECT id FROM categories WHERE name = 'Sistemas de Freio'), 'FRENELSA', 3500.00),
('Manipulador Ergonômico MTZ', 'Braço ergonômico para movimentação de ferramentas', 'MTZ001', (SELECT id FROM categories WHERE name = 'Ferramentas'), 'MTZ', 1800.00);

-- Criar índices para melhor performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_brand ON products(brand);