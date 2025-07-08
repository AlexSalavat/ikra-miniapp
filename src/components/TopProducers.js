import React, { useState } from 'react';
import producers from '../data/producers';

// Теперь 4 региона:
const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];
const CARDS_PER_PAGE = 10;
const CARDS_PER_ROW = 2;
const CARD_GAP = 15;

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
      {/* Новый стиль фильтра — 4 региона */}
      <div style={{
        display: 'flex',
        gap: 5,
        marginBottom: 13,
        width: '100%',
        justifyContent: 'center',
        flexWrap: 'nowrap'
      }}>
        {REGIONS.map(region => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            style={{
              background: filter === region ? "#23232a" : "none",
              color: filter === region ? "#20d978" : "#bababa",
              border: `1.3px solid ${filter === region ? "#20d978" : "#23232a"}`,
              borderRadius: 7,
              padding: '4px 10px',
              fontWeight: 700,
              fontSize: 12.2,
              minWidth: 70,
              cursor: "pointer",
              transition: "border .12s, color .16s, background .18s"
            }}
          >{region}</button>
        ))}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${CARDS_PER_ROW}, 1fr)`,
        gap: CARD_GAP,
        justifyContent: 'center',
        marginBottom: 12
      }}>
        {current.map(card => (
          <div
            key={card.id}
            style={{
              background: '#16181e',
              borderRadius: 19,
              overflow: 'hidden',
              minHeight: 135,
              display: 'flex',
              alignItems: 'flex-end',
              position: 'relative',
              boxShadow: '0 3px 16px 0 #0005',
              cursor: card.isPlaceholder ? 'default' : 'pointer',
              aspectRatio: '1.28/1',
              justifyContent: 'center'
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
