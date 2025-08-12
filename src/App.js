import * as React from 'react';

const SupplierDetail = React.lazy(() => import('./components/SupplierDetail'));
const ProducerDetail = React.lazy(() => import('./components/ProducerDetail'));
const TopProducers = React.lazy(() => import('./components/TopProducers'));
const LogisticsShowcase = React.lazy(() => import('./components/LogisticsShowcase'));
const ProductionShowcase = React.lazy(() => import('./components/ProductionShowcase'));
const Market = React.lazy(() => import('./components/Market'));
const MarketSell = React.lazy(() => import('./components/MarketSell'));
const MarketBuy = React.lazy(() => import('./components/MarketBuy'));
const MarketSellCategory = React.lazy(() => import('./components/MarketSellCategory'));
const MarketSellDetail = React.lazy(() => import('./components/MarketSellDetail'));
const NeirobizScreen = React.lazy(() => import('./components/NeirobizScreen'));
const NeirobizServiceDetail = React.lazy(() => import('./components/NeirobizServiceDetail'));
const News = React.lazy(() => import('./components/News'));
const CaviarWarBoard = React.lazy(() => import('./components/CaviarWarBoard'));
const AdminLayout = React.lazy(() => import('./admin/AdminLayout'));
const AdminHome = React.lazy(() => import('./admin/AdminHome'));
const Suppliers = React.lazy(() => import('./admin/suppliers/Suppliers'));
const SuppliersListPage = React.lazy(() => import('./admin/suppliers/SuppliersListPage'));
const SupplierCreatePage = React.lazy(() => import('./admin/suppliers/SupplierCreatePage'));
const LeadFormPage = React.lazy(() => import('./components/LeadFormPage'));

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import DevAdminButton from './admin/DevAdminButton';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Showcase from './components/Showcase';

const Catalog = lazy(() => import('./components/Catalog'));
const LogisticsShowcase = lazy(() => import('./components/LogisticsShowcase'));
const ProductionShowcase = lazy(() => import('./components/ProductionShowcase'));
const TopProducers = lazy(() => import('./components/TopProducers'));
const ProducerDetail = lazy(() => import('./components/ProducerDetail'));
const NeirobizScreen = lazy(() => import('./components/NeirobizScreen'));
const NeirobizServiceDetail = lazy(() => import('./components/NeirobizServiceDetail'));
const News = lazy(() => import('./components/News'));
const NewsCoast = lazy(() => import('./components/NewsCoast'));
const CaviarWarBoard = lazy(() => import('./components/CaviarWarBoard'));
const Market = lazy(() => import('./components/Market'));
const MarketSell = lazy(() => import('./components/MarketSell'));
const MarketBuy = lazy(() => import('./components/MarketBuy'));
const MarketSellCategory = lazy(() => import('./components/MarketSellCategory'));
const MarketSellDetail = lazy(() => import('./components/MarketSellDetail'));
const AddAdForm = lazy(() => import('./components/AddAdForm'));
const Profile = lazy(() => import('./components/Profile'));

// Admin
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminHome = lazy(() => import('./admin/AdminHome'));
const AdminSuppliers = lazy(() => import('./admin/suppliers/Suppliers'));
const SuppliersListPage = lazy(() => import('./admin/suppliers/SuppliersListPage'));
const SupplierCreatePage = lazy(() => import('./admin/suppliers/SupplierCreatePage'));

function Loading() {
  return <div className="p-4">Loading...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white pb-[72px] md:pb-0">
        <Suspense fallback={<Loading />}>
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
            <Route path="/neirobiz/service/:id" element={<NeirobizServiceDetail />} />

            <Route path="/news" element={<News />} />
            <Route path="/news/coast" element={<NewsCoast />} />
            <Route path="/news/ikra-wars" element={<CaviarWarBoard />} />
            <Route path="/news/top-producers" element={<TopProducers />} />

            <Route path="/market" element={<Market />} />
            <Route path="/market/sell" element={<MarketSell />} />
            <Route path="/market/buy" element={<MarketBuy />} />
            <Route path="/market/sell/:category" element={<MarketSellCategory />} />
            <Route path="/market/sell/detail/:id" element={<MarketSellDetail />} />
            <Route path="/market/add" element={<AddAdForm />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="suppliers" element={<AdminSuppliers />} />
              <Route path="suppliers/list" element={<SuppliersListPage />} />
              <Route path="suppliers/create" element={<SupplierCreatePage />} />
            </Route>
            <Route path="/lead" element={<LeadFormPage />} />
          </Routes>
        </Suspense>

        <DevAdminButton />
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
