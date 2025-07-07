import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const CARD_SIZE = 164; // px

const MarketSell = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 18, background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: 10, fontSize: 20, fontWeight: 700 }}>
        Борт полный — забирай!
      </h1>
      <p style={{ color: '#bbb', marginBottom: 12, fontSize: 14 }}>
        Выберите категорию для просмотра объявлений:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 16,
        maxWidth: CARD_SIZE * 2 + 16,
        margin: '0 auto',
        marginTop: 22,
        justifyContent: 'center'
      }}>
        {categories.map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(`/market/sell/${item.key}`)}
            style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              border: '1.2px solid #23232a',
              borderRadius: 17,
              backgroundColor: '#19191d',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 2px 13px #0004',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              transition: 'box-shadow .15s'
            }}
          >
            {/* Фиксированная высота для фото */}
            <div style={{
              width: '100%',
              height: 112,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#23232a'
            }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            {/* Текстовый блок всегда виден */}
            <div style={{
              flex: 'none',
              padding: '7px 6px 8px 6px',
              textAlign: 'center',
              background: '#19191d',
              minHeight: 39,
              boxSizing: 'border-box'
            }}>
              <div style={{
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 1,
                lineHeight: 1.13,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{item.title}</div>
              <div style={{
                color: '#bdbdbd',
                fontSize: 11,
                minHeight: 13,
                lineHeight: 1.18,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSell;
