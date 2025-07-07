import React from 'react';

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
              borderRadius: '17px',
              backgroundColor: '#191920',
              color: '#fff',
              boxShadow: '0 1.5px 8px #2224',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              minHeight: 180,
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch'
            }}
          >
            {/* Фото — строго сверху, не перекрывает текст */}
            <div style={{
              width: '100%',
              height: '70%',
              flexShrink: 0,
              flexGrow: 0,
              position: 'relative',
              background: '#23232a'
            }}>
              <img
                src={cat.image}
                alt={cat.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            {/* Текст — только под фото */}
            <div style={{
              width: '100%',
              padding: '10px 9px 9px 13px',
              background: '#191920',
              boxSizing: 'border-box',
              flexGrow: 1
            }}>
              <div style={{
                fontWeight: 700,
                fontSize: 13.7,
                color: '#fff',
                marginBottom: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{cat.title}</div>
              <div style={{
                fontWeight: 400,
                color: '#c9c9c9',
                fontSize: 11.2,
                marginTop: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSell;
