import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="container">
          <section className="who-we-are">
            <div className="about-text">
              <h2 className="section-title">Quem somos</h2>
              <p className="about-description">
                A TH Distribuição & Representação atua como fornecedora estratégica no mercado de peças e suprimentos para os setores fora de estrada, mineração, siderurgia, linha pesada e agrícola. Com foco em excelência, agilidade e compromisso, atendemos empresas em todo o Brasil com uma linha completa de produtos e soluções técnicas.
              </p>
              <p className="about-description">
                Acreditamos no relacionamento próximo, atendimento humano e negociações seguras. Buscamos sempre o melhor custo-benefício, entregando produtos com qualidade garantida, rapidez e suporte especializado. Mais que uma distribuidora, somos uma aliada no crescimento e na eficiência dos nossos clientes.
              </p>
            </div>
            <div className="about-image">
              <div className="company-image">
                <img src="/sobre/faixada.jpg" alt="Fachada da TH Distribuição" />
              </div>
            </div>
          </section>

          <section className="stats-section">
            <div className="container">
              <h2 className="section-title">Nossos números</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">+ de 15</div>
                  <div className="stat-label">Anos de experiência no setor</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Compra segura e confiável</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">+ de 50</div>
                  <div className="stat-label">Parceiros comerciais</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">Excelência</div>
                  <div className="stat-label">Atendimento rápido e humanizado</div>
                </div>
              </div>
            </div>
          </section>

          <section className="sectors">
            <div className="container">
              <h2 className="section-title">Setores que <span className="highlight">Atendemos</span></h2>
              <div className="sectors-grid">
                <div className="sector-item">
                  <div className="sector-image">
                    <img src="/sobre/setores/veiculo-pesado.png" alt="Linha Pesada" />
                  </div>
                  <h3 className="sector-name">Linha Pesada</h3>
                  <p className="sector-description">Peças e componentes para veículos de carga pesada</p>
                </div>
                <div className="sector-item">
                  <div className="sector-image">
                    <img src="/sobre/setores/veiculo-mina.png" alt="Fora de Estrada" />
                  </div>
                  <h3 className="sector-name">Fora de Estrada</h3>
                  <p className="sector-description">Equipamentos para operações off-road</p>
                </div>
                <div className="sector-item">
                  <div className="sector-image">
                    <img src="/sobre/setores/industria.png" alt="Industrial" />
                  </div>
                  <h3 className="sector-name">Industrial</h3>
                  <p className="sector-description">Soluções para indústrias diversas</p>
                </div>
                <div className="sector-item">
                  <div className="sector-image">
                    <img src="/sobre/setores/mineracao.png" alt="Mineração" />
                  </div>
                  <h3 className="sector-name">Mineração</h3>
                  <p className="sector-description">Equipamentos para mineração e extração</p>
                </div>
                <div className="sector-item">
                  <div className="sector-image">
                    <img src="/sobre/setores/siderurgia.png" alt="Siderurgia" />
                  </div>
                  <h3 className="sector-name">Siderurgia</h3>
                  <p className="sector-description">Componentes para siderúrgicas</p>
                </div>
                <div className="sector-item">
                  <div className="sector-image">
                    <img src="/sobre/setores/agricola.png" alt="Agrícola" />
                  </div>
                  <h3 className="sector-name">Agrícola</h3>
                  <p className="sector-description">Equipamentos para agricultura</p>
                </div>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default About;
