import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 'suppliers',
    title: 'Поставщики',
    description: 'Визуальный каталог проверенных игроков',
    image: '/images/suppliers.jpg',
  },
  {
    id: 'logistics',
    title: 'Логистика ДВ',
    description: 'Авто / ЖД / Авиа',
    image: '/images/logistics.jpg',
  },
  {
    id: 'production',
    title: 'Производство',
    description: 'Фасовка, маркировка, хранение',
    image: '/images/production.jpg',
  },
  {
    id: 'neirobiz',
    title: 'NeiroBiz',
    description: 'AI-сервисы и генерация упаковки',
    image: '/images/neirobiz.jpg',
  },
];

const Showcase = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: '24px 14px 14px 14px',
    }}>
      <h1 style={{
        marginBottom: '24px',
        color: '#fff',
        fontWeight: 400,
        fontSize: '1.6rem',
        letterSpacing: '-0.5px',
        textShadow: '0 2px 8px rgba(0,0,0,0.22)',
      }}>
        Витрина
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '18px'
      }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => navigate(`/catalog/${cat.id}`)}
            style={{
              backgroundImage: `url(${cat.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '16px',
              height: '130px',
              color: '#fff',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '0',
              boxShadow: '0 4px 18px 0 rgba(0,0,0,0.60)',
              transition: 'transform 0.14s, box-shadow 0.18s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.035)';
              e.currentTarget.style.boxShadow = '0 8px 26px 0 rgba(0,0,0,0.72)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 18px 0 rgba(0,0,0,0.60)';
            }}
          >
            <div style={{
              background: 'rgba(12, 12, 12, 0.28)',
              borderRadius: '8px',
              padding: '4px 6px 3px 7px',
              margin: '8px',
              width: 'calc(100% - 16px)',
              backdropFilter: 'blur(1px)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.09)',
              zIndex: 2
            }}>
              <div style={{
                fontWeight: 400,
                fontSize: '0.75rem', // название меньше!
                textShadow: '0 1px 3px rgba(0,0,0,0.16)',
                letterSpacing: '-0.5px',
                lineHeight: '1.18',
              }}>{cat.title}</div>
              <div style={{
                fontSize: '0.59rem', // описание минимал!
                color: '#f2f2f2',
                marginTop: '1px',
                textShadow: '0 1px 2px rgba(0,0,0,0.15)'
              }}>{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
