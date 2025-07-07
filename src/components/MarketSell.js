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
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Если нужна только навигация через react-router, этот проп не нужен
  // и нужно вместо onCategorySelect использовать navigate(`/market/sell/${cat.key}`)

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
                window.location.href = `/market/sell/${cat.key}`; // Если нет роутера
              }
            }}
            style={{
              borderRadius: '19px',
              backgroundColor: '#191920',
              color: '#fff',
              boxShadow: '0 1.5px 8px #2224',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'stretch',
              minHeight: 158,
              aspectRatio: '1/1',
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
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <div
              style={{
                background: 'rgba(12,12,14,0.97)',
                width: '100%',
                padding: '8px 8px 7px 11px',
                position: 'absolute',
                left: 0,
                bottom: 0,
                fontSize: 13,
                fontWeight: 700,
                borderBottomLeftRadius: 19,
                borderBottomRightRadius: 19,
                boxSizing: 'border-box'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14 }}>{cat.title}</div>
              <div style={{ fontWeight: 400, color: '#c9c9c9', fontSize: 11, marginTop: 1 }}>
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
