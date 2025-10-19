// Sitemap generator para produtos
// Este arquivo pode ser usado para gerar sitemap dinâmico dos produtos

import { supabase } from '../services/supabase';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateProductSitemap = async (): Promise<string> => {
  try {
    // Buscar todos os produtos ativos com slug
    const { data: products, error } = await supabase
      .from('products')
      .select('slug, updated_at, created_at')
      .eq('is_active', true)
      .not('slug', 'is', null)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar produtos para sitemap:', error);
      throw error;
    }

    // URLs estáticas do site
    const staticUrls: SitemapUrl[] = [
      {
        loc: 'https://thdistribuicao.com',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: 'https://thdistribuicao.com/produtos',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9
      },
      {
        loc: 'https://thdistribuicao.com/sobre',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: 'https://thdistribuicao.com/representacoes',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      }
    ];

    // URLs dos produtos
    const productUrls: SitemapUrl[] = (products || []).map(product => ({
      loc: `https://thdistribuicao.com/produtos/${product.slug}`,
      lastmod: new Date(product.updated_at || product.created_at).toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8
    }));

    // Combinar todas as URLs
    const allUrls = [...staticUrls, ...productUrls];

    // Gerar XML do sitemap
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>`).join('')}
</urlset>`;

    return sitemapXml;
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    throw error;
  }
};

// Função para salvar sitemap em arquivo (para uso em build)
export const saveSitemapToFile = async (_filePath: string = 'public/sitemap-products.xml'): Promise<void> => {
  try {
    const sitemapXml = await generateProductSitemap();
    
    // Em um ambiente Node.js, você usaria fs.writeFileSync
    // fs.writeFileSync(filePath, sitemapXml, 'utf8');
    
    console.log('Sitemap gerado com sucesso!');
    console.log(`Total de URLs: ${sitemapXml.split('<url>').length - 1}`);
    
    // Para desenvolvimento, vamos apenas logar
    console.log('Sitemap XML:', sitemapXml);
  } catch (error) {
    console.error('Erro ao salvar sitemap:', error);
    throw error;
  }
};

// Função para gerar robots.txt com referência ao sitemap
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://thdistribuicao.com/sitemap-products.xml
Sitemap: https://thdistribuicao.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};

// Função para uso em build scripts
export const buildSitemap = async () => {
  try {
    console.log('Gerando sitemap de produtos...');
    await saveSitemapToFile();
    console.log('Sitemap gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
    process.exit(1);
  }
};

// Exportar para uso em outros arquivos
export default {
  generateProductSitemap,
  saveSitemapToFile,
  generateRobotsTxt,
  buildSitemap
};
