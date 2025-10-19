import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import type { Product } from '../types';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
  }, [slug]);

  const fetchProductBySlug = async (productSlug: string) => {
    try {
      setLoading(true);
      setError(null);

      // Primeiro, tentar buscar pelo slug
      let { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name
          )
        `)
        .eq('slug', productSlug)
        .eq('is_active', true)
        .single();

      // Se não encontrar pelo slug, tentar buscar pelo ID (caso o slug seja um ID)
      if (productError && productSlug.match(/^[0-9a-f-]{36}$/)) {
        const { data: productById, error: errorById } = await supabase
          .from('products')
          .select(`
            *,
            categories:category_id (
              id,
              name
            )
          `)
          .eq('id', productSlug)
          .eq('is_active', true)
          .single();
        
        if (!errorById && productById) {
          productData = productById;
          productError = null;
        }
      }

      if (productError) {
        console.error('Erro ao buscar produto:', productError);
        setError('Produto não encontrado');
        return;
      }

      if (productData) {
        const mappedProduct = {
          ...productData,
          category: productData.categories ? {
            id: productData.categories.id,
            name: productData.categories.name
          } : null
        };
        setProduct(mappedProduct);
      } else {
        setError('Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      setError('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    if (!product) return;
    
    const message = `Olá! Vi no site e tenho interesse no produto: ${product.name}${product.part_number ? ` (${product.part_number})` : ''}`;
    const phoneNumber = '5594992676134';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Meta tags dinâmicas usando useEffect direto
  useEffect(() => {
    if (product) {
      // Atualizar título
      document.title = `${product.name}${product.part_number ? ` (${product.part_number})` : ''} | TH Distribuição`;
      
      // Função para atualizar meta tags
      const updateMetaTag = (name: string, content: string, property?: boolean) => {
        const attribute = property ? 'property' : 'name';
        let metaTag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute(attribute, name);
          document.head.appendChild(metaTag);
        }
        
        metaTag.setAttribute('content', content);
      };

      // Meta tags básicas
      const description = product.seo_description || product.description || `Produto ${product.name}${product.brand ? ` da marca ${product.brand}` : ''}${product.category ? ` na categoria ${product.category.name}` : ''}. Peças automotivas e ferramentas industriais em Parauapebas.`;
      const keywords = product.seo_keywords || `${product.name}, ${product.brand || ''}, ${product.category?.name || ''}, peças automotivas, ferramentas industriais, Parauapebas${product.part_number ? `, ${product.part_number}` : ''}`;
      
      updateMetaTag('description', description);
      updateMetaTag('keywords', keywords);
      
      // Open Graph
      updateMetaTag('og:title', `${product.name}${product.part_number ? ` (${product.part_number})` : ''} | TH Distribuição`, true);
      updateMetaTag('og:description', description, true);
      updateMetaTag('og:image', product.image_url || 'https://thdistribuicao.com/logo-th.png', true);
      updateMetaTag('og:url', `https://thdistribuicao.com/produtos/${slug}`, true);
      updateMetaTag('og:type', 'product', true);
      
      // Twitter Cards
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', `${product.name}${product.part_number ? ` (${product.part_number})` : ''} | TH Distribuição`);
      updateMetaTag('twitter:description', description);
      updateMetaTag('twitter:image', product.image_url || 'https://thdistribuicao.com/logo-th.png');
      
      // Meta tags adicionais
      updateMetaTag('robots', 'index, follow');
      updateMetaTag('canonical', `https://thdistribuicao.com/produtos/${slug}`);
      updateMetaTag('author', 'TH Distribuição & Representação');
      updateMetaTag('publisher', 'TH Distribuição & Representação');
    }
    
    // Cleanup
    return () => {
      document.title = 'TH Distribuição & Representação - Especializada em peças automotivas, ferramentas e equipamentos industriais';
    };
  }, [product, slug]);

  // Adicionar JSON-LD para produto
  useEffect(() => {
    if (product) {
      const pageDescription = product.seo_description || product.description || `Produto ${product.name}${product.brand ? ` da marca ${product.brand}` : ''}${product.category ? ` na categoria ${product.category.name}` : ''}. Peças automotivas e ferramentas industriais em Parauapebas.`;
      
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": pageDescription,
        "brand": product.brand ? {
          "@type": "Brand",
          "name": product.brand
        } : undefined,
        "category": product.category?.name,
        "sku": product.part_number,
        "image": product.image_url,
        "url": `https://thdistribuicao.com/produtos/${slug}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "BRL",
          "availability": product.stock_quantity && product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "TH Distribuição & Representação",
            "url": "https://thdistribuicao.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Parauapebas",
              "addressRegion": "PA",
              "addressCountry": "BR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-94-99267-6134",
              "contactType": "customer service",
              "availableLanguage": "Portuguese"
            }
          },
          "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "10",
          "bestRating": "5",
          "worstRating": "1"
        },
        "additionalProperty": product.specifications ? Object.entries(product.specifications).map(([key, value]) => ({
          "@type": "PropertyValue",
          "name": key,
          "value": value
        })) : undefined
      };

      // Remover script anterior se existir
      const existingScript = document.querySelector('script[data-product-jsonld]');
      if (existingScript) {
        existingScript.remove();
      }

      // Adicionar novo script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-product-jsonld', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [product, slug]);

  // Adicionar JSON-LD para breadcrumbs
  useEffect(() => {
    if (product) {
      const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://thdistribuicao.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Produtos",
            "item": "https://thdistribuicao.com/produtos"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `https://thdistribuicao.com/produtos/${slug}`
          }
        ]
      };

      // Remover script anterior se existir
      const existingBreadcrumbScript = document.querySelector('script[data-breadcrumb-jsonld]');
      if (existingBreadcrumbScript) {
        existingBreadcrumbScript.remove();
      }

      // Adicionar novo script
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-breadcrumb-jsonld', 'true');
      breadcrumbScript.textContent = JSON.stringify(breadcrumbJsonLd);
      document.head.appendChild(breadcrumbScript);

      return () => {
        breadcrumbScript.remove();
      };
    }
  }, [product, slug]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="loading-inline">
            <img 
              src="/produtos/logo-th-loading.png" 
              alt="Carregando produto..." 
              className="loading-logo"
            />
            <p>Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="error-container">
          <h1>Produto não encontrado</h1>
          <p>O produto que você está procurando não foi encontrado.</p>
          <button 
            className="back-to-products-btn"
            onClick={() => navigate('/produtos')}
          >
            Voltar para Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      <div className="product-detail-content">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <button onClick={() => navigate('/')}>Home</button>
            <span>/</span>
            <button onClick={() => navigate('/produtos')}>Produtos</button>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          {/* Botão Voltar */}
          <div className="back-button-container">
            <button 
              className="back-to-products-btn"
              onClick={() => navigate('/produtos')}
            >
              <svg className="back-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar para Produtos
            </button>
          </div>

          <div className="product-detail-grid">
            {/* Imagem do produto */}
            <div className="product-image-section">
              <div className="product-image-container">
                {product.image_url ? (
                  <>
                    <img 
                      src={product.image_url} 
                      alt={`${product.name}${product.brand ? ` da marca ${product.brand}` : ''} - Peças automotivas e ferramentas industriais`}
                      className="product-main-image"
                    />
                    <div className="watermark-overlay">
                      <img 
                        src="/produtos/logo-th-loading.png" 
                        alt="TH Distribuição"
                        className="watermark-image"
                      />
                    </div>
                  </>
                ) : (
                  <div className="product-placeholder">
                    <img 
                      src="/produtos/logo-th-loading.png" 
                      alt="Imagem do produto não disponível"
                      className="placeholder-image"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Informações do produto */}
            <div className="product-info-section">
              <h1 className="product-title">{product.name}</h1>
              
              {product.part_number && (
                <p className="product-sku">Código: <strong>{product.part_number}</strong></p>
              )}

              <div className="product-badges">
                {product.brand && (
                  <span className="product-brand-badge">{product.brand}</span>
                )}
                {product.category && (
                  <span className="product-category-badge">{product.category.name}</span>
                )}
              </div>

              {product.description && (
                <div className="product-description">
                  <h3>Descrição</h3>
                  <p>{product.description}</p>
                </div>
              )}

              {product.specifications && (
                <div className="product-specifications">
                  <h3>Especificações</h3>
                  <div className="specs-content">
                    {typeof product.specifications === 'string' 
                      ? product.specifications 
                      : JSON.stringify(product.specifications, null, 2)
                    }
                  </div>
                </div>
              )}

              {product.price && (
                <div className="product-price-section">
                  <div className="product-price">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              )}

              <div className="product-actions">
                <button 
                  className="product-whatsapp-btn"
                  onClick={handleWhatsAppContact}
                >
                  <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="currentColor"/>
                  </svg>
                  Quero saber mais sobre este produto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;