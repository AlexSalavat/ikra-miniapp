import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Showcase from './components/Showcase';
import Catalog from './components/Catalog';
import SupplierDetail from './components/SupplierDetail';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}> {/* чтобы контент не перекрывался меню */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Главная витрина */}
          <Route path="/catalog" element={<Showcase />} />

          {/* Категория Поставщики */}
          <Route path="/catalog/suppliers" element={<Catalog />} />

          {/* Страница поставщика */}
          <Route path="/supplier/:id" element={<SupplierDetail />} />

          {/* Заглушки на будущее */}
          <Route path="/news" element={<div style={{ padding: '20px' }}>Новости</div>} />
          <Route path="/market" element={<div style={{ padding: '20px' }}>Маркет</div>} />
          <Route path="/profile" element={<div style={{ padding: '20px' }}>Профиль</div>} />
        </Routes>
      </div>

      <BottomNav />
    </Router>
  );
}

export default App;
