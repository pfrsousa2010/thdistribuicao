import React, { useEffect } from 'react';
import './Representations.css';

const Representations: React.FC = () => {
  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const representations = [
    {
      id: '1',
      brand_name: 'FRENELSA',
      description: 'Líder global em sistemas de freio eletromagnético, oferecendo soluções inovadoras para transporte e veículos especiais. Representação aprovada por fabricantes como Mercedes-Benz, Volvo e Volkswagen.',
      website: 'https://frenelsa.com.br/',
      logo: '/representacao/marcas/frenelsa.png',
      products: '/representacao/produtos/frenelsa-produto.png'
    },
    {
      id: '2',
      brand_name: 'MTZ ERGO GRAVITY',
      description: 'Especializada em manipuladores ergonômicos e braços ergo-gravity para movimentação segura e precisa de ferramentas e objetos em ambientes industriais.',
      website: 'https://www.mtzbrasil.com.br/pt-br',
      logo: '/representacao/marcas/mtz-ergo.png',
      products: '/representacao/produtos/mtz-produtos.png'
    },
    {
      id: '3',
      brand_name: 'HYTORC®',
      description: 'Representação exclusiva da HYTORC no Pará, oferecendo ferramentas de torque controlado e soluções avançadas. Reconhecida globalmente pela excelência em sistemas de aperto e fixação industrial.',
      website: 'https://www.hytorc.com/hytorc-brasil',
      logo: '/representacao/marcas/hytorc.png',
      products: '/representacao/produtos/hytorc-produtos.png'
    },
    {
      id: '4',
      brand_name: 'böhler welding by voestalpine',
      description: 'Líder global em trilhos, componentes e soluções para sistemas de transporte fora de estrada e industrial, conhecida pela qualidade austríaca, inovação e durabilidade.',
      website: 'https://www.voestalpine.com/welding/pt-pt/',
      logo: '/representacao/marcas/bholer.png',
      products: '/representacao/produtos/bholer-produtos.png'
    },
    {
      id: '5',
      brand_name: 'USIPE FUNDIÇÃO USINAGEM CALDEIRARIA',
      description: 'Referência nacional na fabricação de peças metálicas sob medida, atuando em fundição, usinagem e caldeiraria. Atende setores metal-mecânico, mineração, siderurgia, papel e celulose.',
      website: 'http://www.usipe.com.br/',
      logo: '/representacao/marcas/usipe.png',
      products: '/representacao/produtos/usipe-produtos.png'
    }
  ];


  return (
    <div className="representations-page">
      <div className="representations-content">
        <div className="container">
          <section className="representations-intro">
            <h2 className="section-title">Nossas <span className="highlight">Representações</span></h2>
            <p className="section-description">
              Trabalhamos com marcas líderes mundiais, oferecendo produtos de alta qualidade 
              e tecnologia avançada para atender as necessidades específicas de cada setor.
            </p>
          </section>

          <section className="representations-grid">
            {representations.map((representation) => (
              <div key={representation.id} className="representation-card">
                <div className="representation-header">
                  <div className="brand-logo">
                    <img src={representation.logo} alt={representation.brand_name} />
                  </div>
                </div>
                
                <div className="representation-body">
                  <p className="brand-description">{representation.description}</p>
                  
                  {representation.website && (
                    <a 
                      href={representation.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="brand-website"
                    >
                      Visitar site oficial
                    </a>
                  )}
                </div>

                <div className="brand-products">
                  <img src={representation.products} alt={`Produtos ${representation.brand_name}`} />
                </div>

              </div>
            ))}
          </section>
        </div>
      </div>

    </div>
  );
};

export default Representations;