import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducers } from '../lib/useProducers';

const REGIONS = ['Камчатка', 'Сахалин', 'Хабаровск', 'Магадан'];

const getInitials = (name = '') =>
  (name || '')
    .replace(/["]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '??';

const stringHue = (s = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

export default function TopProducers() {
  const navigate = useNavigate();
  const { producers, loading, error } = useProducers();
  console.log('TopProducers: count', producers?.length, producers?.map(p=>p.id).slice(0,10));

  const [filter, setFilter] = useState(REGIONS[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  const filtered = useMemo(() => (producers || []), [producers]);

  if (error) {
    return (
      <div className="bg-black min-h-screen text-red-400 p-4">
        Ошибка загрузки производителей: {String(error.message || error)}
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
          >
            <svg width="20" height="20" fill="none">
              <path
                d="M13 5l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Производители</h2>
          <span className="w-16" />
        </div>

        {/* Фильтры регионов */}
        <div className="max-w-md mx-auto px-3 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {REGIONS.map((r) => {
              const active = r === filter;
              return (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className={[
                    'px-3 py-1.5 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition',
                    active
                      ? 'text-[#23df81] border border-[#22b978] bg-[#0a1918]'
                      : 'text-[#d3d3d7] border border-[#20222b]',
                  ].join(' ')}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {(loading ? Array.from({ length: 8 }) : filtered).map((item, i) =>
          loading ? (
            <div key={`s-${i}`} className="glass-card aspect-square animate-pulse" />
          ) : (
            <ProducerCard
              key={item.id || i}
              p={item}
              onClick={()=>{ const id = item?.id; if (!id) { console.warn("TopProducers: missing id", item); return; } const url = `/producer/${encodeURIComponent(String(id))}`; console.log("TopProducers: navigate", {id, url}); navigate(url); }}
            />
          )
        )}
        {!loading && filtered.length === 0 && (
          <div className="col-span-2 text-center text-white/70 py-6">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}

function ProducerCard({ p, onClick }) {
  const verified = p?.badges?.includes('Проверенный');
  const premium = p?.badges?.includes('Честный знак') && p?.badges?.includes('Меркурий');
  const img = p?.logo?.trim() ? p.logo : null;

  const fallbackBG = useMemo(() => {
    const h = stringHue(p?.name || p?.region || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .85),hsl(${(h + 40) % 360} 80% 30% / .85))`;
  }, [p?.name, p?.region]);

  return (
    <div
      className={`glass-card p-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        premium ? 'premium' : ''
      }`}
      onClick={onClick}
      title={p?.name}
    >
      {/* Квадратное фото/лого */}
      <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
        {img ? (
          <img
            loading="lazy"
            src={img}
            alt={p?.name}
            className="w-full h-full object-contain bg-black/40 img-fade-in"
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        ) : (
          <div
            className="w-full h-full grid place-items-center text-white/95 font-extrabold text-xl"
            style={{ background: fallbackBG }}
          >
            {getInitials(p?.name)}
          </div>
        )}

        {/* маленький премиум значок в углу */}
        {premium && (
          <div
            className="absolute top-1 right-1 w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm"
            title="Premium"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)">
              <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Текстовая часть */}
      <div className="mt-2 text-center">
        <div className="text-white font-semibold text-sm truncate" title={p?.name}>
          {p?.name}
        </div>

        {/* строка ниже  регион по центру */}
        <div className="mt-0.5 flex items-center justify-center gap-1.5 text-xs">
          {verified && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/60 backdrop-blur-sm"></span>
          )}
          <span className="text-white/75 truncate">{p?.region}</span>
        </div>
      </div>
    </div>
  );
}


