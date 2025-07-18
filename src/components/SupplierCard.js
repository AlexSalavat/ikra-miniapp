import React from 'react';
import { useNavigate } from 'react-router-dom';

const SupplierCard = ({
  id,
  name,
  logo,
  isPlaceholder,
  borderColor = '#363646',
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (!isPlaceholder) navigate(`/supplier/${id}`);
      }}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        width: '100%',
        height: '100px',
        background: isPlaceholder ? '#262632' : '#18181A',
        boxShadow: '0 2px 7px 0 rgba(0,0,0,0.15)',
        cursor: isPlaceholder ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        minWidth: 0,
        border: `2.1px solid ${borderColor}`,
        transition: 'border 0.18s',
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
            zIndex: 1
          }}
        >
          <span
            style={{
              color: '#bdbdbd',
              fontWeight: 700,
              fontSize: '0.73rem',
              letterSpacing: '0.5px',
              textAlign: 'center',
              opacity: 0.88,
              whiteSpace: 'pre-line',
            }}
          >
            Твой{'\n'}логотип
          </span>
        </div>
      ) : (
        <img
          src={logo || '/images/no-logo.webp'}
          alt={name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            background: '#23232a'
          }}
          onError={e => { e.target.src = '/images/no-logo.webp'; }}
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
            fontSize: '0.7rem',
            textShadow: isPlaceholder ? 'none' : '0 1px 2.5px rgba(0,0,0,0.15)',
            letterSpacing: '-0.1px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          title={name}
        >
          {isPlaceholder ? 'Место свободно' : name}
        </span>
      </div>
    </div>
  );
};

export default SupplierCard;
