import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import BottomNav from './components/BottomNav';
import TopProducers from './components/TopProducers';

// Экраны (ленивая загрузка)
const Home = lazy(() => import('./components/Home'));
const Catalog = lazy(() => import('./components/Catalog'));
const Market = lazy(() => import('./components/Market'));
const MarketBuy = lazy(() => import('./components/MarketBuy'));
const MarketSell = lazy(() => import('./components/MarketSell'));
const MarketSellCategory = lazy(() => import('./components/MarketSellCategory'));
const MarketSellDetail = lazy(() => import('./components/MarketSellDetail'));
const News = lazy(() => import('./components/News'));
const Profile = lazy(() => import('./components/Profile'));
import ProducerDetail from './components/ProducerDetail';
const SupplierDetail = lazy(() => import('./components/SupplierDetail'));
const LeadFormPage = lazy(() => import('./components/LeadFormPage'));

function AppShell() {
  return (
    <div className="min-h-screen pb-20 bg-white">
      <main className="max-w-screen-md mx-auto px-3 py-2">
        <Suspense fallback={<div className="p-6 text-lg">Загрузка</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />

            <Route path="/market" element={<Market />} />
            <Route path="/market/buy" element={<MarketBuy />} />
            <Route path="/market/sell" element={<MarketSell />} />
            <Route path="/market/sell/category" element={<MarketSellCategory />} />
            <Route path="/market/sell/:id" element={<MarketSellDetail />} />

            <Route path="/news" element={<News />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/producer/:id" element={<ProducerDetail />} />
            <Route path="/supplier/:id" element={<SupplierDetail />} />
            <Route path="/lead" element={<LeadFormPage />} />

            <Route path="/producers" element={<TopProducers />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="max-w-screen-md mx-auto">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    try {
      const tg = window?.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand(); // разворачиваем на максимум
        // второй цвет для шапки/хедера (под тему Telegram)
        tg.setHeaderColor('secondary_bg_color');
      }
    } catch (_) {}
  }, []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}




