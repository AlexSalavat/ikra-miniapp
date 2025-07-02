import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import suppliers from '../data/suppliers';
import CompanyProfile from './CompanyProfile'; // <-- Импортируй компонент на Tailwind

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const supplier = suppliers.find((item) => item.id === id);

  if (!supplier) {
    return (
      <div className="p-8 text-white">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-400 hover:underline">
          ← Назад
        </button>
        <div>Поставщик не найден</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-3 top-3 text-base text-blue-400 bg-zinc-800 px-4 py-2 rounded-lg shadow hover:bg-zinc-700 transition z-40"
      >
        ← Назад
      </button>

      <CompanyProfile company={supplier} />
    </div>
  );
};

export default SupplierDetail;
