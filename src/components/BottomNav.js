import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Витрина', path: '/catalog', emoji: '🧊' },
  { label: 'Новости', path: '/news', emoji: '📡' },
  { label: 'Маркет', path: '/market', emoji: '🎯' },
  { label: 'Профиль', path: '/profile', emoji: '👤' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{
  position: 'fixed',
  bottom: '10px', // приподняли на 10px
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  height: '60px',
  background: '#fff',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: '16px',
  border: '1px solid #ddd',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  zIndex: 999
}}>

      {navItems.map(item => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: location.pathname.startsWith(item.path) ? '#000' : '#888',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '1.2rem' }}>{item.emoji}</div>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
