import React from 'react';

const newsSections = [
  {
    emoji: '⚓',
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: 'https://via.placeholder.com/150',
  },
  {
    emoji: '🧾',
    title: 'Икорные войны',
    description: 'Анализ, сравнение, скандалы и успехи производителей',
    image: 'https://via.placeholder.com/150',
  },
  {
    emoji: '🏆',
    title: 'ТОП-10 компаний',
    description: 'Рейтинги поставщиков, доверие рынка, динамика',
    image: 'https://via.placeholder.com/150',
  },
  {
    emoji: '📸',
    title: 'Фото и видео',
    description: 'Stories c рейсов, портов, заводов',
    image: 'https://via.placeholder.com/150',
  },
];

const News = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Рынок / Новости побережья</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {newsSections.map((item, index) => (
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

export default News;
