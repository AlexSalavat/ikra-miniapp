import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];
const CARDS_PER_ROW = 2;
const CARD_GAP = 15;

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

  const buttonStyle = (active) => ({
    background: active ? '#23232a' : 'none',
    color: active ? '#20d978' : '#bababa',
    border: `1.3px solid ${active ? '#20d978' : '#23232a'}`,
    borderRadius: 7,
    padding: '4px 10px',
    fontWeight: 700,
    fontSize: 12.2,
    minWidth: 70,
    cursor: 'pointer',
    transition: 'border .12s, color .16s, background .18s'
  });

  // Функция обрезки текста до 3 строк
  function trimName(name, maxLen = 55) {
    if (name.length > maxLen) return name.slice(0, maxLen - 1) + '…';
    return name;
  }

  return (
    <div className="bg-black min-h-screen p-3">
      {/* Кнопка Назад */}
      <button
        onClick={() => window.history.back()}
        className="mb-3 py-1.5 px-3.5 rounded-lg bg-transparent text-[#357cff] font-medium text-base cursor-pointer"
        style={{ marginLeft: 3, display: "flex", alignItems: "center", gap: 5, fontSize: 15 }}
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
            style={buttonStyle(filter === region)}
          >
            {region}
          </button>
        ))}
      </div>
      {/* Сетка карточек + названия под карточками */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${CARDS_PER_ROW}, 1fr)`,
          gap: CARD_GAP,
          marginBottom: 12
        }}
      >
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
            {/* Лого/Фото */}
            <div style={{
              width: "100%",
              aspectRatio: "1/1",
              background: "#191a1f",
              borderRadius: 19,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 14px #16181d66"
            }}>
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: "86%",
                    height: "86%",
                    objectFit: "contain",
                    background: "#23232a",
                    borderRadius: 16,
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <span style={{
                  color: "#bdbdbd",
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: "1.15"
                }}>
                  {card.isPlaceholder ? 'Место свободно' : 'Лого в разработке'}
                </span>
              )}
            </div>
            {/* Название ПОД карточкой */}
            <div
              style={{
                marginTop: 8,
                marginBottom: 2,
                color: "#fff",
                fontWeight: 700,
                fontSize: 13.1,
                textAlign: "center",
                maxHeight: 48,
                minHeight: 28,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
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
