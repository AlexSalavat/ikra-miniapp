import React from 'react';
import { useNavigate } from 'react-router-dom';

const CARDS = [
  {
    key: 'sell',
    image: '/images/kamc.webp',
    title: 'Борт полный',
    description: 'Икра, рыба, морепродукты, краб — свежие предложения',
    link: '/market/sell',
  },
  {
    key: 'buy',
    image: '/images/kam.webp',
    title: 'Забирай!',
    description: 'Ищу улов, продукцию — готов забрать быстро',
    link: '/market/buy',
  },
];

export default function Market() {
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Объявления</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-5">
        {CARDS.map((card) => (
          <div
            key={card.key}
            className="glass-card p-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => navigate(card.link)}
            title={card.title}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/no-image.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />
            </div>
            <div className="mt-2 text-center">
              <div className="text-white font-semibold text-sm truncate">{card.title}</div>
              <div className="text-white/70 text-xs mt-0.5">{card.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-md mx-auto px-3 mt-4">
        <button
          onClick={() => navigate('/market/add')}
          className="w-full py-3 rounded-xl font-bold text-white transition shadow-lg"
          style={{ background: 'linear-gradient(92deg,#2678f3 0%,#44e2ff 100%)' }}
        >
          Разместить объявление
        </button>
      </div>
    </div>
  );
}
