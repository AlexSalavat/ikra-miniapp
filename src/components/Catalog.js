import React from 'react';
import suppliers from '../data/suppliers';
import SupplierCard from './SupplierCard';

const Catalog = () => {
  return (
    <div style={{
      padding: '22px 14px 90px 14px',
      minHeight: '100vh',
      background: '#000'
    }}>
      <h2 style={{
        fontSize: '1.13rem',
        marginBottom: '20px',
        color: '#fff',
        fontWeight: 400,
        letterSpacing: '-0.5px',
        textShadow: '0 2px 8px rgba(0,0,0,0.18)'
      }}>
        Витрина: <span style={{ color: '#fff', fontWeight: 400 }}>Поставщики</span>
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
      }}>
        {suppliers.map((item) => (
          <SupplierCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
