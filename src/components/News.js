import React from 'react';

const newsSections = [
  {
    emoji: '⚓',
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: '/images/new.webp',
  },
  {
    emoji: '🍣',
    title: 'Икорные войны',
    description: 'Анализ, сравнение рынков, интересные факты',
    image: '/images/war.webp',
  },
  {
    emoji: '🏆',
    title: 'ТОП-10 производителей',
    description: 'Рейтинги поставщиков, доверие рынка, динамика',
    image: '/images/pk.webp',
  },
  {
    emoji: '📸',
    title: 'Фото и видео',
    description: 'Stories c рейсов, портов, заводов',
    image: '/images/new.webp',
  },
];

const News = () => (
  <div style={{
    background: '#000',
    minHeight: '100vh',
    padding: '16px 0 80px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <h1 style={{
      color: '#fff',
      fontSize: 25,
      fontWeight: 700,
      marginBottom: 16,
      marginTop: 8,
      letterSpacing: 0.2
    }}>
      Новости и события
    </h1>
    <div style={{
      width: '100%',
      maxWidth: 420,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      padding: '0 10px',
    }}>
      {newsSections.map((item, idx) => (
        <div key={idx} style={{
          background: '#191920',
          borderRadius: 19,
          overflow: 'hidden',
          boxShadow: '0 2px 10px #0003',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 156,
        }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: 76,
                objectFit: 'cover',
                display: 'block'
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
          </div>
          <div style={{
            padding: '8px 10px 8px 11px',
            background: '#181820',
            minHeight: 0
          }}>
            <div style={{
              fontWeight: 700,
              fontSize: 14.2,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <span style={{fontSize:16}}>{item.emoji}</span>
              {item.title}
            </div>
            <div style={{
              fontWeight: 400,
              color: '#bababa',
              fontSize: 11.6,
              minHeight: 28,
              lineHeight: 1.22,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default News;
