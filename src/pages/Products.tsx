import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import type { Product, Category } from '../types';
import './Products.css';

const Products: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
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

      // Buscar total de produtos ativos
      const { count: totalCount, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (countError) {
        console.error('Erro ao contar produtos:', countError);
        throw countError;
      }

      setCategories(categoriesData || []);
      setTotalProducts(totalCount || 0);

      // Buscar produtos iniciais (primeira página)
      await fetchProductsWithFilters();
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setCategories([]);
      setTotalProducts(0);
      setDisplayedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsWithFilters = useCallback(async (page: number = 1) => {
    try {
      setFilterLoading(true);
      
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage - 1;

      // Construir query base
      let query = supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name
          )
        `, { count: 'exact' })
        .eq('is_active', true);

      // Aplicar filtros
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,part_number.ilike.%${searchTerm}%`);
      }

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      if (selectedBrand) {
        query = query.eq('brand', selectedBrand);
      }

      // Aplicar paginação e ordenação
      const { data: productsData, error: productsError, count: filteredCount } = await query
        .order('created_at', { ascending: false })
        .range(startIndex, endIndex);

      if (productsError) {
        console.error('Erro ao buscar produtos:', productsError);
        throw productsError;
      }

      // Mapear os dados para garantir compatibilidade
      const mappedProducts = (productsData || []).map(product => ({
        ...product,
        category: product.categories ? {
          id: product.categories.id,
          name: product.categories.name
        } : null
      }));

      if (page === 1) {
        // Primeira página: substituir produtos
        setDisplayedProducts(mappedProducts);
      } else {
        // Páginas subsequentes: acumular produtos evitando duplicatas
        setDisplayedProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = mappedProducts.filter(p => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      }
      
      setFilteredTotal(filteredCount || 0);
      setCurrentPage(page);

      console.log('Produtos filtrados:', {
        pagina: page,
        produtosCarregados: mappedProducts.length,
        totalFiltrados: filteredCount || 0,
        totalProdutos: totalProducts
      });

    } catch (error) {
      console.error('Erro ao buscar produtos filtrados:', error);
      if (page === 1) {
        setDisplayedProducts([]);
      }
      setFilteredTotal(0);
    } finally {
      setFilterLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedBrand, itemsPerPage, totalProducts]);

  // Obter lista única de marcas dos produtos (buscar do banco)
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);

  // Buscar marcas únicas do banco
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data: brandsData, error } = await supabase
          .from('products')
          .select('brand')
          .eq('is_active', true)
          .not('brand', 'is', null)
          .limit(1000); // Limitar para evitar timeout

        if (error) {
          console.error('Erro ao buscar marcas:', error);
          return;
        }

        if (brandsData) {
          const brands = Array.from(new Set(brandsData.map(p => p.brand).filter(Boolean)));
          setUniqueBrands(brands);
        }
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
        setUniqueBrands([]);
      }
    };

    fetchBrands();
  }, []);

  // Aplicar filtros quando mudarem
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProductsWithFilters(1);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [fetchProductsWithFilters]);

  const handleProductInterest = (product: Product) => {
    const message = `Olá! Tenho interesse no produto: ${product.name}${product.part_number ? ` (${product.part_number})` : ''}`;
    const phoneNumber = '5594992676134';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    fetchProductsWithFilters(nextPage);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const hasMoreProducts = displayedProducts.length < filteredTotal;
  const hasActiveFilters = searchTerm || selectedCategory || selectedBrand;


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
  if (displayedProducts.length === 0 && !loading && !filterLoading) {
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
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="filters-section">
            <div className="search-filter">
              <label htmlFor="search">Buscar produto</label>
              <div className="search-input-wrapper">
                <input
                  id="search"
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={handleClearSearch}
                    aria-label="Limpar busca"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
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

            <div className="clear-filters">
              <button 
                className="clear-filters-btn"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
              >
                Limpar filtros
              </button>
            </div>

            <div className="products-count">
              <p className="count-text">
                {totalProducts > 0 
                  ? `Mostrando ${displayedProducts.length} produtos na tela • ${filteredTotal.toLocaleString('pt-BR')} produtos encontrados • Total: ${totalProducts.toLocaleString('pt-BR')} produtos`
                  : 'Carregando produtos...'
                }
              </p>
            </div>
          </div>

          <div className="products-list">
            {filterLoading && displayedProducts.length === 0 ? (
              <div className="loading">
                <div className="loading-spinner"></div>
                <p>Carregando produtos...</p>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="no-products">
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
              </div>
            ) : (
              displayedProducts.map(product => (
                <div key={product.id} className="product-item">
                  <div className="product-content">
                    <div className="product-main-info">
                      <h3 className="product-name">{product.name}</h3>
                      {product.part_number && (
                        <p className="product-part">Código: {product.part_number}</p>
                      )}
                      {product.description && (
                        <p className="product-description">{product.description}</p>
                      )}
                    </div>
                    
                    <div className="product-badges">
                      {product.brand && (
                        <span className="product-brand-badge">{product.brand}</span>
                      )}
                      {product.category && (
                        <span className="product-category-badge">{product.category.name}</span>
                      )}
                    </div>

                    {product.price && (
                      <div className="product-price">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    )}
                  </div>

                  <button 
                    className="product-whatsapp-btn"
                    onClick={() => handleProductInterest(product)}
                  >
                    <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="currentColor"/>
                    </svg>
                    Quero saber mais
                  </button>
                </div>
              ))
            )}
          </div>

          {hasMoreProducts && (
            <div className="load-more-section">
              <button 
                className="load-more-btn" 
                onClick={handleLoadMore}
                disabled={filterLoading}
              >
                {filterLoading ? 'Carregando...' : `Carregar mais produtos (${filteredTotal - displayedProducts.length} restantes)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;