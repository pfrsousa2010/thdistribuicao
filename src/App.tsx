import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Representations from './pages/Representations';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isProductsPage = location.pathname === '/produtos';

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/representacoes" element={<Representations />} />
        </Routes>
      </main>
      <Footer />
      {!isProductsPage && <WhatsAppButton />}
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
