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
  // ...добавляй сколько хочешь!
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
      {/* Назад */}
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
      {/* Сетка карточек 2 колонки */}
      <div className="w-full max-w-xl grid grid-cols-2 gap-x-3 gap-y-4 justify-center">
        {filteredAds.length === 0 && (
          <div className="text-white text-center col-span-2 mt-20 text-base flex flex-col items-center gap-3">
            <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Нет объявлений по вашему запросу
          </div>
        )}
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className="flex flex-col items-center rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-2 border border-white/10 transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl"
            style={{
              minHeight: 135,
              boxShadow: "0 4px 18px 0 rgba(0,0,0,0.13)",
            }}
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-1.5">
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
              {/* Тег категории */}
              <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-yellow-400 to-pink-500 text-[10px] text-black font-bold px-2 py-0.5 rounded-full shadow">
                {CATEGORY_LABELS[ad.category]}
              </span>
            </div>
            <div className="text-sm font-bold text-white text-center mb-0.5 line-clamp-2">{ad.title}</div>
            <div className="text-[13px] font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-0.5">
              {ad.price}
            </div>
            <div className="text-[11px] text-white/70 mb-0.5">{ad.company} {ad.region && `· ${ad.region}`}</div>
            <button
              className="mt-0.5 w-[95%] flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg py-1.5 text-xs hover:scale-105 transition"
              onClick={() => navigate(`/market/sell/detail/${ad.id}`)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
              Подробнее
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
