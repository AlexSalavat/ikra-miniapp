import React from 'react';

const showcaseSections = [
  {
    key: 'suppliers',
    title: 'Поставщики',
    description: 'Визуальный каталог проверенных игроков',
    image: '/images/suppliers.webp',
    link: '/catalog/suppliers',
  },
  {
    key: 'logistics',
    title: 'Логистика ДВ',
    description: 'Авто, Ж/Д, Авиа',
    image: '/images/logistics.webp',
    link: '/logistics',
  },
  {
    key: 'production',
    title: 'Производство',
    description: 'Фасовка, маркировка',
    image: '/images/production.webp',
    link: '/production',
  },
  {
    key: 'neirobiz',
    title: 'Neirobiz',
    description: 'AI сервисы и генерация упаковки',
    image: '/images/neirobiz.webp',
    link: '/neirobiz',
  },
];

const Showcase = () => (
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
      Витрина
    </h1>
    <div style={{
      width: '100%',
      maxWidth: 420,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      padding: '0 10px',
    }}>
      {showcaseSections.map((item) => (
        <a
          key={item.key}
          href={item.link}
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
              fontSize: 14.3,
              marginBottom: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.title}
            </div>
            <div style={{
              fontWeight: 400,
              color: '#c9c9c9',
              fontSize: 11.3,
              marginTop: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {item.description}
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default Showcase;
