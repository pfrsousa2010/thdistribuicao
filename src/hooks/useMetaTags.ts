import { useEffect } from 'react';

interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  robots?: string;
  canonical?: string;
  author?: string;
  publisher?: string;
}

export const useMetaTags = (metaTags: MetaTags) => {
  useEffect(() => {
    // Atualizar título
    if (metaTags.title) {
      document.title = metaTags.title;
    }

    // Função para atualizar ou criar meta tag
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

    // Atualizar meta tags
    if (metaTags.description) {
      updateMetaTag('description', metaTags.description);
    }

    if (metaTags.keywords) {
      updateMetaTag('keywords', metaTags.keywords);
    }

    // Open Graph
    if (metaTags.ogTitle) {
      updateMetaTag('og:title', metaTags.ogTitle, true);
    }

    if (metaTags.ogDescription) {
      updateMetaTag('og:description', metaTags.ogDescription, true);
    }

    if (metaTags.ogImage) {
      updateMetaTag('og:image', metaTags.ogImage, true);
    }

    if (metaTags.ogUrl) {
      updateMetaTag('og:url', metaTags.ogUrl, true);
    }

    if (metaTags.ogType) {
      updateMetaTag('og:type', metaTags.ogType, true);
    }

    // Twitter Card
    if (metaTags.twitterTitle) {
      updateMetaTag('twitter:title', metaTags.twitterTitle);
    }

    if (metaTags.twitterDescription) {
      updateMetaTag('twitter:description', metaTags.twitterDescription);
    }

    if (metaTags.twitterImage) {
      updateMetaTag('twitter:image', metaTags.twitterImage);
    }

    if (metaTags.twitterCard) {
      updateMetaTag('twitter:card', metaTags.twitterCard);
    }

    // Meta tags adicionais para SEO
    if (metaTags.robots) {
      updateMetaTag('robots', metaTags.robots);
    }

    if (metaTags.canonical) {
      updateMetaTag('canonical', metaTags.canonical);
    }

    if (metaTags.author) {
      updateMetaTag('author', metaTags.author);
    }

    if (metaTags.publisher) {
      updateMetaTag('publisher', metaTags.publisher);
    }

    // Cleanup function para restaurar meta tags originais quando o componente desmontar
    return () => {
      // Restaurar título original
      document.title = 'TH Distribuição & Representação - Especializada em peças automotivas, ferramentas e equipamentos industriais';
      
      // Restaurar meta tags padrão
      updateMetaTag('description', 'TH Distribuição & Representação - Especializada em peças automotivas, ferramentas e equipamentos industriais em Parauapebas. Representamos marcas líderes como Milwaukee, Makita, Hella e outras.');
      updateMetaTag('keywords', 'peças automotivas, ferramentas industriais, Parauapebas, Milwaukee, Makita, Hella, TH Distribuição');
      updateMetaTag('robots', 'index, follow');
    };
  }, [metaTags]);
};
