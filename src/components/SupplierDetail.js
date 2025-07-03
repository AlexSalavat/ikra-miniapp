import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import suppliers from '../data/suppliers';
import CompanyProfile from './CompanyProfile';

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const company = suppliers.find((item) => item.id === id);

  if (!company) {
    return <div className="p-6">Поставщик не найден</div>;
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="m-4 px-4 py-2 bg-zinc-800 rounded-lg text-white"
      >
        ← Назад
      </button>
      <CompanyProfile company={company} />
    </>
  );
};

export default SupplierDetail;
