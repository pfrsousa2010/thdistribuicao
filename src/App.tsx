import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import UnderConstruction from './components/UnderConstruction';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Representations from './pages/Representations';
import { SITE_CONFIG } from './config/site-config';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isProductsPage = location.pathname === '/produtos';
  const isProductDetailPage = location.pathname.startsWith('/produtos/') && location.pathname !== '/produtos';

  // Se o site está em construção, mostra apenas a página de construção
  if (SITE_CONFIG.UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:slug" element={<ProductDetail />} />
          <Route path="/representacoes" element={<Representations />} />
        </Routes>
      </main>
      <Footer />
      {!isProductsPage && !isProductDetailPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
