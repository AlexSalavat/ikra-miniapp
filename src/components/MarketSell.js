import React from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { key: 'ikra', title: 'Икра', image: '/images/cav.webp', desc: 'категория объявлений' },
  { key: 'ryba', title: 'Рыба', image: '/images/fish.webp', desc: 'категория объявлений' },
  { key: 'krab', title: 'Краб', image: '/images/krab.webp', desc: 'категория объявлений' },
  { key: 'mor', title: 'Морепродукты', image: '/images/mor.webp', desc: 'категория объявлений' },
];

export default function MarketSell() {
  const navigate = useNavigate();

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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Продажа</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-5">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className="glass-card p-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => navigate(`/market/sell/${cat.key}`)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/no-image.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
            </div>
            <div className="mt-2 text-center">
              <div className="text-white font-semibold text-sm truncate">{cat.title}</div>
              <div className="text-white/70 text-xs mt-0.5">{cat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
