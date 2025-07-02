import React from 'react';
import suppliers from '../data/suppliers';
import SupplierCard from './SupplierCard';

// В строке 3 карточки
const CARDS_PER_ROW = 3;

const placeholders = Array.from(
  { length: Math.max(0, CARDS_PER_ROW - suppliers.length) },
  (_, idx) => ({
    id: `placeholder-${idx}`,
    name: 'Место свободно',
    logo: '/images/placeholder-logo.png', // сюда свою иконку-заглушку
    isPlaceholder: true,
  })
);

const fullList = [...suppliers, ...placeholders];

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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        justifyItems: 'stretch', // чтобы карточки тянулись на всю ширину колонки!
      }}>
        {fullList.map((item) => (
          <SupplierCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
