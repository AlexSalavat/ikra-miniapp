// src/components/LogisticsShowcase.js
import React, { useMemo, useState } from "react";
import logistics from "../data/logistics";

/* ===== Фильтры по регионам ===== */
const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток", "Приморье", "Приморский"] },
  { label: "Сахалин", keys: ["Сахалин", "Южно‑Сахалинск"] },
  { label: "Хабаровск", keys: ["Хабаровск", "Хабаровский"] },
];

/* ===== helpers (как в поставщиках) ===== */
const getInitials = (name = "") =>
  name
    .replace(/["«»]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "??";

const stringHue = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

function isMatchByKeys(item, keys) {
  if (!keys?.length) return true;
  const hay = `${item.region || ""} ${item.name || ""}`.toLowerCase();
  return keys.some((k) => hay.includes(String(k).toLowerCase()));
}

/* ===== Компонент ===== */
export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);

  const activeKeys = useMemo(
    () => FILTERS.find((f) => f.label === filter)?.keys || [],
    [filter]
  );

  const items = useMemo(
    () => logistics.filter((l) => isMatchByKeys(l, activeKeys)),
    [activeKeys]
  );

  // мобильный квадрат 2‑в‑ряд (как в поставщиках)
  const GAP = 10;
  const CARD_SIZE = `calc((100vw - 26px - ${GAP}px) / 2)`;

  return (
    <div className="bg-black min-h-screen pt-2 pb-24 flex flex-col items-center">
      {/* Назад */}
      <button
        onClick={() => window.history.back()}
        className="self-start ml-3 mb-3 flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
      >
        <svg width="18" height="18" fill="none">
          <path
            d="M12 4l-6 5 6 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </button>

      {/* Фильтры */}
      <div className="w-full max-w-[480px] px-2 mb-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setFilter(f.label)}
                className={[
                  "px-3 py-1 rounded-lg border text-sm font-bold whitespace-nowrap transition",
                  active
                    ? "bg-[#0a1918] text-[#23df81] border-[#22b978]"
                    : "bg-transparent text-[#d3d3d7] border-[#20222b] hover:border-white/20",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Сетка карточек — стекло как у поставщиков */}
      <div
        className="w-full grid justify-center px-2"
        style={{
          maxWidth: `calc(2 * ${CARD_SIZE} + ${GAP}px)`,
          gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
          gap: GAP,
        }}
      >
        {items.map((item) => {
          const title = item.name || "Логистическая компания";
          const region = item.region || "—";
          const hue = stringHue(title || region);
          const fallbackBG = `linear-gradient(135deg, hsl(${hue} 68% 22% / .95), hsl(${(hue + 40) % 360} 68% 32% / .95))`;

          return (
            <div
              key={item.id}
              className="glass-card card-glow group p-2 rounded-[22px] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.99]"
              style={{ width: "100%" }}
            >
              {/* Внутренняя квадратная витрина */}
              <div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md aspect-square grid place-items-center">
                {/* Лого/фото */}
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={title}
                    className="w-[80%] h-[80%] object-contain img-fade-in drop-shadow-[0_6px_16px_rgba(59,175,218,.22)]"
                    onError={(e) => {
                      e.currentTarget.remove();
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 grid place-items-center text-white font-extrabold text-3xl"
                    style={{ background: fallbackBG }}
                  >
                    <span className="drop-shadow-[0_6px_18px_rgba(0,0,0,.35)]">
                      {getInitials(title)}
                    </span>
                  </div>
                )}

                {/* Чип региона (сверху‑слева), адрес НЕ показываем */}
                <div className="absolute top-1.5 left-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/95 border border-white/15 bg-black/45 backdrop-blur-sm">
                    {region}
                  </span>
                </div>
              </div>

              {/* Текст под витриной */}
              <div className="mt-2">
                <div
                  className="text-white font-semibold text-[14px] leading-snug truncate"
                  title={title}
                >
                  {title}
                </div>

                {/* при желании можно вывести 1–2 «чипа услуг»
                    если в объекте будут поля services или tags */}
                {Array.isArray(item.services) && item.services.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.services.slice(0, 2).map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/10 backdrop-blur-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Пусто? Акуратный плейсхолдер */}
      {items.length === 0 && (
        <div className="text-white/60 text-sm mt-8">
          Нет компаний для выбранного региона.
        </div>
      )}
    </div>
  );
}
