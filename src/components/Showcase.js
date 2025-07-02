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
    description: 'Авто / ЖД / Авиа по Дальнему Востоку',
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
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Витрина</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px'
      }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => navigate(`/catalog/${cat.id}`)}
            style={{
              backgroundImage: `url(${cat.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '12px',
              height: '120px',
              color: '#fff',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '8px',
              padding: '6px',
              width: '100%'
            }}>
              <div style={{ fontWeight: 'bold' }}>{cat.title}</div>
              <div style={{ fontSize: '0.8rem' }}>{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
