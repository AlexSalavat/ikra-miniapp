import React, { useState } from 'react';
import suppliers from '../data/suppliers';
import SupplierCard from './SupplierCard';

const CARDS_PER_PAGE = 18;
const CARDS_PER_ROW = 3;

// Цвета для страниц: золото, серебро, бронза, обычный
const borderColors = [
  '#e9c663',    // Золото
  '#c2c2c8',    // Серебро
  '#bb8855',    // Бронза
  '#363646',    // Обычный серый
];

function getBorderColor(pageIndex) {
  return borderColors[pageIndex] || borderColors[3];
}

function Pagination({ page, totalPages, onChange }) {
  return (
    <div style={{
      margin: '28px 0 5px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8
    }}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        style={{
          padding: '2px 12px',
          borderRadius: '9px',
          border: 'none',
          background: page === 1 ? '#23232a' : '#363646',
          color: '#bdbdbd',
          fontSize: 17,
          cursor: page === 1 ? 'default' : 'pointer',
          opacity: page === 1 ? 0.55 : 1,
          transition: 'background .18s'
        }}
      >&#60;</button>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onChange(idx + 1)}
          style={{
            minWidth: 33,
            minHeight: 32,
            borderRadius: '12px',
            border: 'none',
            background: page === idx + 1 ? '#363646' : 'transparent',
            color: page === idx + 1 ? '#ffe495' : '#babec9',
            fontWeight: page === idx + 1 ? 700 : 400,
            fontSize: 18,
            cursor: page === idx + 1 ? 'default' : 'pointer',
            boxShadow: page === idx + 1 ? '0 1px 6px #2227' : 'none',
            margin: '0 1px',
            transition: 'background .17s, color .17s'
          }}
        >{idx + 1}</button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        style={{
          padding: '2px 12px',
          borderRadius: '9px',
          border: 'none',
          background: page === totalPages ? '#23232a' : '#363646',
          color: '#bdbdbd',
          fontSize: 17,
          cursor: page === totalPages ? 'default' : 'pointer',
          opacity: page === totalPages ? 0.55 : 1,
          transition: 'background .18s'
        }}
      >&#62;</button>
    </div>
  );
}

const Catalog = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(suppliers.length / CARDS_PER_PAGE) || 1;
  // Минимум 4 страницы (дальше — если поставщиков больше 72)
  const allPages = totalPages < 4 ? 4 : totalPages;

  const startIdx = (page - 1) * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const currentSuppliers = suppliers.slice(startIdx, endIdx);

  const placeholders = Array.from(
    { length: Math.max(0, CARDS_PER_PAGE - currentSuppliers.length) },
    (_, idx) => ({
      id: `placeholder-${startIdx + idx}`,
      name: 'Место свободно',
      isPlaceholder: true,
    })
  );
  const fullList = [...currentSuppliers, ...placeholders];

  const borderColor = getBorderColor(page - 1);

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
        gap: '5px',
        justifyItems: 'stretch',
      }}>
        {fullList.map((item, idx) => (
          <SupplierCard
            key={item.id}
            id={item.id}
            {...item}
            borderColor={borderColor}
            isFirst={idx === 0 && !item.isPlaceholder}
          />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={allPages}
        onChange={num => {
          if (num >= 1 && num <= allPages) setPage(num);
        }}
      />
    </div>
  );
};

export default Catalog;
