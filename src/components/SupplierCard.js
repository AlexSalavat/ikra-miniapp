import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const getInitials = (name = "") =>
  name.replace(/["«»]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "??";

const stringHue = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

export default function SupplierCard({ company }) {
  // Хуки — всегда первыми
  const [imgLoaded, setImgLoaded] = useState(false);

  const fallbackStyle = useMemo(() => {
    if (!company?.name && !company?.id) return {};
    const h = stringHue(company.name || company.id || "fallback");
    return {
      background: `linear-gradient(135deg, hsl(${h} 80% 25% / .9), hsl(${(h + 40) % 360} 80% 35% / .9))`,
    };
  }, [company?.name, company?.id]);

  const {
    id,
    name,
    region,
    city,
    logo,
    verified,
    products = [],
    certs = [],
  } = company || {};

  const isPremium = certs?.includes("Честный знак") && certs?.includes("Меркурий");

  return (
    <Link to={`/supplier/${id}`} className="block">
      <div
        className={[
          "relative group rounded-[22px] p-3",
          "bg-white/8 backdrop-blur-xl",
          "border border-white/10",
          "shadow-[0_0_0_1px_rgba(255,255,255,.06)_inset,0_24px_60px_-24px_rgba(0,255,200,.35)]",
          "transition-transform duration-200 ease-out",
          "hover:scale-[1.02] active:scale-[0.99]",
          "card-glow",
        ].join(" ")}
      >
        {/* Левый верх — «Проверенный» (уменьшили) */}
        <div className="absolute top-2 left-2 z-10 flex gap-1.5">
          {verified && (
            <span className="px-1.5 py-0.5 rounded-full text-[9.5px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
              ✓ Проверенный
            </span>
          )}
        </div>

        {/* Правый верх — значок «Премиум» (только иконка) */}
        <div className="absolute top-2 right-2 z-10">
          {isPremium && (
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm"
              title="Premium"
            >
              {/* Корона */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="url(#g)">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffd166" />
                    <stop offset="100%" stopColor="#ff7a7a" />
                  </linearGradient>
                </defs>
                <path d="M3 7l5 4 4-6 4 6 5-4v10H3z" />
              </svg>
            </span>
          )}
        </div>

        {/* Логотип */}
        <div className="relative rounded-[16px] overflow-hidden border border-white/10 bg-white/5 aspect-square grid place-items-center">
          {!imgLoaded && logo && <div className="absolute inset-0 animate-pulse bg-white/[.06]" />}

          {logo ? (
            <img
              src={logo}
              alt={name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => { e.currentTarget.remove(); }}
              className={[
                "max-w-[80%] max-h-[80%] object-contain",
                "drop-shadow-[0_6px_16px_rgba(0,255,200,.22)]",
                imgLoaded ? "img-fade-in" : "opacity-0",
              ].join(" ")}
            />
          ) : null}

          {/* Fallback инициалы */}
          {!imgLoaded && (
            <div className="absolute inset-0 grid place-items-center text-white font-extrabold text-3xl" style={fallbackStyle}>
              <span className="drop-shadow-[0_6px_18px_rgba(0,0,0,.35)]">{getInitials(name)}</span>
            </div>
          )}
        </div>

        {/* Текст */}
        <div className="mt-2">
          <div className="text-white font-semibold text-[14px] leading-snug truncate" title={name}>
            {name}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z"/><circle cx="12" cy="11" r="3"/>
            </svg>
            <span className="truncate">{city || region || "—"}</span>
          </div>
          {!!products?.length && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {products.slice(0, 2).map((p, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/5 backdrop-blur-sm">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
