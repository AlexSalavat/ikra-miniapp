import React from "react";
import { useNavigate } from "react-router-dom";

const showcaseItems = [
  {
    key: "suppliers",
    title: "Поставщики",
    desc: "Проверенные компании — прямые контакты.",
    image: "/images/suppliers.webp",
    to: "/catalog/suppliers",
  },
  {
    key: "logistics",
    title: "Логистика ДВ",
    desc: "Вся информация по логистике Дальнего Востока.",
    image: "/images/logistics.webp",
    to: "/logistics",
  },
  {
    key: "production",
    title: "Производство",
    desc: "Рыбные и икорные производства.",
    image: "/images/production.webp",
    to: "/production",
  },
  {
    key: "neirobiz",
    title: "Neirobiz",
    desc: "AI-сервисы для бизнеса.",
    image: "/images/neirobiz.webp",
    to: "/neirobiz",
  },
];

export default function Showcase() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto w-full px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
            aria-label="Назад"
          >
            <svg width="20" height="20" fill="none">
              <path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Категории</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-md px-4 pt-4 grid grid-cols-2 gap-4">
        {showcaseItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(item.to)}
            className={[
              "relative overflow-hidden rounded-2xl group text-left",
              "bg-white/8 backdrop-blur-xl border border-white/10",
              "shadow-[0_0_0_1px_rgba(255,255,255,.06)_inset,0_24px_60px_-24px_rgba(0,255,200,.18)]",
              "transition-all duration-200 ease-out",
              "hover:scale-[1.02] active:scale-[0.99]",
              "hover:shadow-[0_0_0_1px_rgba(255,255,255,.1)_inset,0_28px_80px_-24px_rgba(0,255,200,.35)]",
              "hover:border-cyan-300/30 focus-visible:border-cyan-300/40",
            ].join(" ")}
            style={{ aspectRatio: "1 / 1" }}
            aria-label={item.title}
          >
            {/* Image (без цветных бликов) */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "/images/no-image.webp"; }}
            />
            {/* Нейтральное затемнение для читаемости */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/50" />

            {/* Content */}
            <div className="relative z-10 h-full p-3 flex flex-col justify-end">
              <div className="text-white font-semibold text-[14px] leading-tight line-clamp-2 drop-shadow">
                {item.title}
              </div>
              <div className="mt-1 text-white/75 text-[11px] leading-snug line-clamp-2">
                {item.desc}
              </div>
            </div>

            {/* Подсветка именно карточки (контур) */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-300/0 group-hover:ring-2 group-hover:ring-cyan-300/40 transition-all duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
}
