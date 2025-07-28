// src/components/TopProducers.js

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

  // Функция обрезки текста до 2 строк и троеточия
  function trimName(name, maxLen = 42) {
    if (name.length > maxLen) return name.slice(0, maxLen - 1) + '…';
    return name;
  }

  return (
    <div className="bg-black min-h-screen p-3">
      {/* Кнопка Назад */}
      <button
        onClick={() => window.history.back()}
        style={{
          marginLeft: 3,
          marginBottom: 15,
          display: "flex",
          alignItems: "center",
          gap: 5,
          fontSize: 15,
          background: "none",
          border: "none",
          color: "#357cff",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <svg width="18" height="18" fill="none" style={{ verticalAlign: '-3px', marginRight: 3 }}>
          <path d="M12 4l-6 5 6 5" stroke="#357cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      {/* Фильтр по регионам */}
      <div className="flex gap-1 justify-center mb-3 overflow-auto">
        {REGIONS.map(region => (
          <button
            key={region}
            onClick={() => setFilter(region)}
            style={{
              background: filter === region ? '#23232a' : 'none',
              color: filter === region ? '#20d978' : '#bababa',
              border: `1.3px solid ${filter === region ? '#20d978' : '#23232a'}`,
              borderRadius: 7,
              padding: '4px 10px',
              fontWeight: 700,
              fontSize: 12.2,
              minWidth: 70,
              cursor: 'pointer',
              transition: 'border .12s, color .16s, background .18s'
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Сетка карточек */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 17,
          marginBottom: 12,
        }}
      >
        {filtered.map(card => (
          <div
            key={card.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 3,
              cursor: card.isPlaceholder ? "default" : "pointer"
            }}
            onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
          >
            {/* Фото — квадратное, objectFit: contain */}
            <div style={{
              width: 112,
              height: 112,
              background: "#191a1f",
              borderRadius: 19,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px #181a2266"
            }}>
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: "94px",
                    height: "94px",
                    objectFit: "contain",
                    borderRadius: 14,
                    background: "#fff",
                    display: "block"
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <span style={{
                  color: "#bdbdbd",
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center"
                }}>
                  {card.isPlaceholder ? 'Место свободно' : 'Лого в разработке'}
                </span>
              )}
            </div>
            {/* Название под карточкой — всегда ровно! */}
            <div
              style={{
                marginTop: 9,
                color: "#fff",
                fontWeight: 700,
                fontSize: 12.2,
                textAlign: "center",
                maxHeight: 34,
                minHeight: 26,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: "1.14"
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
