import React from 'react';

const newsSections = [
  {
    emoji: '⚓',
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: '/images/new.webp',
  },
  {
    emoji: '🧾',
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
    description: 'Stories с рейсов, портов, заводов',
    image: '/images/new.webp',
  },
];

const News = () => (
  <div style={{
    background: '#000',
    minHeight: '100vh',
    padding: '20px 0 80px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <h1 style={{
      color: '#fff',
      fontWeight: 700,
      fontSize: 23,
      marginBottom: 13,
      marginTop: 2,
      letterSpacing: 0.15
    }}>
      Новости и события
    </h1>
    <div style={{
      width: '100%',
      maxWidth: 420,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      padding: '0 10px',
    }}>
      {newsSections.map((item, idx) => (
        <div
          key={idx}
          style={{
            borderRadius: 19,
            backgroundColor: '#191920',
            color: '#fff',
            boxShadow: '0 1.5px 8px #2224',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 158,
            aspectRatio: '1/1',
            textDecoration: 'none'
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 97,
              objectFit: 'cover',
              flexGrow: 1,
            }}
            onError={e => { e.target.src = '/images/no-image.webp'; }}
          />
          <div
            style={{
              background: 'rgba(12,12,14,0.98)',
              width: '100%',
              padding: '8px 10px 7px 12px',
              borderBottomLeftRadius: 19,
              borderBottomRightRadius: 19,
              boxSizing: 'border-box',
              minHeight: 44
            }}
          >
            <div style={{
              fontWeight: 700,
              fontSize: 13.6,
              marginBottom: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              <span style={{marginRight: 4}}>{item.emoji}</span>
              {item.title}
            </div>
            <div style={{
              fontWeight: 400,
              color: '#c9c9c9',
              fontSize: 10.6,
              marginTop: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
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
