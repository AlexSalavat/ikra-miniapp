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
      padding: '20px',
      background: '#111',
      minHeight: '100vh'
    }}>
      <h1 style={{
        marginBottom: '20px',
        color: '#fff',
        fontWeight: 700,
        fontSize: '2.0rem'
      }}>
        Витрина
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => navigate(`/catalog/${cat.id}`)}
            style={{
              backgroundImage: `url(${cat.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '18px',
              height: '140px',
              color: '#fff',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 0,
              boxShadow: '0 2px 10px rgba(0,0,0,0.18)'
            }}
          >
            <div style={{
              background: 'rgba(0, 0, 0, 0.47)',
              borderRadius: '0 0 18px 18px',
              padding: '12px',
              width: '100%'
            }}>
              <div style={{
                fontWeight: 700,
                fontSize: '1.01rem', // чуть меньше
                marginBottom: '3px',
                textShadow: '0 1px 8px rgba(0,0,0,0.12)'
              }}>
                {cat.title}
              </div>
              <div style={{
                fontSize: '0.89rem', // чуть меньше
                fontWeight: 400,
                textShadow: '0 1px 8px rgba(0,0,0,0.10)'
              }}>
                {cat.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
