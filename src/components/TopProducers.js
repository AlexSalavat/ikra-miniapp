import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];

export default function TopProducers() {
  const [filter, setFilter] = useState(REGIONS[0]);
  const navigate = useNavigate();

  const filtered = useMemo(
    () => producers.filter(p => p.region === filter),
    [filter]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  // Обрезка названия до 2 строк с троеточием
  function trimName(name, maxLen = 44) {
    if (name.length > maxLen) return name.slice(0, maxLen - 1) + '…';
    return name;
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "16px 0 50px 0" }}>
      {/* Назад */}
      <button
        onClick={() => window.history.back()}
        style={{
          marginLeft: 8,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 15,
          background: "none",
          border: "none",
          color: "#357cff",
          fontWeight: 500,
          cursor: "pointer"
        }}>
        <svg width="18" height="18" fill="none" style={{ verticalAlign: '-3px', marginRight: 3 }}>
          <path d="M12 4l-6 5 6 5" stroke="#357cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      {/* Фильтр по регионам */}
      <div style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        marginBottom: 18,
        flexWrap: "wrap"
      }}>
        {REGIONS.map(region => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            style={{
              background: filter === region ? '#23232a' : 'none',
              color: filter === region ? '#20d978' : '#bababa',
              border: `1.3px solid ${filter === region ? '#20d978' : '#23232a'}`,
              borderRadius: 7,
              padding: '4px 13px',
              fontWeight: 700,
              fontSize: 13,
              minWidth: 76,
              cursor: 'pointer',
              transition: 'border .12s, color .16s, background .18s'
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Сетка карточек 2xN */}
      <div style={{
        width: "100%",
        maxWidth: 430,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 17
      }}>
        {filtered.map(card => (
          <div
            key={card.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: card.isPlaceholder ? "default" : "pointer"
            }}
            onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
          >
            {/* Квадратное фото */}
            <div style={{
              width: 110,
              height: 110,
              background: "#18181f",
              borderRadius: 18,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 13px #181a2255"
            }}>
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: "86px",
                    height: "86px",
                    objectFit: "contain",
                    borderRadius: 13,
                    background: "#fff",
                    display: "block"
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <span style={{
                  color: "#bdbdbd",
                  fontWeight: 600,
                  fontSize: 13.5,
                  textAlign: "center"
                }}>
                  {card.isPlaceholder ? 'Место свободно' : 'Лого в разработке'}
                </span>
              )}
            </div>
            {/* Название — всегда ПОД карточкой, не в ней */}
            <div
              style={{
                marginTop: 9,
                color: "#fff",
                fontWeight: 700,
                fontSize: 12.3,
                textAlign: "center",
                maxHeight: 34,
                minHeight: 25,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: "1.13"
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
