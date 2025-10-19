import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import type { Product, Category } from '../types';
import { generateProductSlug } from '../utils/slugUtils';
import './Products.css';

// Componente do Carrossel de Banners
const BannerCarousel: React.FC = () => {
  const banners = [
    '/produtos/banners/delco.png',
    '/produtos/banners/hella.png',
    '/produtos/banners/kito.png',
    '/produtos/banners/milwaukee.png'
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="products-hero-carousel">
      <div className="banner-container">
        <img 
          src={banners[currentBanner]} 
          alt={`Banner ${currentBanner + 1}`}
          className="banner-image"
        />
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filterLoading, setFilterLoading] = useState(false);
  const [hasInitialError, setHasInitialError] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [brandSearchTerm, setBrandSearchTerm] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

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

      setCategories(categoriesData || []);

      // Buscar produtos iniciais (primeira página)
      await fetchProductsWithFilters();
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setCategories([]);
      setDisplayedProducts([]);
      setHasInitialError(true);
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
        `)
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
      const { data: productsData, error: productsError } = await query
        .order('name', { ascending: true })
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
      
      setCurrentPage(page);

    } catch (error) {
      console.error('Erro ao buscar produtos filtrados:', error);
      if (page === 1) {
        setDisplayedProducts([]);
      }
    } finally {
      setFilterLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedBrand, itemsPerPage]);

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
          brands.sort((a, b) => {
            // Normalizar strings removendo espaços extras e convertendo para minúsculas para comparação
            const normalizedA = a.trim().toLowerCase();
            const normalizedB = b.trim().toLowerCase();
            return normalizedA.localeCompare(normalizedB, 'pt-BR');
          });
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

  // Fechar dropdowns quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.custom-select')) {
        setShowCategoryDropdown(false);
        setShowBrandDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProductClick = (product: Product) => {
    const slug = product.slug || generateProductSlug(product);
    navigate(`/produtos/${slug}`);
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

  // Filtrar categorias baseado no termo de busca
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  // Filtrar marcas baseado no termo de busca
  const filteredBrands = uniqueBrands.filter(brand =>
    brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategoryDropdown(false);
    setCategorySearchTerm('');
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setShowBrandDropdown(false);
    setBrandSearchTerm('');
  };

  const hasMoreProducts = displayedProducts.length > 0 && displayedProducts.length % itemsPerPage === 0;
  const hasActiveFilters = searchTerm || selectedCategory || selectedBrand;

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-container">
              <div className="loading-inline">
                <img 
                  src="/produtos/logo-th-loading.png" 
                  alt="Carregando..." 
                  className="loading-logo"
                />
                <p>Carregando produtos...</p>
              </div>
            </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <BannerCarousel />

      <div className="products-content">
        <div className="container">
          <div className="filters-section">
            <div className="search-filter">
              <label htmlFor="search">Buscar peças automotivas e ferramentas industriais</label>
              <div className="search-input-wrapper">
                <input
                  id="search"
                  type="text"
                  placeholder="Digite o nome do produto ou marca"
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
              <div className="custom-select">
                <input
                  type="text"
                  placeholder="Selecionar categoria"
                  value={categorySearchTerm || (selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || '' : '')}
                  onChange={(e) => {
                    setCategorySearchTerm(e.target.value);
                    setShowCategoryDropdown(true);
                  }}
                  onFocus={() => setShowCategoryDropdown(true)}
                  className="category-select"
                />
                {showCategoryDropdown && (
                  <div className="custom-dropdown">
                    <div className="dropdown-options">
                      <div
                        className="dropdown-option"
                        onClick={() => handleCategorySelect('')}
                      >
                        Selecionar categoria
                      </div>
                      {filteredCategories.map(category => (
                        <div
                          key={category.id}
                          className="dropdown-option"
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="brand-filter">
              <label htmlFor="brand">Filtrar por marca</label>
              <div className="custom-select">
                <input
                  type="text"
                  placeholder="Selecionar marca"
                  value={brandSearchTerm || selectedBrand}
                  onChange={(e) => {
                    setBrandSearchTerm(e.target.value);
                    setShowBrandDropdown(true);
                  }}
                  onFocus={() => setShowBrandDropdown(true)}
                  className="brand-select"
                />
                {showBrandDropdown && (
                  <div className="custom-dropdown">
                    <div className="dropdown-options">
                      <div
                        className="dropdown-option"
                        onClick={() => handleBrandSelect('')}
                      >
                        Selecionar marca
                      </div>
                      {filteredBrands.map(brand => (
                        <div
                          key={brand}
                          className="dropdown-option"
                          onClick={() => handleBrandSelect(brand)}
                        >
                          {brand}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

          </div>

          <div className="products-list">
            {hasInitialError ? (
              <div className="system-error">
                <h3>Estamos com problemas para carregar os produtos</h3>
                <p>Volte em alguns minutos.</p>
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="no-products-container">
                <div className="no-products">
                  <h3>Nenhum produto encontrado</h3>
                  <p>
                    {hasActiveFilters 
                      ? "Não encontramos produtos com os filtros aplicados. Tente limpar os filtros ou ajustar sua busca."
                      : "Não há produtos disponíveis no momento."
                    }
                  </p>
                  {hasActiveFilters && (
                    <button 
                      className="clear-filters-suggestion-btn"
                      onClick={handleClearFilters}
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>
            ) : (
              displayedProducts.map(product => (
                <div key={product.id} className="product-item">
                  <div 
                    className="products-card-image-section"
                    onClick={() => handleProductClick(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleProductClick(product);
                      }
                    }}
                    aria-label={`Ver detalhes do produto ${product.name}`}
                  >
                    {product.image_url ? (
                      <>
                        <img 
                          src={product.image_url} 
                          alt={`${product.name}${product.brand ? ` da marca ${product.brand}` : ''} - Peças automotivas e ferramentas industriais`}
                          className="products-card-image"
                        />
                        <div className="products-card-watermark-overlay">
                          <img 
                            src="/produtos/logo-th-loading.png" 
                            alt="TH Distribuição"
                            className="products-card-watermark-image"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="products-card-placeholder">
                        <img 
                          src="/produtos/logo-th-loading.png" 
                          alt="Imagem do produto não disponível"
                          className="products-card-placeholder-image"
                        />
                      </div>
                    )}
                  </div>

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
                    className="product-view-btn"
                    onClick={() => handleProductClick(product)}
                  >
                    <svg className="view-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Ver Detalhes
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
                {filterLoading ? 'Carregando...' : 'Carregar mais produtos'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;