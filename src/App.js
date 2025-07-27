import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Showcase from "./components/Showcase";
import Catalog from "./components/Catalog";
import SupplierDetail from "./components/SupplierDetail";
import LogisticsShowcase from "./components/LogisticsShowcase";
import ProductionShowcase from "./components/ProductionShowcase";
import NeirobizScreen from "./components/NeirobizScreen";
import News from "./components/News";
import Market from "./components/Market";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col pb-20">
        <div className="flex-1">
          <Routes>
            {/* Главная страница — Home.js (фон, текст, баннер) */}
            <Route path="/" element={<Home />} />

            {/* Категории — Showcase */}
            <Route path="/catalog" element={<Showcase />} />
            <Route path="/catalog/suppliers" element={<Catalog />} />
            <Route path="/supplier/:id" element={<SupplierDetail />} />
            <Route path="/logistics" element={<LogisticsShowcase />} />
            <Route path="/production" element={<ProductionShowcase />} />
            <Route path="/neirobiz" element={<NeirobizScreen />} />

            {/* Новости, Маркет, Профиль */}
            <Route path="/news" element={<News />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
