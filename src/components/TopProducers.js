import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import producers from '../data/producers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];
const CARDS_PER_PAGE = 10;
const CARDS_PER_ROW = 2;
const CARD_GAP = 15;

export default function TopProducers() {
  const [filter, setFilter] = useState(REGIONS[0]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const filtered = useMemo(
    () => producers.filter(p => p.region === filter),
    [filter]
  );

  const filteredPages = useMemo(() => {
    return Array.from({ length: Math.ceil(filtered.length / CARDS_PER_PAGE) }, (_, i) =>
      filtered.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE)
    );
  }, [filtered]);

  const currentCards = filteredPages[page] || [];

  useEffect(() => { setPage(0); }, [filter]);

  const buttonStyle = (active) => ({
    background: active ? '#23232a' : 'none',
    color: active ? '#20d978' : '#bababa',
    border: `1.3px solid ${active ? '#20d978' : '#23232a'}`,
    borderRadius: 7,
    padding: '4px 10px',
    fontWeight: 600,
    fontSize: 12,
    minWidth: 68,
    cursor: 'pointer',
    letterSpacing: 0.01,
    transition: 'border .12s, color .16s, background .18s'
  });

  return (
    <div className="bg-black min-h-screen p-3">
      {/* Кнопка Назад */}
      <button
        onClick={() => window.history.back()}
        className="mb-3 py-1.5 px-3.5 rounded-lg bg-transparent text-[#357cff] font-medium text-base cursor-pointer"
        style={{ marginLeft: 3, fontSize: 15, fontWeight: 500 }}
      >
        <svg width="18" height="18" fill="none" style={{ verticalAlign: '-3px', marginRight: 3 }}>
          <path d="M12 4l-6 5 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        {currentCards.map(card => (
          <div key={card.id} className="flex flex-col items-center">
            <div
              className="relative bg-[#18191e] rounded-[19px] overflow-hidden flex items-center justify-center cursor-pointer shadow-lg"
              onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                minWidth: 0,
                minHeight: 130,
                maxHeight: 160,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: "0 2px 16px #0003"
              }}
            >
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    maxWidth: '88%',
                    maxHeight: '88%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: "auto"
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full"
                     style={{
                       minHeight: 92,
                       color: "#bdbdbd",
                       fontWeight: 500,
                       fontSize: 13.7,
                       textAlign: 'center',
                       letterSpacing: 0.2
                     }}>
                  {card.isPlaceholder ? 'Место\nсвободно' : 'Лого\nв разработке'}
                </div>
              )}
            </div>
            {/* Название под карточкой */}
            <div className="w-full text-center mt-2" style={{
              color: "#ececec",
              fontWeight: 500,
              fontSize: 12.8,
              lineHeight: 1.14,
              letterSpacing: 0.01,
              textShadow: "0 1px 8px #141",
              fontFamily: "'SF Pro Text', 'Inter', 'Roboto', 'Arial', sans-serif",
              opacity: 0.92
            }}>
              {card.name}
            </div>
          </div>
        ))}
      </div>
      {/* Пагинация */}
      {filteredPages.length > 1 && (
        <div className="flex justify-center gap-3 items-center mt-1.5">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className={`text-2xl bg-transparent border-none ${page === 0 ? 'text-[#666]' : 'text-white cursor-pointer'}`}
          >←</button>
          <span className="text-[#ccc] text-sm">
            {page + 1} / {filteredPages.length}
          </span>
          <button
            disabled={page === filteredPages.length - 1}
            onClick={() => setPage((p) => p + 1)}
            className={`text-2xl bg-transparent border-none ${page === filteredPages.length - 1 ? 'text-[#666]' : 'text-white cursor-pointer'}`}
          >→</button>
        </div>
      )}
    </div>
  );
}
