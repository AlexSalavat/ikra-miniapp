import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* Инициалы, если нет лого */
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
    logo,              // используем как фото; если это именно логотип — тоже ок
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
          "relative glass-card group p-3 rounded-[22px]",
          "transition-transform duration-200 ease-out",
          "hover:scale-[1.02] active:scale-[0.99]",
        ].join(" ")}
      >
        {/* Квадратное фото (full-bleed) */}
        <div className="relative rounded-[18px] overflow-hidden border border-white/10 bg-white/[0.05] aspect-square">
          {/* Фото */}
          {logo ? (
            <img
              src={logo}
              alt={name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => e.currentTarget.remove()}
              className={[
                "absolute inset-0 w-full h-full object-cover",
                imgLoaded ? "img-fade-in" : "opacity-0",
              ].join(" ")}
            />
          ) : null}

          {/* Fallback (инициалы) если фото/лого нет или не загрузилось */}
          {!logo || !imgLoaded ? (
            <div
              className="absolute inset-0 grid place-items-center text-white font-extrabold text-3xl"
              style={fallbackStyle}
            >
              <span className="drop-shadow-[0_6px_18px_rgba(0,0,0,.35)]">
                {getInitials(name)}
              </span>
            </div>
          ) : null}

          {/* Затемнение для читаемости бейджей */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />

          {/* Бейджи поверх фото (по углам) */}
          {verified && (
            <div className="absolute top-2 left-2 z-10">
              <span className="badge-verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Проверенный
              </span>
            </div>
          )}
          {isPremium && (
            <div className="absolute top-2 right-2 z-10">
              <span className="badge-premium">PREMIUM</span>
            </div>
          )}
        </div>

        {/* Подпись под фото */}
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
