import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { key: 'икра', label: 'Икра' },
  { key: 'краб', label: 'Краб' },
  { key: 'рыба', label: 'Рыба' },
  { key: 'морепродукты', label: 'Морепродукты' }
];

const offers = [
  {
    id: 1,
    category: 'икра',
    title: 'Ищу икру',
    description: 'Закупаем красную икру, регулярные объёмы.',
    contact: '@ikra_buyer',
  },
  {
    id: 2,
    category: 'краб',
    title: 'Требуется краб',
    description: 'Интересуют предложения по крабу.',
    contact: '@krab_zakup',
  },
  // Добавь другие объявления по категориям!
];

const MarketBuy = () => {
  const [selected, setSelected] = useState('икра');
  const navigate = useNavigate();
  const filtered = offers.filter(o => o.category === selected);

  return (
    <div style={{ padding: 16, background: '#000', minHeight: '100vh' }}>
      <button
        onClick={() => navigate('/market')}
        style={{
          marginBottom: 16,
          padding: '7px 18px',
          borderRadius: 10,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer'
        }}
      >
        ← К Маркету
      </button>
      <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>На охоте за уловом</h1>
      <div style={{
        display: 'flex',
        gap: 7,
        marginBottom: 18,
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelected(cat.key)}
            style={{
              padding: '6px 13px',
              fontSize: 13,
              fontWeight: 700,
              background: selected === cat.key ? '#34e0a1' : '#1e1e22',
              color: selected === cat.key ? '#181818' : '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: selected === cat.key ? '0 2px 7px #2af1a155' : 'none',
              letterSpacing: '-0.2px'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>Нет объявлений по выбранной категории.</div>
        )}
        {filtered.map(offer => (
          <div key={offer.id} style={{
            background: '#191920',
            borderRadius: 12,
            padding: '12px 14px',
            boxShadow: '0 1px 7px #0002'
          }}>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 3 }}>
              {offer.title}
            </div>
            <div style={{ color: '#bbb', fontSize: 13, marginBottom: 2 }}>
              {offer.description}
            </div>
            <div style={{ color: '#37a0e0', fontSize: 13 }}>
              Контакт: {offer.contact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketBuy;
