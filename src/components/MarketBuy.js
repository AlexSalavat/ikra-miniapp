import React, { useState } from 'react';

const categories = ['Икра', 'Краб', 'Рыба', 'Морепродукты'];

// Это заявки покупателей, которые хотят купить товар
const requests = [
  {
    id: 1,
    category: 'Икра',
    title: 'Ищу икру красную оптом',
    desc: 'Закупаем свежую красную икру, фасованную и на развес. Москва, регионы, самовывоз возможен.',
    contact: '@buyer_ikra',
    region: 'Москва',
  },
  {
    id: 2,
    category: 'Краб',
    title: 'Нужен живой краб',
    desc: 'Интересует живой камчатский краб, объём от 50 кг. Работаем по договору.',
    contact: '+7 999 123-45-67',
    region: 'Владивосток',
  },
  // Добавь свои заявки по аналогии!
];

const MarketBuy = () => {
  const [selected, setSelected] = useState('Икра');
  const filtered = requests.filter((r) => r.category === selected);

  return (
    <div style={{ padding: '18px 8px 80px 8px', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 21, marginBottom: 9 }}>Запросить улов</h1>
      <div style={{ display: 'flex', gap: 9, marginBottom: 15, justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            style={{
              padding: '6px 17px',
              borderRadius: 14,
              fontWeight: 600,
              fontSize: 14,
              background: selected === cat ? '#34e0a1' : '#19191c',
              color: selected === cat ? '#222' : '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: selected === cat ? '0 2px 10px #30e0a122' : 'none',
              marginBottom: 5
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {filtered.length === 0 && (
          <div style={{ color: '#777', textAlign: 'center', marginTop: 48 }}>
            Нет запросов в этой категории.
          </div>
        )}
        {filtered.map(req => (
          <div
            key={req.id}
            style={{
              borderRadius: 16,
              background: '#17171c',
              padding: '13px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              boxShadow: '0 2px 10px #0001',
              color: '#fff',
              fontSize: 15,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15 }}>{req.title}</div>
            <div style={{ color: '#b8ffec', fontSize: 14, marginBottom: 2 }}>{req.region}</div>
            <div style={{ color: '#eee', fontSize: 14, marginBottom: 2 }}>{req.desc}</div>
            <div style={{ color: '#62afff', fontSize: 14 }}>
              Контакт: {req.contact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketBuy;
