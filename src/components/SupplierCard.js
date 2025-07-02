import React from 'react';

const SupplierCard = ({ name, logo }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: '22px',
      overflow: 'hidden',
      width: '100%',
      aspectRatio: '1/1', // квадрат, если нужно прямоугольник — например '1.6/1'
      background: '#18181A',
      boxShadow: '0 3px 12px 0 rgba(0,0,0,0.20)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-end',
      minHeight: '120px',
      maxWidth: '280px',
      margin: '0 auto'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'scale(1.035)';
      e.currentTarget.style.boxShadow = '0 7px 22px 0 rgba(0,0,0,0.28)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 3px 12px 0 rgba(0,0,0,0.20)';
    }}
  >
    <img
      src={logo}
      alt={name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(20, 20, 20, 0.62)',
        padding: '15px 0 11px 0',
        textAlign: 'center',
        zIndex: 2
      }}
    >
      <span
        style={{
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.09rem',
          textShadow: '0 2px 7px rgba(0,0,0,0.16)'
        }}
      >
        {name}
      </span>
    </div>
  </div>
);

export default SupplierCard;
