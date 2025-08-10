import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import servicesMeta from "../data/neirobiz";           // тексты/иконки
import servicesCards from "../data/neirobizServices";   // картинки

const CARD = 172;
const RADIUS = 20;

// защищённое слияние (если вдруг не массив — не упадём)
function toArray(x) { return Array.isArray(x) ? x : []; }
function mergeServices() {
  const meta = toArray(servicesMeta);
  const cards = toArray(servicesCards);
  const map = Object.fromEntries(meta.map(s => [s.id, s]));
  return cards.map(card => ({
    ...card,
    icon: map[card.id]?.icon || "✨",
    short: map[card.id]?.short || card.description || "",
  }));
}

export default function NeirobizShowcase() {
  const navigate = useNavigate();
  const items = useMemo(mergeServices, []);

  return (
    <div className="bg-black min-h-screen pb-20 pt-6 flex flex-col items-center">
      <div className="w-full max-w-[420px] px-4">
        <h1 className="text-white font-extrabold text-[22px] tracking-[.02em]">NeiroBiz</h1>
        <div className="text-[#b5e0fe] text-[14.5px] mt-1 font-semibold">
          AI‑сервисы и генерация упаковки
        </div>
        <div className="text-white/70 text-[13px] mt-1">
          Боты, мини‑приложения, дизайн, видео, автоматизация и аналитика.
        </div>
      </div>

      <div
        className="mt-4 grid justify-center gap-4"
        style={{ gridTemplateColumns: `repeat(2, min(${CARD}px, 44vw))` }}
      >
        {items.map((svc) => (
          <button
            key={svc.id}
            onClick={() => navigate(`/neirobiz/service/${svc.id}`)}
            className="card-glow glass-card group relative text-left"
            style={{ width: CARD, maxWidth: "44vw", borderRadius: RADIUS, padding: 8 }}
          >
            <div
              className="relative w-full aspect-square overflow-hidden border border-white/10"
              style={{ borderRadius: RADIUS - 6, background: "#11141a" }}
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-1 rounded-full text-[12px] font-bold text-white border border-white/15 bg-white/10 backdrop-blur-sm">
                  {svc.icon}
                </span>
              </div>
            </div>

            <div className="mt-2 px-0.5">
              <div className="text-white font-bold text-[14px] leading-tight truncate" title={svc.title}>
                {svc.title}
              </div>
              <div className="text-white/70 text-[11.5px] leading-snug mt-1 line-clamp-2">
                {svc.short}
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,.08) inset" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
