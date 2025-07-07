import React from 'react';

const newsSections = [
  {
    emoji: '⚓',
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: '/images/new.webp',
  },
  {
    emoji: '🏆',
    title: 'ТОП производители',
    description: 'Рейтинги поставщиков, доверие рынка, динамика',
    image: '/images/pk.webp',
  },
  {
    emoji: '🧾',
    title: 'Икорные войны',
    description: 'Аналитика, сравнения, инсайды',
    image: '/images/war.webp',
  },
  {
    emoji: '📸',
    title: 'Фото и видео',
    description: 'Stories с рейсов, портов, заводов',
    image: '/images/new.webp',
  },
];

const CARD_SIZE = 158;

const News = () => {
  return (
    <div style={{ padding: 18, minHeight: '100vh', background: '#000' }}>
      <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
        Новости побережья
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: '14px',
        maxWidth: CARD_SIZE * 2 + 14,
        margin: '0 auto',
        marginTop: 16,
        justifyContent: 'center'
      }}>
        {newsSections.map((item, index) => (
          <div key={index}
            style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              border: '1px solid #23232a',
              borderRadius: 16,
              background: '#18181c',
              overflow: 'hidden',
              boxShadow: '0 2px 13px #0002',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              cursor: 'pointer'
            }}>
            {/* Фото без зазоров */}
            <div style={{
              width: '100%',
              height: '69%',
              background: '#23232a'
            }}>
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            </div>
            {/* Название и описание */}
            <div style={{
              padding: '7px 6px 5px 6px',
              textAlign: 'center',
              background: '#18181c',
              minHeight: 40,
              flex: 'none',
              color: '#fff'
            }}>
              <div style={{
                fontWeight: 700,
                fontSize: 11.7,
                marginBottom: 1,
                lineHeight: 1.13,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                color: '#fff'
              }}>
                {item.emoji} {item.title}
              </div>
              <div style={{
                color: '#eee',
                fontSize: 9.6,
                minHeight: 11,
                lineHeight: 1.13,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
              }}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
