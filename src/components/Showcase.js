import React from 'react';

const items = [
  {
    title: 'Поставщики',
    description: 'Визуальный каталог проверенных игроков',
    image: '/images/suppliers.webp',
    link: '/catalog/suppliers',
  },
  {
    title: 'Логистика ДВ',
    description: 'Авто, Ж/Д, Авиа',
    image: '/images/logistics.webp',
    link: '/logistics',
  },
  {
    title: 'Производство',
    description: 'Фасовка, маркировка',
    image: '/images/production.webp',
    link: '/production',
  },
  {
    title: 'Neirobiz (AI)',
    description: 'AI сервисы и генерация упаковки',
    image: '/images/neirobiz.webp',
    link: '/neirobiz',
  },
];

const CARD_SIZE = 185;

export default function Showcase() {
  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      padding: '24px 0 80px 0',
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
        Витрина
      </h1>
      <div style={{
        width: '100%',
        maxWidth: 480,
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 18,
        justifyContent: 'center',
      }}>
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            style={{
              borderRadius: 20,
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
              padding: '7px 10px 8px 11px',
              background: '#19191d',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexGrow: 1,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20
            }}>
              <span style={{
                fontWeight: 700,
                color: '#fff',
                fontSize: 13.3,
                marginBottom: 2,
                lineHeight: '1.17',
                maxHeight: 36,
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
                fontSize: 10.1,
                lineHeight: '1.16',
                maxHeight: 30,
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
}
