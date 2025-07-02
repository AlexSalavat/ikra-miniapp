import React from 'react';
import { Link } from 'react-router-dom';

const Market = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Маркет / Объявления</h1>
      <p>Выберите, что хотите сделать:</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {/* Карточка: Сбросить улов */}
        <Link to="/market/sell" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '2px solid #007bff',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: '#e8f1ff',
            textAlign: 'center',
            cursor: 'pointer',
            color: 'inherit'
          }}>
            <h2>🐟 Сбросить улов</h2>
            <p>Хочу продать товар — опубликовать предложение</p>
          </div>
        </Link>

        {/* Карточка: Запросить улов */}
        <Link to="/market/buy" style={{ textDecoration: 'none' }}>
          <div style={{
            border: '2px solid #28a745',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: '#e9f7ef',
            textAlign: 'center',
            cursor: 'pointer',
            color: 'inherit'
          }}>
            <h2>🧭 Запросить улов</h2>
            <p>Хочу купить товар — разместить запрос</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Market;
