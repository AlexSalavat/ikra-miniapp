import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];
const CARD_SIZE = 182; // размер карточки

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

      {/* ФИЛЬТР */}
      <div style={{
        display: "flex",
        gap: 9,
        justifyContent: "center",
        marginBottom: 22,
        overflowX: "auto",      // если вдруг регионы не влезут, появится горизонтальный скролл
        flexWrap: "nowrap"
      }}>
        {REGIONS.map(region => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            style={{
              background: filter === region ? '#23232a' : 'none',
              color: filter === region ? '#20d978' : '#bababa',
              border: `2px solid ${filter === region ? '#20d978' : '#32323a'}`,
              borderRadius: 11,
              fontWeight: 700,
              fontSize: 15,
              minWidth: 82,
              height: 38,
              lineHeight: "36px",
              padding: "0 14px",
              textAlign: "center",
              cursor: 'pointer',
              transition: 'border .12s, color .16s, background .18s',
              boxSizing: "border-box",
              outline: "none",
              userSelect: "none"
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Сетка карточек */}
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
              cursor: card.isPlaceholder ? "default" : "pointer"
            }}
            onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
          >
            {/* Квадратное фото/лого */}
            <div style={{
              width: CARD_SIZE,
              height: CARD_SIZE,
              background: "#18181f",
              borderRadius: 22,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 18px #16181d55"
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
            {/* Название ПОД карточкой */}
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
