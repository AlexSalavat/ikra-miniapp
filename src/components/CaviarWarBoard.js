import React, { useState } from 'react';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];

// Примерные данные (в реале у тебя всё в data/*.js)
const DATA = [
  { region: 'Камчатка', category: 'Нерка', startPrice: 7500, price: 7650, date: '2025-07-10' },
  { region: 'Камчатка', category: 'Горбуша', startPrice: 6800, price: 7000, date: '2025-07-10' },
  { region: 'Камчатка', category: 'Кета', startPrice: 6900, price: 7100, date: '2025-07-10' },
  { region: 'Сахалин', category: 'Горбуша', startPrice: 6700, price: 6550, date: '2025-07-10' },
  { region: 'Сахалин', category: 'Кета', startPrice: 6850, price: 6900, date: '2025-07-10' },
  { region: 'Хабаровск', category: 'Кета', startPrice: 6800, price: 6950, date: '2025-07-10' },
  { region: 'Магадан', category: 'Горбуша', startPrice: 6700, price: 6600, date: '2025-07-10' },
];

function Dynamics({ price, startPrice }) {
  const diff = price - startPrice;
  let color = '#bababa',
    arrow = '—',
    sign = '';
  if (diff > 0) {
    color = '#23df81';
    arrow = '▲';
    sign = '+';
  } else if (diff < 0) {
    color = '#f55757';
    arrow = '▼';
    sign = '';
  }
  return (
    <span
      style={{
        fontWeight: 700,
        color,
        fontSize: 13.5,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        justifyContent: 'flex-end',
      }}
    >
      {sign}
      {diff !== 0 ? Math.abs(diff) : 0}₽<span style={{ fontSize: 12, marginLeft: 2 }}>{arrow}</span>
    </span>
  );
}

export default function CaviarWarBoard() {
  const [region, setRegion] = useState(REGIONS[0]);
  const filtered = DATA.filter((row) => row.region === region);

  return (
    <div
      style={{
        background: '#000',
        minHeight: '100vh',
        padding: '18px 0 60px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button
        onClick={() => window.history.back()}
        style={{
          alignSelf: 'flex-start',
          marginLeft: 12,
          marginBottom: 7,
          padding: '5px 12px',
          borderRadius: 9,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 12.5,
          cursor: 'pointer',
        }}
      >
        ← Назад
      </button>
      <div
        style={{
          fontWeight: 900,
          fontSize: 18,
          color: '#fff',
          marginBottom: 11,
          letterSpacing: '0.05em',
        }}
      >
        Икорные войны
      </div>
      {/* Фильтр в одну строку, компактнее */}
      <div
        style={{
          display: 'flex',
          gap: 5,
          marginBottom: 13,
          width: '100%',
          justifyContent: 'center',
          flexWrap: 'nowrap',
        }}
      >
        {REGIONS.map((r) => (
          <button
            key={r}
            style={{
              background: region === r ? '#23232a' : 'none',
              color: region === r ? '#20d978' : '#bababa',
              border: `1.3px solid ${region === r ? '#20d978' : '#23232a'}`,
              borderRadius: 7,
              padding: '4px 10px',
              fontWeight: 700,
              fontSize: 12.2,
              cursor: 'pointer',
              minWidth: 70,
              transition: 'border .12s, color .16s, background .18s',
            }}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          minWidth: 240,
          background: '#16171b',
          borderRadius: 10,
          boxShadow: '0 2px 10px #18191c45',
          overflow: 'hidden',
          padding: '0 0 4px 0',
        }}
      >
        {/* Шапка таблицы */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.12fr 1fr 0.92fr 1fr',
            padding: '6px 8px 5px 9px',
            fontWeight: 700,
            color: '#e4e4e4',
            fontSize: 12.2,
            background: '#1a1a20',
            borderBottom: '1.1px solid #242427',
            textAlign: 'left',
          }}
        >
          <span>Категория</span>
          <span style={{ textAlign: 'right' }}>Цена</span>
          <span style={{ textAlign: 'right' }}>Дата</span>
          <span style={{ textAlign: 'right' }}>Динамика</span>
        </div>
        {/* Данные */}
        {filtered.length === 0 && (
          <div style={{ color: '#888', fontSize: 12, textAlign: 'center', padding: '12px 0' }}>
            Нет данных
          </div>
        )}
        {filtered.map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.12fr 1fr 0.92fr 1fr',
              padding: '8px 8px 7px 9px',
              fontWeight: 500,
              fontSize: 12.9,
              color: '#fff',
              alignItems: 'center',
              borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid #1b1c1f',
              textAlign: 'left',
              minHeight: 28,
              letterSpacing: '-0.2px',
            }}
          >
            <span
              style={{
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {row.category}
            </span>
            <span style={{ fontWeight: 700, textAlign: 'right', letterSpacing: '-0.3px' }}>
              {row.price}₽
            </span>
            <span style={{ color: '#bebec7', fontSize: 12, textAlign: 'right', fontWeight: 600 }}>
              {row.date.slice(5).split('-').reverse().join('.')}
            </span>
            <span style={{ textAlign: 'right' }}>
              <Dynamics price={row.price} startPrice={row.startPrice} />
            </span>
          </div>
        ))}
      </div>
      <div style={{ color: '#888', fontSize: 11.2, marginTop: 10, textAlign: 'center' }}>
        Динамика — от стартовой цены сезона (01.07).
      </div>
    </div>
  );
}
