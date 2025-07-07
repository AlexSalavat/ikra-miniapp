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
    description: 'Stories c рейсов, портов, заводов',
    image: '/images/new.webp',
  },
];

const CARD_SIZE = 194;

const News = () => (
  <div style={{
    padding: 20,
    background: '#000',
    minHeight: '100vh',
    maxWidth: 820,
    margin: '0 auto'
  }}>
    <h1 style={{
      color: '#fff',
      fontSize: 22,
      fontWeight: 700,
      marginBottom: 17,
      textAlign: 'center'
    }}>
      Новости и события
    </h1>

    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(2, minmax(${CARD_SIZE}px, 1fr))`,
      gap: 22,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {newsSections.map((item, idx) => (
        <div key={idx} style={{
          background: '#18181a',
          borderRadius: 19,
          boxShadow: '0 1.5px 7px #0003',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          minHeight: CARD_SIZE,
          aspectRatio: '1/1',
          border: '1.2px solid #23232a',
        }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: CARD_SIZE * 0.56,
              objectFit: 'cover',
              display: 'block',
              borderTopLeftRadius: 19,
              borderTopRightRadius: 19,
            }}
            onError={e => { e.target.src = '/images/no-image.webp'; }}
          />
          <div style={{
            padding: '13px 13px 12px 15px',
            color: '#fff',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: 0,
          }}>
            <div style={{
              fontSize: 14.3,
              fontWeight: 700,
              marginBottom: 4,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}>
              {item.emoji} {item.title}
            </div>
            <div style={{
              fontSize: 11.5,
              color: '#ccc',
              lineHeight: 1.48,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
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
