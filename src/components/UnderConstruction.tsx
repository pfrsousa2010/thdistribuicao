import './UnderConstruction.css';
import logoTh from '../../public/logo-th.png';
import { SITE_CONFIG } from '../config/site-config';

const UnderConstruction = () => {
  return (
    <div className="under-construction">
      <div className="under-construction-content">
        <img 
          src={logoTh} 
          alt="TH Distribuição Logo" 
          className="logo"
        />
        
        <div className="construction-icon">
          🚧
        </div>
        
        <h1 className="title">Site em Construção</h1>
        
        <p className="subtitle">
          Estamos trabalhando para trazer a você a melhor experiência. 
          Em breve, nosso site estará no ar com todas as informações 
          sobre nossos produtos e serviços.
        </p>
        
        <div className="contact-info">
          <h2 className="contact-title">Entre em Contato</h2>
          <div className="contact-details">
            <div className="contact-item">
              <span>📞</span>
              <span>Telefone: {SITE_CONFIG.CONTACT_INFO.phone}</span>
            </div>
            <div className="contact-item">
              <a 
                href={`mailto:${SITE_CONFIG.CONTACT_INFO.email}?subject=Contato através do site TH Distribuição&body=Olá! Entre em contato através do site da TH Distribuição.`}
                className="email-link"
              >
                <span>📧</span>
                <span>Email: {SITE_CONFIG.CONTACT_INFO.email}</span>
              </a>
            </div>
            <div className="contact-item">
              <a 
                href={`https://wa.me/${SITE_CONFIG.CONTACT_INFO.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.CONTACT_INFO.whatsappText)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                <span>💬</span>
                <span>Fale conosco no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="developer-credit">
          <p>
            Em desenvolvimento por{' '}
            <a 
              href="mailto:microfocuspro@gmail.com?subject=Desenvolvimento TH Distribuição&body=Olá! Entre em contato sobre o desenvolvimento do site da TH Distribuição."
              className="developer-link"
            >
              Micro Focus Pro
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
