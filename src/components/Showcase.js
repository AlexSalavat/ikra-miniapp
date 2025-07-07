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
    title: 'Neirobiz',
    description: 'AI сервисы и генерация упаковки',
    image: '/images/neirobiz.webp',
    link: '/neirobiz',
  },
];

const CARD_SIZE = 160;

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
        maxWidth: 420,
        display: 'grid',
        gridTemplateColumns: `repeat(2, ${CARD_SIZE}px)`,
        gap: 15,
        justifyContent: 'center',
      }}>
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            style={{
              borderRadius: 18,
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
                height: '76%',
                objectFit: 'cover',
                background: '#23232a',
                display: 'block'
              }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <div style={{
              width: '100%',
              padding: '6px 10px 6px 11px',
              background: '#19191d',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexGrow: 1,
              borderBottomLeftRadius: 18,
              borderBottomRightRadius: 18
            }}>
              <span style={{
                fontWeight: 700,
                color: '#fff',
                fontSize: 13.5,
                marginBottom: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.13
              }}>
                {item.title}
              </span>
              <span style={{
                fontWeight: 400,
                color: '#b5b5b5',
                fontSize: 10.7,
                lineHeight: 1.14,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
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
