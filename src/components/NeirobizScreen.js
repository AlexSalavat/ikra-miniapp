// src/components/NeirobizScreen.js
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import servicesRaw from "../data/neirobiz";
import cardsRaw from "../data/neirobizServices";

// Безопасно приводим к массивам
const services = Array.isArray(servicesRaw) ? servicesRaw : [];
const cards = Array.isArray(cardsRaw) ? cardsRaw : [];

// Сборка карточек: к визуальным карточкам подмешиваем icon/short из services
function buildItems() {
  const byId = Object.fromEntries(services.map(s => [s.id, s]));
  return cards
    .map(c => ({
      ...c,
      icon: byId[c.id]?.icon || "✨",
      short: byId[c.id]?.short || c.description || "",
    }))
    .filter(c => c && c.id && (c.image || c.title));
}

const CARD = 172;
const RADIUS = 20;

export default function NeirobizScreen() {
  const navigate = useNavigate();
  const items = useMemo(buildItems, []);

  return (
    <div className="bg-black min-h-screen pb-20 pt-6 flex flex-col items-center">
      {/* Шапка */}
      <div className="w-full max-w-[420px] px-4">
        <h1 className="text-white font-extrabold text-[22px] tracking-[.02em]">
          NeiroBiz
        </h1>
        <div className="text-[#b5e0fe] text-[14.5px] mt-1 font-semibold">
          AI‑сервисы и генерация упаковки
        </div>
        <div className="text-white/70 text-[13px] mt-1">
          Автоматизируйте бизнес через ботов, мини‑приложения, дизайн и аналитику.{" "}
          <span className="text-[#23df81] font-semibold">
            Оформите заявку — результат быстрее.
          </span>
        </div>
      </div>

      {/* Сетка карточек */}
      <div
        className="mt-4 grid justify-center gap-4"
        style={{ gridTemplateColumns: `repeat(2, min(${CARD}px, 44vw))` }}
      >
        {items.length === 0 && (
          <div className="text-white/70 text-sm col-span-2 px-4">
            Карточки пока пустые. Проверь файлы <code>/src/data/neirobiz.js</code> и{" "}
            <code>/src/data/neirobizServices.js</code> — там должны быть массивы.
          </div>
        )}

        {items.map((svc) => (
          <button
            key={svc.id}
            onClick={() => navigate(`/neirobiz/service/${svc.id}`)}
            className="group relative text-left bg-white/5 border border-white/10 backdrop-blur-md"
            style={{
              width: CARD,
              maxWidth: "44vw",
              borderRadius: RADIUS,
              padding: 8,
              boxShadow: "0 2px 14px rgba(0,0,0,.25)",
              transition: "transform .15s ease",
            }}
          >
            {/* Визуал */}
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
              {/* Пилюля-иконка */}
              <div className="absolute top-2 left-2">
                <span className="px-2.5 py-1 rounded-full text-[12px] font-bold text-white border border-white/15 bg-white/10 backdrop-blur-sm">
                  {svc.icon}
                </span>
              </div>
              {/* Градиент снизу */}
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
