import React, { useState } from 'react';
import producers from '../data/producers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск'];
const CARDS_PER_PAGE = 10;
const CARDS_PER_ROW = 2;
const CARD_SIZE = 154;
const CARD_GAP = 13;

const TopProducers = () => {
  const [filter, setFilter] = useState(REGIONS[0]);
  const [page, setPage] = useState(0);

  const filtered = producers.filter(p => p.region === filter);
  const pages = [];
  for (let i = 0; i < filtered.length; i += CARDS_PER_PAGE) {
    pages.push(filtered.slice(i, i + CARDS_PER_PAGE));
  }
  const current = pages[page] || [];

  React.useEffect(() => { setPage(0); }, [filter]);

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
      {/* Фильтр */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
        {REGIONS.map(region => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            style={{
              background: 'none',
              color: filter === region ? '#37e08a' : '#fff',
              border: `2px solid ${filter === region ? '#37e08a' : '#333'}`,
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 14,
              padding: '5px 17px',
              cursor: 'pointer',
              transition: 'border .15s'
            }}
          >{region}</button>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, ${CARD_SIZE}px)`,
        gap: CARD_GAP,
        justifyContent: 'center',
        marginBottom: 12
      }}>
        {current.map(card => (
          <div
            key={card.id}
            style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              borderRadius: 19,
              overflow: 'hidden',
              background: '#16181e',
              boxShadow: '0 2px 12px 0 #0007',
              cursor: card.isPlaceholder ? 'default' : 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              aspectRatio: '1 / 1'
            }}
          >
            {card.logo ? (
              <img
                src={card.logo}
                alt={card.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  zIndex: 1
                }}
                onError={e => { e.target.src = '/images/no-logo.webp'; }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: card.isPlaceholder
                  ? 'linear-gradient(135deg,#262632 60%,#23232a 100%)'
                  : 'linear-gradient(135deg,#363646 60%,#23232a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 1
              }}>
                <span style={{
                  color: '#bdbdbd',
                  fontWeight: 600,
                  fontSize: 15,
                  textAlign: 'center',
                  opacity: 0.87,
                  lineHeight: 1.15,
                  whiteSpace: 'pre-line'
                }}>
                  {card.isPlaceholder ? 'Место\nсвободно' : 'Лого\nв разработке'}
                </span>
              </div>
            )}
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              background: 'linear-gradient(0deg,rgba(18,18,23,0.96) 92%,rgba(25,25,29,0.08) 100%)',
              minHeight: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 9px 5px 9px'
            }}>
              <span style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 13.5,
                letterSpacing: '-0.18px',
                width: '100%',
                textShadow: '0 1px 4px #000a',
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

export default TopProducers;
