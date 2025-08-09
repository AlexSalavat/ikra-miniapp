// src/components/Showcase.js
import React from "react";
import { useNavigate } from "react-router-dom";

const showcaseItems = [
  {
    key: "suppliers",
    title: "Поставщики",
    desc: "Проверенные компании — прямые контакты.",
    image: "/images/suppliers.webp",
    to: "/catalog/suppliers",
    glow: "from-cyan-400 to-blue-500",
  },
  {
    key: "logistics",
    title: "Логистика ДВ",
    desc: "Вся информация по логистике Дальнего Востока.",
    image: "/images/logistics.webp",
    to: "/logistics",
    glow: "from-amber-400 to-orange-500",
  },
  {
    key: "production",
    title: "Производство",
    desc: "Рыбные и икорные производства.",
    image: "/images/production.webp",
    to: "/production",
    glow: "from-emerald-400 to-green-500",
  },
  {
    key: "neirobiz",
    title: "Neirobiz",
    desc: "AI-сервисы для бизнеса.",
    image: "/images/neirobiz.webp",
    to: "/neirobiz",
    glow: "from-pink-400 to-fuchsia-500",
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">
            Категории
          </h2>
          <span className="w-16" />{/* балансируем сетку */}
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
              "shadow-[0_0_0_1px_rgba(255,255,255,.06)_inset,0_24px_60px_-24px_rgba(0,255,200,.25)]",
              "transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.99]",
            ].join(" ")}
            style={{ aspectRatio: "1 / 1" }}
            aria-label={item.title}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/no-image.webp";
                }}
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/45" />
              {/* Subtle top-to-bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
              {/* Glow accent at bottom */}
              <div
                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-14 blur-2xl opacity-60 bg-gradient-to-r ${item.glow}`}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full p-3 flex flex-col justify-end">
              <div className="text-white font-semibold text-[14px] leading-tight line-clamp-2 drop-shadow">
                {item.title}
              </div>
              <div className="mt-1 text-white/75 text-[11px] leading-snug line-clamp-2">
                {item.desc}
              </div>
            </div>

            {/* Focus ring for a11y */}
            <span className="absolute inset-0 rounded-2xl ring-0 ring-cyan-400/0 group-focus-visible:ring-2 group-focus-visible:ring-cyan-400/60 transition" />
          </button>
        ))}
      </div>
    </div>
  );
}
