// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Showcase from "./components/Showcase";
import Catalog from "./components/Catalog";
import SupplierDetail from "./components/SupplierDetail";
import LogisticsShowcase from "./components/LogisticsShowcase";
import ProductionShowcase from "./components/ProductionShowcase";
import News from "./components/News";
import NewsCoast from "./components/NewsCoast";
import CaviarWarBoard from "./components/CaviarWarBoard";
import TopProducers from "./components/TopProducers";
import MarketSellCategory from "./components/MarketSellCategory";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";
// ...добавь остальные компоненты, если нужно

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col pb-20">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/supplier/:id" element={<SupplierDetail />} />
            <Route path="/logistics" element={<LogisticsShowcase />} />
            <Route path="/production" element={<ProductionShowcase />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/coast" element={<NewsCoast />} />
            <Route path="/news/ikra-wars" element={<CaviarWarBoard />} />
            <Route path="/news/top-producers" element={<TopProducers />} />
            <Route path="/market/sell/:category" element={<MarketSellCategory />} />
            <Route path="/profile" element={<Profile />} />
            {/* ...добавь другие страницы по мере роста */}
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
