// src/components/Catalog.js

import React from 'react';
import suppliers from '../data/suppliers';
import SupplierCard from './SupplierCard';

const CARDS_PER_ROW = 3;

// Добавляем заглушки, если меньше 3-х карточек
const placeholders = Array.from(
  { length: Math.max(0, CARDS_PER_ROW - suppliers.length) },
  (_, idx) => ({
    id: `placeholder-${idx}`,
    name: 'Место свободно',
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
        gap: '5px', // регулируй здесь нужный тебе зазор!
        justifyItems: 'stretch',
      }}>
        {fullList.map((item, idx) => (
          <SupplierCard
            key={item.id}
            id={item.id} 
            {...item}
            isFirst={idx === 0 && !item.isPlaceholder}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
