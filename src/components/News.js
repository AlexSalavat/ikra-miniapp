import React from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: 'coast',
    title: 'Новости побережья',
    desc: 'Сводка уловов и рынков',
    image: '/images/new.webp',
    to: '/news/coast',
  },
  {
    key: 'wars',
    title: 'Икорные войны',
    desc: 'Цены и движения',
    image: '/images/war.webp',
    to: '/news/ikra-wars',
  },
  {
    key: 'top',
    title: 'Топ производители',
    desc: 'Рейтинг и обзоры',
    image: '/images/pk.webp',
    to: '/news/top-producers',
  },
  {
    key: 'inside',
    title: 'Инсайдерский доступ',
    desc: 'Закрытая аналитика',
    image: '/images/insider.webp',
    to: '/news/insider',
    locked: true,
  },
];

export default function News() {
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Новости</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {items.map((it) => (
          <div
            key={it.key}
            className={`glass-card p-2 ${it.locked ? '' : 'cursor-pointer'} transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
            onClick={() => {
              if (!it.locked) navigate(it.to);
            }}
            title={it.locked ? 'Доступ по подписке' : it.title}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
              <img
                loading="lazy"
                src={it.image}
                alt={it.title}
                onError={(e) => {
                  e.currentTarget.src = '/images/no-image.webp';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />

              {/* Лок и блюр для закрытой карточки */}
              {it.locked && (
                <>
                  <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
                  <div
                    className="absolute top-1 right-1 w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center"
                    title="Закрыто"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)">
                      <path d="M12 1a5 5 0 00-5 5v3H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-2V6a5 5 0 00-5-5zm-3 8V6a3 3 0 016 0v3H9z" />
                    </svg>
                  </div>
                </>
              )}
            </div>

            <div className="mt-2 text-center">
              <div className="text-white font-semibold text-sm truncate">{it.title}</div>
              <div className="text-white/70 text-xs mt-0.5">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
