import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
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

  useEffect(() => {
    setPage(0);
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
      <div style={{ marginBottom: 7 }}>
        <BackButton />
      </div>
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
          <div key={card.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              className="relative bg-[#16181e] rounded-[19px] overflow-hidden flex items-center justify-center cursor-pointer shadow-lg"
              onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                minHeight: 148,
                maxHeight: 164,
                marginBottom: 7,
                border: "1px solid #23232a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {card.logo ? (
                <img
                  src={card.logo}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 19,    // тот же радиус, что и у карточки
                    background: "#16181e",
                    display: "block"
                  }}
                  onError={e => { e.target.src = '/images/no-logo.webp'; }}
                />
              ) : (
                <div
                  className={`absolute inset-0 flex items-center justify-center z-10 ${
                    card.isPlaceholder
                      ? 'bg-gradient-to-br from-[#262632] to-[#23232a]'
                      : 'bg-gradient-to-br from-[#363646] to-[#23232a]'
                  }`}
                >
                  <span style={{
                    color: "#bdbdbd",
                    fontWeight: 600,
                    fontSize: 16,
                    textAlign: "center",
                    opacity: 0.90,
                    whiteSpace: "pre-line",
                    lineHeight: "1.2"
                  }}>
                    {card.isPlaceholder ? 'Место\nсвободно' : 'Лого\nв разработке'}
                  </span>
                </div>
              )}
            </div>
            {/* Название под карточкой */}
            <div style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 14.5,
              textAlign: "center",
              marginTop: 0,
              marginBottom: 2,
              width: "98%",
              lineHeight: "1.14",
              letterSpacing: "0.01em",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-word",
              minHeight: 36,
              maxHeight: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
