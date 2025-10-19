#!/usr/bin/env node

/**
 * Script para gerar sitemap de produtos
 * Execute com: npm run generate-sitemap
 */

import fs from 'fs';
import path from 'path';

// Configuração do Supabase (mesma do arquivo supabase.ts)
const supabaseUrl = 'https://ckbpucxltrskhvfwgxqc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYnB1Y3hsdHJza2h2ZndneHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDQxODAsImV4cCI6MjA3NDM4MDE4MH0.2-AAN_8R4jjZv7yBcZHK48k1XDc8orYW0Trb_hNG1iE';

// Função para fazer requisição HTTP simples (sem usar Supabase client)
const fetchProducts = async () => {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/products?select=slug,updated_at,created_at&is_active=eq.true&slug=not.is.null`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

const generateProductSitemap = async () => {
  try {
    console.log('🔍 Buscando produtos no Supabase...');
    
    // Buscar produtos
    const products = await fetchProducts();
    
    console.log(`📦 Encontrados ${products.length} produtos`);

    // URLs estáticas do site
    const staticUrls = [
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
    const productUrls = products.map(product => ({
      loc: `https://thdistribuicao.com/produtos/${product.slug}`,
      lastmod: new Date(product.updated_at || product.created_at).toISOString(),
      changefreq: 'weekly',
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

const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://thdistribuicao.com/sitemap-products.xml
Sitemap: https://thdistribuicao.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};

const generateSitemap = async () => {
  try {
    console.log('🚀 Gerando sitemap de produtos...');
    
    // Gerar sitemap XML
    const sitemapXml = await generateProductSitemap();
    
    // Salvar sitemap
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-products.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
    
    // Gerar robots.txt
    const robotsTxt = generateRobotsTxt();
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    
    // Estatísticas
    const urlCount = sitemapXml.split('<url>').length - 1;
    
    console.log('✅ Sitemap gerado com sucesso!');
    console.log(`📊 Total de URLs: ${urlCount}`);
    console.log(`📁 Arquivo salvo em: ${sitemapPath}`);
    console.log(`🤖 Robots.txt atualizado: ${robotsPath}`);
    
  } catch (error) {
    console.error('❌ Erro ao gerar sitemap:', error);
    process.exit(1);
  }
};

// Executar sempre quando o script for chamado
generateSitemap();

export default generateSitemap;