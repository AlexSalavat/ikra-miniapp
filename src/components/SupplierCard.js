import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* Инициалы при отсутствии фото */
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
      <div className={`glass-card ${isPremium ? "premium" : ""} p-2`}>
        {/* Фото */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          {logo && (
            <img
              src={logo}
              alt={name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => e.currentTarget.remove()}
              className={`w-full h-full object-cover ${imgLoaded ? "img-fade-in" : "opacity-0"}`}
            />
          )}
          {(!logo || !imgLoaded) && (
            <div className="w-full h-full grid place-items-center text-white text-xl font-bold" style={fallbackStyle}>
              {getInitials(name)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />

          {/* Город по центру */}
          {(city || region) && (
            <div className="city-overlay">{city || region}</div>
          )}

          {/* Бейджи */}
          <div className="absolute top-1 left-1 flex gap-1">
            {verified && (
              <span className="badge-verified">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Проверенный
              </span>
            )}
          </div>
          {isPremium && (
            <div className="absolute top-1 right-1 badge-premium" title="Premium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill={`rgb(var(--rk-blue))`}>
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Текст */}
        <div className="mt-2">
          <div className="text-white font-semibold text-sm truncate" title={name}>
            {name}
          </div>
          {!!products?.length && (
            <div className="mt-1 flex flex-wrap gap-1">
              {products.slice(0, 2).map((p, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/[0.06] backdrop-blur-sm">
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
