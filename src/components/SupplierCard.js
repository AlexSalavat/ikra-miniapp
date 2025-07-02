import React from 'react';
import { useNavigate } from 'react-router-dom';

const SupplierCard = ({ id, logo, name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/supplier/${id}`)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain', // ⬅️ Важное изменение
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0', // Фон за изображением
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '36px',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ color: '#fff', fontWeight: '600', fontSize: '0.85rem' }}>{name}</span>
      </div>
    </div>
  );
};

export default SupplierCard;
