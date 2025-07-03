import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Showcase from './components/Showcase';
import Catalog from './components/Catalog';
// Импортируем новую страницу компании
import CompanyProfile from './components/CompanyProfile';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Главная витрина */}
          <Route path="/catalog" element={<Showcase />} />

          {/* Категория Поставщики */}
          <Route path="/catalog/suppliers" element={<Catalog />} />

          {/* Страница поставщика теперь CompanyProfile */}
          <Route path="/supplier/:id" element={<CompanyProfile />} />

          {/* Заглушки */}
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
