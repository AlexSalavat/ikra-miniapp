// src/components/NeirobizShowcase.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import services from "../data/neirobiz";
import neirobizServices from "../data/neirobizServices";

const CARD = 172;
const RADIUS = 20;

function mergeServices() {
  const map = Object.fromEntries(services.map(s => [s.id, s]));
  return neirobizServices.map(card => ({
    ...card,
    short: map[card.id]?.short || card.description || "",
  }));
}

export default function NeirobizShowcase() {
  const navigate = useNavigate();
  const items = useMemo(mergeServices, []);

  return (
    <div className="bg-black min-h-screen pb-20 pt-6 flex flex-col items-center">
      {/* Заголовок */}
      <div className="w-full max-w-[420px] px-4">
        <h1 className="text-white font-extrabold text-[22px] tracking-[.02em]">NeiroBiz</h1>
        <div className="text-[#b5e0fe] text-[14.5px] mt-1 font-semibold">
          AI-сервисы и генерация упаковки
        </div>
        <div className="text-white/70 text-[13px] mt-1">
          Автоматизируйте бизнес через ботов, мини-приложения, дизайн и аналитику.{" "}
          <span className="text-[#23df81] font-semibold">Оформите заявку — результат быстрее.</span>
        </div>
      </div>

      {/* Сетка карточек */}
      <div
        className="mt-4 grid justify-center gap-4"
        style={{ gridTemplateColumns: `repeat(2, min(${CARD}px, 44vw))` }}
      >
        {items.map((svc) => (
          <button
            key={svc.id}
            onClick={() => navigate(`/neirobiz/service/${svc.id}`)}
            className="group relative text-left"
            style={{
              width: CARD,
              maxWidth: "44vw",
              borderRadius: RADIUS,
              padding: 8,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 12px rgba(97, 180, 255, 0.35)", // Синее свечение
              transition: "box-shadow .3s ease, transform .2s ease",
            }}
          >
            {/* Картинка */}
            <div
              className="relative w-full aspect-square overflow-hidden"
              style={{
                borderRadius: RADIUS - 6,
                background: "#11141a",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Текст */}
            <div className="mt-2 px-0.5">
              <div
                className="text-white font-bold text-[14px] leading-tight truncate"
                title={svc.title}
              >
                {svc.title}
              </div>
              <div className="text-white/70 text-[11.5px] leading-snug mt-1 line-clamp-2">
                {svc.short}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
