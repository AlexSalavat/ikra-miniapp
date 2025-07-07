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

const MarketSell = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#fff', marginBottom: '10px' }}>Борт полный — забирай!</h1>
      <p style={{ color: '#ccc' }}>Выберите категорию для размещения или просмотра объявлений:</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {categories.map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(`/market/sell/${item.key}`)}
            style={{
              border: '1px solid #222',
              borderRadius: '12px',
              padding: '15px',
              backgroundColor: '#18181A',
              textAlign: 'center',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.18s'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <h3 style={{
              marginTop: '10px',
              fontWeight: 'bold',
              fontSize: '1.05rem'
            }}>
              {item.title}
            </h3>
            <p style={{ color: '#ccc', fontSize: '0.98rem' }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSell;
