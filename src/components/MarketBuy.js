import React, { useState } from 'react';

const categories = ['Икра', 'Краб', 'Рыба', 'Морепродукты'];

const offers = [
  {
    id: 1,
    category: 'Икра',
    title: 'Ищу: Икра лососевая 10 кг',
    region: 'Мурманск',
    desc: 'Интересует свежая икра для ресторана. Готов забрать в ближайшие 2 дня.',
    contact: '+7 900 123-45-67',
    details: 'Требуется поставка свежей икры высокого качества, оплата наличными при получении. Готов сотрудничать на постоянной основе.',
  },
  {
    id: 2,
    category: 'Краб',
    title: 'Ищу: Краб живой, опт',
    region: 'Владивосток',
    desc: 'Постоянные объемы, рассмотрю предложения.',
    contact: '+7 911 456-78-90',
    details: 'Интересует живой краб с доставкой в любой регион РФ. Оплата по договоренности.',
  },
  // Добавляй остальные объявления!
];

const MarketBuy = () => {
  const [selected, setSelected] = useState(categories[0]);
  const [modalOffer, setModalOffer] = useState(null);

  const filtered = offers.filter(o => o.category === selected);

  return (
    <div style={{ padding: '20px', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: '18px' }}>На охоте за уловом</h1>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            style={{
              background: selected === cat ? '#34e0a1' : '#18181A',
              color: selected === cat ? '#18181A' : '#fff',
              border: selected === cat ? '2px solid #34e0a1' : '1px solid #23232a',
              borderRadius: '14px',
              padding: '8px 20px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.16s',
              whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Список объявлений по категории */}
      <div>
        {filtered.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 40, fontSize: 15 }}>
            Нет объявлений в этой категории.
          </div>
        )}
        {filtered.map(offer => (
          <div
            key={offer.id}
            style={{
              border: '1px solid #222',
              borderRadius: '12px',
              background: '#191920',
              padding: '15px',
              marginBottom: '16px',
              color: '#fff'
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 3 }}>{offer.title}</div>
            <div style={{ color: '#34e0a1', fontWeight: 600, marginBottom: 2 }}>{offer.region}</div>
            <div style={{ color: '#ccc', fontSize: 14, marginBottom: 5 }}>{offer.desc}</div>
            <div style={{ color: '#888', fontSize: 13 }}>
              Контакт: <a href={`tel:${offer.contact.replace(/\s+/g, '')}`} style={{ color: '#37a0e0' }}>{offer.contact}</a>
            </div>
            <button
              style={{
                marginTop: 8,
                background: '#222',
                color: '#34e0a1',
                border: '1px solid #34e0a1',
                borderRadius: 9,
                padding: '6px 22px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer'
              }}
              onClick={() => setModalOffer(offer)}
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>
      {/* Модальное окно */}
      {modalOffer && (
        <div
          onClick={() => setModalOffer(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#191920',
              borderRadius: 16,
              padding: 24,
              color: '#fff',
              maxWidth: 370,
              width: '92%',
              boxShadow: '0 8px 32px #000b'
            }}
          >
            <button
              onClick={() => setModalOffer(null)}
              style={{
                position: 'absolute',
                top: 10,
                right: 18,
                color: '#aaa',
                fontSize: 23,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >×</button>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 7 }}>{modalOffer.title}</div>
            <div style={{ color: '#34e0a1', fontWeight: 600, marginBottom: 7 }}>{modalOffer.region}</div>
            <div style={{ color: '#ccc', fontSize: 15, marginBottom: 10 }}>{modalOffer.desc}</div>
            <div style={{ color: '#fff', fontSize: 15, marginBottom: 14 }}>{modalOffer.details}</div>
            <div style={{ color: '#aaa', fontSize: 14 }}>Контакт: <a href={`tel:${modalOffer.contact.replace(/\s+/g, '')}`} style={{ color: '#37a0e0' }}>{modalOffer.contact}</a></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketBuy;
