import React from 'react';

const SupplierCard = ({ name, logo, isPlaceholder, isFirst }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      width: '100%',
      height: '100px',
      background: isPlaceholder ? '#262632' : '#18181A',
      boxShadow: '0 2px 7px 0 rgba(0,0,0,0.15)',
      cursor: isPlaceholder ? 'default' : 'pointer',
      display: 'flex',
      alignItems: 'flex-end',
      margin: '0',
      opacity: isPlaceholder ? 0.92 : 1,
      minWidth: 0,
      padding: 0,            // никакого паддинга
      border: 'none'         // и бордеров нет
    }}
  >
    {isPlaceholder ? (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#363646',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          padding: 0,           // никаких внутренних отступов
          border: 'none'
        }}
      >
        <span
          style={{
            color: '#bdbdbd',
            fontWeight: 700,
            fontSize: '0.73rem',
            letterSpacing: '0.5px',
            textAlign: 'center',
            opacity: 0.88
          }}
        >
          Твой<br />логотип
        </span>
      </div>
    ) : (
      <img
        src={logo}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: isFirst ? 'cover' : 'contain', // первая картинка — cover
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          padding: 0,       // никаких отступов
          margin: 0,        // никаких внешних отступов
          background: '#23232a',
          border: 'none'
        }}
      />
    )}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        background: isPlaceholder ? 'rgba(44,44,48,0.85)' : 'rgba(20, 20, 20, 0.62)',
        padding: '5px 0 4px 0',
        textAlign: 'center',
        zIndex: 2
      }}
    >
      <span
        style={{
          color: isPlaceholder ? '#e4e4e4' : '#fff',
          fontWeight: 600,
          fontSize: '0.82rem',
          textShadow: isPlaceholder ? 'none' : '0 1px 2.5px rgba(0,0,0,0.15)',
          letterSpacing: '-0.1px'
        }}
      >
        {name}
      </span>
    </div>
  </div>
);

export default SupplierCard;
