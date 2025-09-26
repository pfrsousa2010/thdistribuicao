import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToProducts = () => {
    navigate('/produtos');
  };
  return (
    <section className="hero">
      <div className="hero-background">
        <img 
          src="/home/fundo-header.png" 
          alt="Background industrial" 
          className="hero-background-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-logo">
          <img src="/logo-th.png" alt="TH Distribuição & Representação" className="logo" />
        </div>
        
        <div className="hero-text">
          <h1 className="hero-title">Peças e suprimentos para</h1>
          <p className="hero-subtitle">
            Linha pesada | Fora de estrada | Industrial | Mineração | Siderurgia | Agrícola
          </p>
          <div className="hero-cta">
            <button className="hero-button primary" onClick={scrollToContact}>Fale conosco</button>
            <button className="hero-button secondary" onClick={goToProducts}>Ver produtos</button>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-number">+ de 15</span>
          <span className="stat-label">Anos de experiência</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Compra segura</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">+ de 50</span>
          <span className="stat-label">Parceiros comerciais</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">Excelência</span>
          <span className="stat-label">Atendimento especializado</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
