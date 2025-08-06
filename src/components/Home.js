import React from 'react';

const Home = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundImage: 'url(/images/port-bg.webp)',
      backgroundSize: 'contain',           // Меняем cover на contain!
      backgroundRepeat: 'no-repeat',       // Не повторять картинку
      backgroundPosition: 'center',        // Центрировать
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1
      }} />
      <div style={{ zIndex: 2, padding: '0 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>PORT MARKET</h1>
        <p style={{ fontSize: '1rem', lineHeight: '1.4' }}>
          Цифровой морской рынок: от вылова до продажи,<br />
          от Камчатки до твоего склада
        </p>
      </div>
    </div>
  );
};

export default Home;

