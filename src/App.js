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
import MarketSell from "./components/MarketSell";
import MarketBuy from "./components/MarketBuy";
import MarketSellCategory from "./components/MarketSellCategory";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";
import TopProducers from "./components/TopProducers";
import ProducerDetail from "./components/ProducerDetail";
import CaviarWarBoard from "./components/CaviarWarBoard"; // <<-- ВАЖНО! добавлен импорт

function App() {
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
            <Route path="/news/top-producers" element={<TopProducers />} />
            <Route path="/news/ikra-wars" element={<CaviarWarBoard />} /> {/* <--- вот этот роут */}
            <Route path="/market" element={<Market />} />
            <Route path="/market/sell" element={<MarketSell />} />
            <Route path="/market/buy" element={<MarketBuy />} />
            <Route path="/market/sell/:category" element={<MarketSellCategory />} />
            <Route path="/profile" element={<Profile />} />
            {/* Фолбэк на любые другие (не найдено) */}
            <Route path="*" element={
              <div style={{
                background: "#000", color: "#fff", minHeight: "100vh",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
              }}>Страница не найдена</div>
            } />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
