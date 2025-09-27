import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { Product, Category } from '../types';
import './Products.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Buscar categorias primeiro
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) {
        console.error('Erro ao buscar categorias:', categoriesError);
        throw categoriesError;
      }

      // Buscar produtos com relacionamentos
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsError) {
        console.error('Erro ao buscar produtos:', productsError);
        throw productsError;
      }

      console.log('Dados carregados:', {
        categorias: categoriesData?.length || 0,
        produtos: productsData?.length || 0
      });

      // Mapear os dados para garantir compatibilidade
      const mappedProducts = (productsData || []).map(product => ({
        ...product,
        category: product.categories ? {
          id: product.categories.id,
          name: product.categories.name
        } : null
      }));

      setProducts(mappedProducts);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      // Em caso de erro, definir arrays vazios para evitar quebra da interface
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Obter lista única de marcas dos produtos
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.part_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleProductInterest = (product: Product) => {
    const message = `Olá! Tenho interesse no produto: ${product.name}${product.part_number ? ` (${product.part_number})` : ''}`;
    const phoneNumber = '5594992676134';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };


  const retryFetch = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-hero">
          <div className="container">
            <h1 className="page-title">Produtos</h1>
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Carregando produtos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se não há produtos e não está carregando, mostrar mensagem de erro ou info
  if (products.length === 0 && !loading) {
    return (
      <div className="products-page">
        <div className="products-hero">
          <div className="container">
            <h1 className="page-title">Produtos</h1>
            <div className="error-message">
              <h3>Nenhum produto encontrado</h3>
              <p>
                {categories.length > 0 
                  ? "Não há produtos ativos cadastrados no momento. Verifique se existem produtos com is_active = true."
                  : "Não foi possível carregar os dados. Verifique sua conexão com a internet e tente novamente."
                }
              </p>
              <div className="debug-info">
                <small>
                  Debug: {categories.length} categorias carregadas
                </small>
              </div>
              <button className="retry-button" onClick={retryFetch}>
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          <h1 className="page-title">Produtos</h1>
          <div className="products-info">
            <p>
              {products.length > 0 
                ? `Exibindo ${filteredProducts.length} de ${products.length} produtos ativos`
                : 'Carregando produtos...'
              }
            </p>
            {categories.length > 0 && (
              <p className="categories-info">
                {categories.length} categorias disponíveis
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="filters-section">
            <div className="search-filter">
              <label htmlFor="search">Buscar produto</label>
              <input
                id="search"
                type="text"
                placeholder="Digite o nome do produto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filter">
              <label htmlFor="category">Filtrar por categoria</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="">Selecionar categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="brand-filter">
              <label htmlFor="brand">Filtrar por marca</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="brand-select"
              >
                <option value="">Selecionar marca</option>
                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <div className="image-placeholder">
                      <span>{product.brand || 'Produto'}</span>
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    {product.part_number && (
                      <p className="product-part">Código: {product.part_number}</p>
                    )}
                    {product.description && (
                      <p className="product-description">{product.description}</p>
                    )}
                    
                    <div className="product-details">
                      {product.category && (
                        <span className="product-category">{product.category.name}</span>
                      )}
                      {product.brand && (
                        <span className="product-brand">{product.brand}</span>
                      )}
                    </div>

                    {product.price && (
                      <div className="product-price">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    )}
                  </div>

                  <button 
                    className="product-button"
                    onClick={() => handleProductInterest(product)}
                  >
                    Quero saber mais
                  </button>
                </div>
              ))
            )}
          </div>

          {filteredProducts.length > 0 && (
            <div className="load-more-section">
              <button className="load-more-btn">
                Carregar mais produtos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;