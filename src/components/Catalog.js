import React from 'react';
import suppliers from '../data/suppliers';
import SupplierCard from './SupplierCard';

const Catalog = () => {
  return (
    <div style={{ padding: '16px', paddingBottom: '80px' }}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Витрина: Поставщики</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        {suppliers.map((item) => (
          <SupplierCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
