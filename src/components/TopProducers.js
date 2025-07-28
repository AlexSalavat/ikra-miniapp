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
      {/* Сетка карточек */}
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
            className="relative bg-[#16181e] rounded-[19px] overflow-hidden flex flex-col items-center cursor-pointer shadow-lg"
            onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
            style={{
              minHeight: 160,
              maxHeight: 180,
              padding: "0 0 8px 0"
            }}
          >
            {/* Лого/Фото */}
            <div style={{
              width: "100%",
              height: 95,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: 19,
              borderTopRightRadius: 19,
              background: "#24242b",
              overflow: "hidden"
            }}>
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: "84%",
                    height: "80%",
                    objectFit: "contain",
                    background: "#23232a",
                    borderRadius: 16
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <span className="text-[#bdbdbd] font-semibold text-[13px] opacity-90 text-center" style={{ lineHeight: "1.1" }}>
                  {card.isPlaceholder ? 'Место свободно' : 'Лого в разработке'}
                </span>
              )}
            </div>
            {/* Название */}
            <div
              style={{
                marginTop: 9,
                marginBottom: 0,
                padding: "0 6px",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13.1,
                textAlign: "center",
                maxHeight: 35,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                whiteSpace: "normal",
                lineHeight: "1.14"
              }}
            >
              {card.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
