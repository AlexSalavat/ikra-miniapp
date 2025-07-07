import React from 'react';

const categories = [
  { title: 'Икра', description: 'Красная, чёрная, фасованная', image: '/images/cav.webp' },
  { title: 'Краб', description: 'Живой, мороженый, фаланги', image: '/images/krab.webp' },
  { title: 'Рыба', description: 'Лосось, треска, палтус и другие', image: '/images/fish.webp' },
  { title: 'Морепродукты', description: 'Креветки, гребешки, кальмары и пр.', image: '/images/mor.webp' },
];

const CARD_SIZE = 158;

const MarketBuy = () => (
  <div style={{ padding: 18, background: '#000', minHeight: '100vh' }}>
    <h1 style={{ color: '#fff', marginBottom: 10, fontWeight: 700, fontSize: 19 }}>Запросить улов</h1>
    <p style={{ color: '#ccc', fontSize: 13 }}>Выберите, что вы ищете:</p>
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
      gap: 15,
      maxWidth: CARD_SIZE * 2 + 15,
      margin: '0 auto',
      marginTop: 16,
      justifyContent: 'center'
    }}>
      {categories.map((item, index) => (
        <div key={index} style={{
          width: CARD_SIZE,
          height: CARD_SIZE,
          border: '1px solid #23232a',
          borderRadius: 16,
          overflow: 'hidden',
          background: '#18181c',
          boxShadow: '0 2px 13px #0002',
          position: 'relative',
          cursor: 'pointer'
        }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1
            }}
            onError={e => { e.target.src = '/images/no-image.webp'; }}
          />
          <div style={{
            position: 'absolute',
            left: 0, right: 0, bottom: 0,
            background: 'rgba(18,18,18,0.82)',
            color: '#fff',
            padding: '11px 9px 8px 9px',
            zIndex: 2,
            textAlign: 'left'
          }}>
            <div style={{
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 2,
              lineHeight: 1.14,
              wordBreak: 'break-word'
            }}>{item.title}</div>
            <div style={{
              color: '#ccc',
              fontSize: 10.5,
              lineHeight: 1.13
            }}>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MarketBuy;
