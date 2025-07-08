import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Showcase from './components/Showcase';
import Catalog from './components/Catalog';
import SupplierDetail from './components/SupplierDetail';
import CompanyProfile from './components/CompanyProfile';
import Market from './components/Market';
import MarketSell from './components/MarketSell';
import MarketSellCategory from './components/MarketSellCategory';
import MarketBuy from './components/MarketBuy';
import BottomNav from './components/BottomNav';
import NeirobizScreen from './components/NeirobizScreen';
import News from './components/News';

// Новое:
import NewsCoast from './components/NewsCoast';
import CaviarWarBoard from './components/CaviarWarBoard';
import TopProducers from './components/TopProducers';
import LogisticsShowcase from './components/LogisticsShowcase';
import ProductionShowcase from './components/ProductionShowcase';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Showcase />} />
          <Route path="/catalog/suppliers" element={<Catalog />} />
          <Route path="/supplier/:id" element={<SupplierDetail />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/sell" element={<MarketSell />} />
          <Route path="/market/sell/:category" element={<MarketSellCategory />} />
          <Route path="/market/buy" element={<MarketBuy />} />
          <Route path="/profile" element={<div style={{ padding: '20px', color: '#fff' }}>Профиль</div>} />
          <Route path="/neirobiz" element={<NeirobizScreen />} />
          <Route path="/news" element={<News />} />
          {/* Новое */}
          <Route path="/news/coast" element={<NewsCoast />} />
          <Route path="/news/ikra-wars" element={<CaviarWarBoard />} />
          <Route path="/news/top-producers" element={<TopProducers />} />
          {/* Важно! Восстанавливаем маршруты */}
          <Route path="/logistics" element={<LogisticsShowcase />} />
          <Route path="/production" element={<ProductionShowcase />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
