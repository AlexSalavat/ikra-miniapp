import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];
const CARD_SIZE = 182;

export default function TopProducers() {
  const [filter, setFilter] = useState(REGIONS[0]);
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(
    () => producers.filter(p => p.region === filter),
    [filter]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveCard(null);
  }, [filter]);

  function trimName(name, maxLen = 56) {
    if (name.length > maxLen) return name.slice(0, maxLen - 1) + '…';
    return name;
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "18px 0 54px 0" }}>
      <button
        onClick={() => window.history.back()}
        style={{
          marginLeft: 8,
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 17,
          background: "none",
          border: "none",
          color: "#357cff",
          fontWeight: 600,
          cursor: "pointer"
        }}>
        <svg width="20" height="20" fill="none" style={{ verticalAlign: '-3px', marginRight: 3 }}>
          <path d="M12 4l-6 5 6 5" stroke="#357cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 20,
          paddingLeft: 2,
          paddingRight: 2,
          overflowX: 'auto',
          flexWrap: 'nowrap',
        }}
      >
        {REGIONS.map(region => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 29,
              minWidth: 62,
              background: filter === region ? '#23232a' : 'none',
              color: filter === region ? '#20d978' : '#bababa',
              border: `1.3px solid ${filter === region ? '#20d978' : '#23232a'}`,
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 12.2,
              padding: '0 9px',
              textAlign: 'center',
              boxSizing: 'border-box',
              outline: 'none',
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'border .13s, color .14s, background .17s'
            }}
          >
            {region}
          </button>
        ))}
      </div>

      <div style={{
        width: "100%",
        maxWidth: 410,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 13
      }}>
        {filtered.map(card => (
          <div
            key={card.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: card.isPlaceholder ? "default" : "pointer",
              transition: "box-shadow .16s, transform .13s",
              boxShadow:
                activeCard === card.id
                  ? "0 0 0 4px #21e0ad77, 0 2px 18px #16181d55"
                  : "0 2px 18px #16181d55"
            }}
            onMouseDown={() => setActiveCard(card.id)}
            onMouseUp={() => setActiveCard(null)}
            onMouseLeave={() => setActiveCard(null)}
            onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
          >
            <div style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              background: "#18181f",
              borderRadius: 22,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                activeCard === card.id
                  ? "0 0 24px 6px #21e0ad55"
                  : "0 2px 18px #16181d55",
              transition: "box-shadow .18s"
            }}>
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: CARD_SIZE - 20,
                    height: CARD_SIZE - 20,
                    objectFit: "contain",
                    borderRadius: 17,
                    background: "#fff",
                    display: "block"
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <span style={{
                  color: "#bdbdbd",
                  fontWeight: 600,
                  fontSize: 15,
                  textAlign: "center"
                }}>
                  {card.isPlaceholder ? 'Место свободно' : 'Лого в разработке'}
                </span>
              )}
            </div>
            <div
              style={{
                marginTop: 9,
                color: "#fff",
                fontWeight: 700,
                fontSize: 13.7,
                textAlign: "center",
                maxHeight: 41,
                minHeight: 26,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: "1.18"
              }}
              title={card.name}
            >
              {trimName(card.name)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
