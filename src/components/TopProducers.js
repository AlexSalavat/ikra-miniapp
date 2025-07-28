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
      <button
        onClick={() => window.history.back()}
        className="mb-3 py-1.5 px-3.5 rounded-lg bg-transparent text-[#357cff] font-medium text-base cursor-pointer"
        style={{ marginLeft: 3 }}
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
          <div
            key={card.id}
            className="relative bg-[#16181e] rounded-[19px] overflow-hidden flex items-end justify-center cursor-pointer shadow-lg aspect-[1.17/1]"
            onClick={() => !card.isPlaceholder && navigate(`/producer/${card.id}`)}
            style={{
              minHeight: 148,
              maxHeight: 160
            }}
          >
            {card.logo ? (
              <img
                src={card.logo}
                alt={card.name}
                className="absolute inset-0 w-full h-full object-cover z-10"
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
                <span className="text-[#bdbdbd] font-semibold text-[15px] text-center opacity-90 whitespace-pre-line leading-snug">
                  {card.isPlaceholder ? 'Место\nсвободно' : 'Лого\nв разработке'}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#121217f5] via-transparent flex items-center justify-center px-2 pb-1">
              <span className="text-white font-bold text-sm truncate w-full text-center drop-shadow-md">
                {card.name}
              </span>
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
