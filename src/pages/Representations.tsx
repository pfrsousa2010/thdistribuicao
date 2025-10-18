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
      description: 'Líder global em sistemas de freio eletromagnético para veículos pesados e equipamentos de mineração. Oferece soluções inovadoras para caminhões, veículos off-road e transporte especial. Representação aprovada por fabricantes como Mercedes-Benz, Volvo e Volkswagen.',
      website: 'https://frenelsa.com.br/',
      logo: '/representacao/marcas/frenelsa.png',
      products: '/representacao/produtos/frenelsa-produto.png'
    },
    {
      id: '2',
      brand_name: 'MTZ ERGO GRAVITY',
      description: 'Especializada em manipuladores ergonômicos e braços ergo-gravity para movimentação segura de ferramentas industriais e equipamentos pesados. Soluções para indústria metal-mecânica, mineração e siderurgia.',
      website: 'https://www.mtzbrasil.com.br/pt-br',
      logo: '/representacao/marcas/mtz-ergo.png',
      products: '/representacao/produtos/mtz-produtos.png'
    },
    {
      id: '3',
      brand_name: 'HYTORC®',
      description: 'Representação exclusiva da HYTORC no Pará, oferecendo ferramentas de torque controlado e soluções avançadas para equipamentos industriais. Reconhecida globalmente pela excelência em sistemas de aperto e fixação para indústria pesada e mineração.',
      website: 'https://www.hytorc.com/hytorc-brasil',
      logo: '/representacao/marcas/hytorc.png',
      products: '/representacao/produtos/hytorc-produtos.png'
    },
    {
      id: '4',
      brand_name: 'böhler welding by voestalpine',
      description: 'Líder global em trilhos, componentes e soluções para sistemas de transporte fora de estrada e equipamentos industriais. Conhecida pela qualidade austríaca, inovação e durabilidade em aplicações de mineração e veículos off-road.',
      website: 'https://www.voestalpine.com/welding/pt-pt/',
      logo: '/representacao/marcas/bholer.png',
      products: '/representacao/produtos/bholer-produtos.png'
    },
    {
      id: '5',
      brand_name: 'USIPE FUNDIÇÃO USINAGEM CALDEIRARIA',
      description: 'Referência nacional na fabricação de peças metálicas sob medida para equipamentos industriais e veículos pesados. Atua em fundição, usinagem e caldeiraria atendendo setores metal-mecânico, mineração, siderurgia e equipamentos off-road.',
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
            <h2 className="section-title">Representações Exclusivas de <span className="highlight">Marcas Líderes</span></h2>
            <p className="section-description">
              Somos representantes oficiais de marcas líderes mundiais em <strong>peças automotivas</strong>,            <strong>ferramentas e suprimentos industriais</strong>. 
              Oferecemos produtos de alta qualidade e tecnologia avançada para <strong>veículos off-road</strong>, <strong>caminhões</strong> e <strong>equipamentos industriais</strong>.
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