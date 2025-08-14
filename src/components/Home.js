import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: 'url(/images/port-bg.webp)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Убрали тёмный оверлей */}
      <div
        style={{
          zIndex: 2,
          padding: '0 20px',
          width: '100%',
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '16px',
            textShadow: '0 1px 3px rgba(0,0,0,0.35)', // мягче
          }}
        >
          PORT MARKET
        </h1>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: '1.4',
            textShadow: '0 1px 2px rgba(0,0,0,0.25)', // мягче
          }}
        >
          Цифровой морской рынок: от вылова до продажи,
          <br />
          от Камчатки до твоего склада
        </p>
      </div>
    </div>
  );
};

export default Home;
