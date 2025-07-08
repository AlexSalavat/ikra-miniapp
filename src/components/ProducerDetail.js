import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const ProducerDetail = () => {
  const { id } = useParams();
  const producer = producers.find(p => p.id === Number(id));
  const navigate = useNavigate();

  if (!producer) return (
    <div style={{ color: '#fff', padding: 30 }}>Завод не найден</div>
  );

  return (
    <div style={{
      background: '#000',
      minHeight: '100vh',
      color: '#fff',
      padding: 24,
      fontFamily: 'inherit',
      maxWidth: 400,
      margin: '0 auto'
    }}>
      <button onClick={() => navigate(-1)}
        style={{
          marginBottom: 18,
          padding: '6px 16px',
          borderRadius: 11,
          background: '#222',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 15,
          cursor: 'pointer'
        }}>← Назад</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{
          width: 80,
          height: 80,
          background: '#23232a',
          borderRadius: 17,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {producer.logo ?
            <img src={producer.logo} alt={producer.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            : producer.isPlaceholder ? (
              <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 15 }}>Место<br />свободно</span>
            ) : (
              <span style={{ color: '#bdbdbd', fontWeight: 700, fontSize: 13 }}>Лого<br />в разработке</span>
            )
          }
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, lineHeight: 1.1, marginBottom: 3 }}>{producer.name}</div>
          <div style={{ color: '#37e08a', fontSize: 13, fontWeight: 600 }}>{producer.region}</div>
        </div>
      </div>
      {!producer.isPlaceholder && (
        <>
          <div style={{ color: '#ccc', fontSize: 14, marginBottom: 13 }}>{producer.description}</div>
          {producer.site && (
            <a href={`https://${producer.site}`} target="_blank" rel="noopener noreferrer"
              style={{
                color: '#37e08a',
                fontSize: 14,
                textDecoration: 'underline',
                fontWeight: 600
              }}>{producer.site}</a>
          )}
        </>
      )}
    </div>
  );
};

export default ProducerDetail;
