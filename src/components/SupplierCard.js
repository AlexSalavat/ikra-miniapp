import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* Инициалы на случай отсутствующего лого */
const getInitials = (name = "") =>
  name.replace(/["«»]/g, "")
      .split(/\s+/).filter(Boolean)
      .slice(0, 2).map(w => w[0]?.toUpperCase())
      .join("") || "??";

const stringHue = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

export default function SupplierCard({ company }) {
  const [imgLoaded, setImgLoaded] = useState(false);

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

  const fallbackStyle = useMemo(() => {
    const h = stringHue(name || id || "fallback");
    return {
      background: `linear-gradient(135deg, hsl(${h} 80% 25% / .9), hsl(${(h + 40) % 360} 80% 35% / .9))`,
    };
  }, [name, id]);

  return (
    <Link to={`/supplier/${id}`} className="block">
      {/* Внешняя стеклянная карточка */}
      <div
        className={[
          "relative",           // важно для позиционирования бейджей
          "glass-card",
          "group p-3 rounded-[22px]",
          "transition-transform duration-200 ease-out",
          "hover:scale-[1.02] active:scale-[0.99]",
        ].join(" ")}
      >
        {/* Бейджи */}
        {verified && (
          <div className="absolute top-2 left-2 z-20">
            <span className="badge-verified">✅ Проверенный</span>
          </div>
        )}
        {isPremium && (
          <div className="absolute top-2 right-2 z-20">
            <span className="badge-premium">PREMIUM</span>
          </div>
        )}

        {/* Плитка с логотипом */}
        <div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-white/[0.05] aspect-square grid place-items-center">
          {!imgLoaded && logo && <div className="absolute inset-0 animate-pulse bg-white/[.06]" />}

          {logo ? (
            <img
              src={logo}
              alt={name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => e.currentTarget.remove()}
              className={[
                "max-w-[76%] max-h-[76%] object-contain",
                "drop-shadow-[0_6px_16px_rgba(0,255,200,.22)]",
                imgLoaded ? "img-fade-in" : "opacity-0",
              ].join(" ")}
            />
          ) : null}

          {/* Fallback инициалы */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 grid place-items-center text-white font-extrabold text-3xl"
              style={fallbackStyle}
            >
              <span className="drop-shadow-[0_6px_18px_rgba(0,0,0,.35)]">
                {getInitials(name)}
              </span>
            </div>
          )}
        </div>

        {/* Подпись */}
        <div className="mt-2">
          <div className="text-white font-semibold text-[14px] leading-snug truncate" title={name}>
            {name}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-white/80">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z"/><circle cx="12" cy="11" r="3"/>
            </svg>
            <span className="truncate">{city || region || "—"}</span>
          </div>

          {!!products?.length && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {products.slice(0, 2).map((p, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/[0.06] backdrop-blur-sm"
                >
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
