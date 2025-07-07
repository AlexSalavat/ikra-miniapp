import React, { useState } from 'react';

const categories = [
  {
    key: 'икра',
    title: 'Икра',
    description: 'Красная, чёрная, фасованная',
    image: '/images/cav.webp',
  },
  {
    key: 'краб',
    title: 'Краб',
    description: 'Живой, мороженый, фаланги',
    image: '/images/krab.webp',
  },
  {
    key: 'рыба',
    title: 'Рыба',
    description: 'Лосось, треска, палтус и другие',
    image: '/images/fish.webp',
  },
  {
    key: 'морепродукты',
    title: 'Морепродукты',
    description: 'Креветки, гребешки, кальмары и пр.',
    image: '/images/mor.webp',
  },
];

const MarketSell = ({ onCategorySelect }) => {
  return (
    <div style={{ padding: '18px 0 80px 0', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 22, marginLeft: 18, marginBottom: 8 }}>Борт полный — забирай!</h1>
      <p style={{ color: '#ccc', marginLeft: 18, fontSize: 15, marginBottom: 18 }}>
        Выберите категорию для просмотра объявлений:
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          justifyContent: 'center',
          padding: '0 18px',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => {
              if (onCategorySelect) {
                onCategorySelect(cat.key);
              } else {
                window.location.href = `/market/sell/${cat.key}`;
              }
            }}
            style={{
              borderRadius: '18px',
              backgroundColor: '#191920',
              color: '#fff',
              boxShadow: '0 1.5px 8px #2224',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              minHeight: 164,
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            <img
              src={cat.image}
              alt={cat.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                flexGrow: 1,
                minHeight: 0
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <div
              style={{
                background: 'rgba(12,12,14,0.96)',
                width: '100%',
                padding: '7px 8px 6px 12px',
                position: 'absolute',
                left: 0,
                bottom: 0,
                fontSize: 12,
                fontWeight: 700,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
                boxSizing: 'border-box'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>{cat.title}</div>
              <div style={{ fontWeight: 400, color: '#c9c9c9', fontSize: 10, marginTop: 1 }}>
                {cat.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSell;
