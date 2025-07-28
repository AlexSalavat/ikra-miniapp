import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Showcase from "./components/Showcase";
import Catalog from "./components/Catalog";
import SupplierDetail from "./components/SupplierDetail";
import LogisticsShowcase from "./components/LogisticsShowcase";
import ProductionShowcase from "./components/ProductionShowcase";
import TopProducers from "./components/TopProducers";
import ProducerDetail from "./components/ProducerDetail";
import NeirobizScreen from "./components/NeirobizScreen";
import News from "./components/News";
import Market from "./components/Market";
import MarketSellCategory from "./components/MarketSellCategory";
import MarketSellCreate from "./components/MarketSellCreate";
import MarketSellDetail from "./components/MarketSellDetail";
import MarketBuy from "./components/MarketBuy";
import Profile from "./components/Profile";
import CaviarWarBoard from "./components/CaviarWarBoard";
import BottomNav from "./components/BottomNav";

// Проверь, что ВСЕ указанные компоненты есть в src/components/ и экспортируются по default

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col pb-20">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/catalog" element={<Showcase />} />
            <Route path="/catalog/suppliers" element={<Catalog />} />
            <Route path="/supplier/:id" element={<SupplierDetail />} />

            <Route path="/logistics" element={<LogisticsShowcase />} />
            <Route path="/production" element={<ProductionShowcase />} />

            <Route path="/producers" element={<TopProducers />} />
            <Route path="/producer/:id" element={<ProducerDetail />} />

            <Route path="/neirobiz" element={<NeirobizScreen />} />

            <Route path="/news" element={<News />} />
            <Route path="/news/coast" element={<div style={{ color: "#fff", padding: 25 }}>Раздел в разработке</div>} />
            <Route path="/news/ikra-wars" element={<CaviarWarBoard />} />
            <Route path="/news/top-producers" element={<TopProducers />} />

            <Route path="/market" element={<Market />} />
            {/* Категории: /market/sell, /market/buy */}
            <Route path="/market/sell" element={<MarketSellCategory />} />
            <Route path="/market/sell/create" element={<MarketSellCreate />} />
            <Route path="/market/sell/:id" element={<MarketSellDetail />} />
            <Route path="/market/buy" element={<MarketBuy />} />

            <Route path="/profile" element={<Profile />} />

            {/* fallback на NotFound */}
            <Route path="*" element={<div style={{
              color: "#fff", background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>Страница не найдена</div>} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}
