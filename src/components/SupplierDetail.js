import React from 'react';
import { useParams } from 'react-router-dom';
import suppliers from '../data/suppliers';
import CompanyProfile from './CompanyProfile';

const SupplierDetail = () => {
  const { id } = useParams();

  const company = suppliers.find(s => s.id === id);

  if (!company) {
    return <div style={{ padding: 20, color: 'white' }}>Поставщик не найден</div>;
  }

  return <CompanyProfile company={company} />;
};

export default SupplierDetail;
