// src/components/SupplierCard.js

import React from 'react';

const SupplierCard = ({ name, logo }) => (
  <div
    style={{
      position: 'relative',
      borderRadius: '14px',
      overflow: 'hidden',
      width: '100%',
      height: '80px',               // ещё ниже и компактнее
      background: '#18181A',
      boxShadow: '0 2px 7px 0 rgba(0,0,0,0.15)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'flex-end',
      maxWidth: '96px',             // уже!
      margin: '0 auto'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'scale(1.035)';
      e.currentTarget.style.boxShadow = '0 5px 15px 0 rgba(0,0,0,0.21)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 2px 7px 0 rgba(0,0,0,0.15)';
    }}
  >
    <img
      src={logo}
      alt={name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',     // всегда полностью влезает
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
        background: '#23232a'
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(20, 20, 20, 0.62)',
        padding: '3px 0 2px 0', // очень узко!
        textAlign: 'center',
        zIndex: 2
      }}
    >
      <span
        style={{
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.75rem',   // меньше!
          textShadow: '0 1px 2.5px rgba(0,0,0,0.15)',
          letterSpacing: '-0.1px'
        }}
      >
        {name}
      </span>
    </div>
  </div>
);

export default SupplierCard;
