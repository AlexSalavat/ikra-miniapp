import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const exampleAds = [
  {
    id: 1,
    title: "Икра кеты солёная, 2024",
    images: ["/images/ikra1.webp"],
    category: "ikra",
    company: "ООО КамчатИкра",
    region: "Камчатка",
    price: "3200 ₽/кг"
  },
  {
    id: 2,
    title: "Горбуша свежемороженая, опт",
    images: ["/images/ryba1.webp"],
    category: "ryba",
    company: "ООО РыбСнаб",
    region: "Сахалин",
    price: "от 180 ₽/кг"
  },
  {
    id: 3,
    title: "Краб живой, Владивосток",
    images: ["/images/krab.webp"],
    category: "krab",
    company: "КрабСнаб",
    region: "Приморье",
    price: "12 000 ₽/шт"
  },
  {
    id: 4,
    title: "Мидии премиум",
    images: ["/images/mor.webp"],
    category: "mor",
    company: "Море Прим",
    region: "Владивосток",
    price: "850 ₽/кг"
  },
  // ...добавь сколько угодно!
];

const CATEGORY_LABELS = {
  ikra: "Икра",
  ryba: "Рыба",
  krab: "Краб",
  mor: "Морепродукты",
};

export default function MarketSellCategory() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  // Поиск сразу по названию, компании и региону
  const filteredAds = exampleAds.filter(ad =>
    ad.category === category &&
    (
      ad.title.toLowerCase().includes(query.toLowerCase()) ||
      ad.company.toLowerCase().includes(query.toLowerCase()) ||
      ad.region.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a182a] via-[#1b2b40] to-[#221f4c] px-2 pt-4 pb-24 flex flex-col items-center">
      {/* Кнопка Назад */}
      <button
        onClick={() => navigate(-1)}
        className="mb-3 ml-2 flex items-center gap-2 text-[#23df81] font-semibold hover:text-white transition"
      >
        <svg width="20" height="20" fill="none">
          <path d="M13 5l-5 5 5 5" stroke="#23df81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      <h2 className="font-extrabold text-[22px] text-[#23df81] mb-3 tracking-wide">
        {CATEGORY_LABELS[category] || "Объявления"}
      </h2>
      {/* Поиск */}
      <div className="sticky top-3 z-10 w-full max-w-xl mb-4">
        <input
          type="text"
          placeholder="Поиск по названию, компании или региону..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full text-lg rounded-xl px-5 py-3 bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg backdrop-blur-md transition"
          autoFocus
        />
      </div>
      {/* Сетка объявлений */}
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-5 justify-center">
        {filteredAds.length === 0 ? (
          <div className="text-white text-center col-span-2 mt-20 text-lg flex flex-col items-center gap-3">
            <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span>Нет объявлений по вашему запросу</span>
          </div>
        ) : (
          filteredAds.map((ad, i) => (
            <div
              key={ad.id}
              className="flex flex-col items-center rounded-2xl bg-white/10 backdrop-blur-md shadow-xl p-3 border border-white/15 transition-all duration-200 hover:scale-105 hover:shadow-2xl animate-fade-in"
              style={{
                minHeight: 210,
                boxShadow: "0 6px 24px 0 rgba(0,0,0,0.18)",
                animationDelay: `${i * 50}ms`
              }}
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = '/images/no-image.webp'; }}
                />
                {/* Тег категории */}
                <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-xs text-black font-bold px-3 py-1 rounded-full shadow">
                  {CATEGORY_LABELS[ad.category]}
                </span>
              </div>
              <div className="text-lg font-bold text-white text-center mb-1">{ad.title}</div>
              <div className="text-base font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-1">
                {ad.price}
              </div>
              <div className="text-xs text-white/70 mb-1">{ad.company} {ad.region && `· ${ad.region}`}</div>
              <button
                className="mt-1 w-[92%] flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl py-2 hover:scale-105 transition"
                onClick={() => navigate(`/market/sell/detail/${ad.id}`)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
                Подробнее
              </button>
            </div>
          ))
        )}
      </div>
      {/* Анимация появления */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.5s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(32px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
}
