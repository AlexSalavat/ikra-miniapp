import React, { useState } from 'react';
import production from '../data/production';

const CARDS_PER_PAGE = 10;
const CARDS_PER_ROW = 2;

const ProductionShowcase = () => {
  const [page, setPage] = useState(0);

  const pages = [];
  for (let i = 0; i < production.length; i += CARDS_PER_PAGE) {
    pages.push(production.slice(i, i + CARDS_PER_PAGE));
  }
  const current = pages[page] || [];

  return (
    <div style={{
      background: '#000', minHeight: '100vh', padding: 12
    }}>
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: 12,
          padding: '6px 13px',
          borderRadius: 10,
          background: '#23232a',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 13,
          cursor: 'pointer'
        }}
      >← Назад</button>
      <div style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 21,
        margin: '8px 0 16px 8px'
      }}>
        Производство
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, 1fr)`,
        gap: 15,
        marginBottom: 18
      }}>
        {current.map(card => (
          <div key={card.id}
            style={{
              background: '#16181e',
              borderRadius: 19,
              overflow: 'hidden',
              minHeight: 135,
              display: 'flex',
              alignItems: 'flex-end',
              position: 'relative',
              boxShadow: '0 3px 16px 0 #0005',
              cursor: 'pointer',
              aspectRatio: '1.28/1',
              justifyContent: 'center'
            }}>
            {/* Лого-заглушка */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: '#22232a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}>
              <span style={{
                color: '#bdbdbd',
                fontWeight: 700,
                fontSize: '1rem',
                textAlign: 'center',
                opacity: 0.92,
                lineHeight: 1.25,
                padding: '0 10px',
                letterSpacing: '0.2px'
              }}>
                Лого<br />в разработке
              </span>
            </div>
            {/* Градиент с названием */}
            <div style={{
              width: '100%',
              position: 'absolute',
              left: 0,
              bottom: 0,
              background: 'linear-gradient(0deg, rgba(22,22,28,0.97) 78%, rgba(22,22,28,0.08) 100%)',
              padding: '12px 7px 8px 9px',
              zIndex: 2,
              display: 'flex',
              alignItems: 'flex-end',
              minHeight: 34,
            }}>
              <span style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: '-0.2px',
                textShadow: '0 2px 6px #0008',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {card.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      {pages.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          alignItems: 'center',
          marginTop: 6
        }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            style={{
              background: 'none',
              color: page === 0 ? '#666' : '#fff',
              border: 'none',
              fontSize: 23,
              cursor: page === 0 ? 'default' : 'pointer'
            }}
          >&#8592;</button>
          <span style={{ color: '#ccc', fontSize: 14 }}>
            {page + 1} / {pages.length}
          </span>
          <button
            disabled={page === pages.length - 1}
            onClick={() => setPage(p => p + 1)}
            style={{
              background: 'none',
              color: page === pages.length - 1 ? '#666' : '#fff',
              border: 'none',
              fontSize: 23,
              cursor: page === pages.length - 1 ? 'default' : 'pointer'
            }}
          >&#8594;</button>
        </div>
      )}
    </div>
  );
};

export default ProductionShowcase;
