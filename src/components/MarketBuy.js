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
          marginBottom: 14,
          padding: '6px 13px',
          borderRadius: 10,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >
        ← К Маркету
      </button>
      <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>На охоте за уловом</h1>
      <div style={{
        display: 'flex',
        gap: 5,
        marginBottom: 13,
        width: '100%',
        justifyContent: 'center',
        flexWrap: 'nowrap'
      }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelected(cat.key)}
            style={{
              background: selected === cat.key ? "#23232a" : "none",
              color: selected === cat.key ? "#20d978" : "#bababa",
              border: `1.3px solid ${selected === cat.key ? "#20d978" : "#23232a"}`,
              borderRadius: 7,
              padding: '4px 10px',
              fontWeight: 700,
              fontSize: 12.2,
              minWidth: 70,
              cursor: "pointer",
              transition: "border .12s, color .16s, background .18s"
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
