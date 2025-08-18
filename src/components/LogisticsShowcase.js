// src/components/LogisticsShowcase.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const REGIONS = ['Все', 'Камчатка', 'Сахалин', 'Хабаровск', 'Магадан', 'Приморье'];

export default function LogisticsShowcase() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState(REGIONS[0]);
  const COUNT = 12; // сколько карточек-плейсхолдеров показывать

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header + фильтр (стикнуты наверху) */}
      <div className="sticky top-0 z-20 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
            aria-label="Назад"
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Логистика ДВ</h2>
          <span className="w-16" />
        </div>

        {/* Фильтр регионов */}
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
                  title={r}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Плейсхолдеры сетки */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {Array.from({ length: COUNT }).map((_, i) => (
          <div key={i} className="glass-card p-2">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/10 animate-pulse" />
            <div className="mt-2 h-3 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
