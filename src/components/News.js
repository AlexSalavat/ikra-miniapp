import React from 'react';

const newsSections = [
  {
    title: 'Новости побережья',
    description: 'Свежие события, вылов, прогнозы, изменения на рынке',
    image: '/images/new.webp',
    link: '/news/coast'
  },
  {
    title: 'Икорные войны',
    description: 'Аналитика, сравнения, закулисье',
    image: '/images/war.webp',
    link: '/news/ikra-wars'
  },
  {
    title: 'ТОП-10 производителей',
    description: 'Рейтинги, динамика и доверие рынка',
    image: '/images/pk.webp',
    link: '/news/top-producers'
  },
  {
    title: 'Фото и видео',
    description: 'Stories c рейсов, портов, заводов',
    image: '/images/photo.webp',
    link: '#' // пока не реализовано
  },
];

const CARD_SIZE = 185;

const News = () => {
  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      padding: '26px 0 80px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 21,
        marginBottom: 13,
        marginTop: 2,
        letterSpacing: 0.13
      }}>
        Новости
      </h1>
      <div style={{
        width: '100%',
        maxWidth: 410,
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 15,
        justifyContent: 'center',
      }}>
        {newsSections.map((item, idx) => (
          <a
            href={item.link}
            key={idx}
            style={{
              borderRadius: 17,
              background: '#1d1c21',
              overflow: 'hidden',
              width: CARD_SIZE,
              height: CARD_SIZE,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 10px #16141a44',
              textDecoration: 'none',
              position: 'relative'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '74%',
                objectFit: 'cover',
                background: '#23232a',
                display: 'block'
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <div style={{
              width: '100%',
              padding: '8px 11px 8px 11px',
              background: '#19191d',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexGrow: 1,
              borderBottomLeftRadius: 17,
              borderBottomRightRadius: 17
            }}>
              <span style={{
                fontWeight: 700,
                color: '#fff',
                fontSize: 12.2,
                marginBottom: 1,
                lineHeight: '1.13',
                maxHeight: 32,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}>
                {item.title}
              </span>
              <span style={{
                fontWeight: 400,
                color: '#b5b5b5',
                fontSize: 9.3,
                lineHeight: '1.13',
                maxHeight: 24,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'normal'
              }}>
                {item.description}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;
