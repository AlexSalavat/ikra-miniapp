import React from 'react';
import suppliers from '../data/suppliers';
import SupplierCard from './SupplierCard';

const Catalog = () => {
  return (
    <div style={{
      padding: '20px 8px 70px 8px',
      minHeight: '100vh',
      background: '#000'
    }}>
      <h2 style={{
        fontSize: '1.13rem',
        marginBottom: '16px',
        color: '#fff',
        fontWeight: 400,
        letterSpacing: '-0.5px'
      }}>
        Витрина: Поставщики
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // ТРИ колонки!
        gap: '10px',
        justifyItems: 'center', // чтобы карточки были по центру
      }}>
        {suppliers.map((item) => (
          <SupplierCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
