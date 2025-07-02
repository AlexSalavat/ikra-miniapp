import React from 'react';

const categories = [
  {
    emoji: '🧊',
    title: 'Икра',
    description: 'Красная, чёрная, фасованная',
    image: 'https://via.placeholder.com/150',
  },
  {
    emoji: '🦀',
    title: 'Краб',
    description: 'Живой, мороженый, фаланги',
    image: 'https://via.placeholder.com/150',
  },
  {
    emoji: '🐟',
    title: 'Рыба',
    description: 'Лосось, треска, палтус и другие',
    image: 'https://via.placeholder.com/150',
  },
  {
    emoji: '🦐',
    title: 'Морепродукты',
    description: 'Креветки, гребешки, кальмары и пр.',
    image: 'https://via.placeholder.com/150',
  },
];

const MarketSell = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Сбросить улов</h1>
      <p>Выберите, что вы продаёте:</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {categories.map((item, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '12px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            textAlign: 'center'
          }}>
            <img src={item.image} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
            <h3 style={{ marginTop: '10px' }}>{item.emoji} {item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSell;
