import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Showcase from './components/Showcase';
import Catalog from './components/Catalog';
import SupplierDetail from './components/SupplierDetail';
import Market from './components/Market';
import MarketSell from './components/MarketSell';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Showcase />} />
          <Route path="/catalog/suppliers" element={<Catalog />} />
          <Route path="/supplier/:id" element={<SupplierDetail />} />
          <Route path="/news" element={<div style={{ padding: '20px' }}>Новости</div>} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/sell" element={<MarketSell />} />
          <Route path="/profile" element={<div style={{ padding: '20px' }}>Профиль</div>} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
