// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Showcase from "./components/Showcase";
import Catalog from "./components/Catalog";
import SupplierDetail from "./components/SupplierDetail";
import LogisticsShowcase from "./components/LogisticsShowcase";
import ProductionShowcase from "./components/ProductionShowcase";

// Важно: имя файла — NeirobizScreen.js
import NeirobizShowcase from "./components/NeirobizScreen";
import NeirobizServiceDetail from "./components/NeirobizServiceDetail";

import News from "./components/News";
import Market from "./components/Market";
import MarketSell from "./components/MarketSell";
import MarketBuy from "./components/MarketBuy";
import MarketSellCategory from "./components/MarketSellCategory";
import MarketSellDetail from "./components/MarketSellDetail";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";
import TopProducers from "./components/TopProducers";
import ProducerDetail from "./components/ProducerDetail";
import CaviarWarBoard from "./components/CaviarWarBoard";
import AddAdForm from "./components/AddAdForm";

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

            {/* NeiroBiz */}
            <Route path="/neirobiz" element={<NeirobizShowcase />} />
            <Route path="/neirobiz/service/:id" element={<NeirobizServiceDetail />} />

            {/* News */}
            <Route path="/news" element={<News />} />
            <Route path="/news/ikra-wars" element={<CaviarWarBoard />} />
            <Route path="/news/top-producers" element={<TopProducers />} />

            {/* Market */}
            <Route path="/market" element={<Market />} />
            <Route path="/market/sell" element={<MarketSell />} />
            <Route path="/market/buy" element={<MarketBuy />} />
            <Route path="/market/sell/:category" element={<MarketSellCategory />} />
            <Route path="/market/sell/detail/:id" element={<MarketSellDetail />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/market/add" element={<AddAdForm />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
