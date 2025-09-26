import React from 'react';
import Hero from '../components/Hero';
import BannerCarousel from '../components/BannerCarousel';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Hero />
      
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">
                Compromisso com Qualidade e Atendimento Especializado
              </h2>
              <p className="about-description">
                A TH atua na distribuição e representação de peças para linhas fora de estrada, 
                pesada, industrial e mineração com marcas reconhecidas e soluções confiáveis para você.
              </p>
            </div>
            <div className="about-video">
              <video 
                className="mining-video" 
                autoPlay 
                muted 
                loop 
                playsInline
              >
                <source src="/home/videos/mineracao.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-preview">
        <div className="container">
          <h2 className="section-title">Produtos de qualidade e confiança</h2>
          <div className="products-carousel">
            <BannerCarousel />
          </div>
          <button className="view-products-btn">Ver Produtos</button>
        </div>
      </section>

      <section className="location-section">
        <div className="container">
          <h2 className="section-title">Onde operamos</h2>
          <div className="location-content">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.123456789!2d-49.8701879!3d-6.0884607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92dd5196e97f7687%3A0xe157c23cbb71b824!2sTH%20DISTRIBUI%C3%87%C3%83O%20E%20REPRESENTA%C3%87%C3%83O%20LTDA.!5e0!3m2!1spt-BR!2sbr!4v1699123456789!5m2!1spt-BR!2sbr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização TH Distribuição"
              />
            </div>
            <div className="location-info">
              <h3 className="location-title">Unidade Parauapebas</h3>
              <p className="location-address">
                Rod. PA 160, nº 121, qd 16, Galpão B - Bairro Esplanada<br />
                Parauapebas - PA, 68515-000
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="brands-section">
        <div className="container">
          <h2 className="section-title">Nossas melhores <span className="highlight">Marcas</span></h2>
          <div className="brands-grid">
            <div className="brand-card">
              <img src="/home/marcas/kito.png" alt="KITO" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/milwaukee.png" alt="Milwaukee" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/gauer.png" alt="GAUER" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/delco.png" alt="Delco Remy" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/hella.png" alt="HELLA" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/dni.png" alt="DNI" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/sil.png" alt="SIL" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/makita.png" alt="Makita" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/paraflu.png" alt="PARAFLU" />
            </div>
            <div className="brand-card">
              <img src="/home/marcas/loctite.png" alt="LOCTITE" />
            </div>
          </div>
          <p className="other-brands">Outras marcas</p>
          <div className="other-brands-grid">
            <span className="brand-tag">3Rho</span>
            <span className="brand-tag">AMATOOLS</span>
            <span className="brand-tag">BETA</span>
            <span className="brand-tag">SNAP-ON</span>
            <span className="brand-tag">DENSO</span>
            <span className="brand-tag">DITA</span>
            <span className="brand-tag">DINAMIC SOLUÇÕES</span>
            <span className="brand-tag">FEK</span>
            <span className="brand-tag">GEDORE</span>
            <span className="brand-tag">GTECH</span>
            <span className="brand-tag">IAM</span>
            <span className="brand-tag">IMOBRAS</span>
            <span className="brand-tag">MTX</span>
            <span className="brand-tag">MULTILIGHT</span>
            <span className="brand-tag">ORBI QUÍMICA</span>
            <span className="brand-tag">OSPINA</span>
            <span className="brand-tag">PRADOLUX</span>
            <span className="brand-tag">REFRIJET</span>
            <span className="brand-tag">ROBUSTEC</span>
            <span className="brand-tag">ROYCE</span>
            <span className="brand-tag">SANDEN</span>
            <span className="brand-tag">SEG</span>
            <span className="brand-tag">VETOR</span>
            <span className="brand-tag">ZM</span>
          </div>
        </div>
      </section>

      <section id="contato" className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-header">
              <span className="contact-badge">Entre em contato</span>
              <h2 className="contact-title">Não perca tempo, contate-nos agora!</h2>
              <p className="contact-subtitle">
                Conte com nossa expertise para soluções em suprimentos e equipamentos. 
                Nossa equipe está pronta para atender você.
              </p>
            </div>
            
            <div className="contact-methods">
              <a href="https://wa.me/5594992676134?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20e%20serviços%20de%20vendas." className="contact-card whatsapp-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon whatsapp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="currentColor"/>
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Vendas</h3>
                  <p className="contact-card-number">(94) 9 9267-6134</p>
                  <span className="contact-card-action">Falar agora</span>
                </div>
              </a>

              <a href="https://wa.me/5594981716387?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20sobre%20questões%20financeiras%20e%20pagamentos." className="contact-card whatsapp-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon whatsapp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="currentColor"/>
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Financeiro</h3>
                  <p className="contact-card-number">(94) 9 8171-6387</p>
                  <span className="contact-card-action">Falar agora</span>
                </div>
              </a>

              <a href="https://instagram.com/thdistribuicao" className="contact-card instagram-card" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon-wrapper">
                  <svg className="contact-icon instagram-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3 className="contact-card-title">Instagram</h3>
                  <p className="contact-card-number">@thdistribuicao</p>
                  <span className="contact-card-action">Seguir</span>
                </div>
              </a>
            </div>
          </div>
          
          <div className="contact-image">
            <video 
              className="contact-video" 
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="/home/videos/caminhao-estrada.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
