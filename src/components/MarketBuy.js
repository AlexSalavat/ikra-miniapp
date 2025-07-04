import React from 'react';

const categories = [
  {
    title: 'Икра',
    description: 'Красная, чёрная, фасованная',
    image: '/images/ikr.webp',
  },
  {
    title: 'Краб',
    description: 'Живой, мороженый, фаланги',
    image: '/images/no-image.webp',
  },
  {
    title: 'Рыба',
    description: 'Лосось, треска, палтус и другие',
    image: '/images/fish-logo.webp',
  },
  {
    title: 'Морепродукты',
    description: 'Креветки, гребешки, кальмары и пр.',
    image: '/images/production.webp',
  },
];

const MarketBuy = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#fff', marginBottom: '10px' }}>Запросить улов</h1>
      <p style={{ color: '#ccc' }}>Выберите, что вы ищете:</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {categories.map((item, index) => (
          <div key={index} style={{
            border: '1px solid #222',
            borderRadius: '12px',
            padding: '15px',
            backgroundColor: '#18181A',
            textAlign: 'center',
            color: '#fff'
          }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} onError={e => { e.target.src = '/images/no-image.webp'; }} />
            <h3 style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.05rem' }}>{item.title}</h3>
            <p style={{ color: '#ccc', fontSize: '0.98rem' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketBuy;
