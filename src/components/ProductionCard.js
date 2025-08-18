// src/components/ProductionCard.js
import React, { useMemo } from 'react';

const getInitials = (name = '') =>
  (name || '')
    .replace(/["«»]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '??';

const stringHue = (s = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

export default function ProductionCard({ site }) {
  const name = site?.name || 'Без названия';
  const region = site?.region || '';
  const img = site?.image?.trim() ? site.image : null;
  const lines = Array.isArray(site?.lines) ? site.lines : [];
  const capacity = site?.capacity || '';
  const badges = Array.isArray(site?.badges) ? site.badges : [];

  const bg = useMemo(() => {
    const h = stringHue(name || region || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .85),hsl(${(h + 40) % 360} 80% 30% / .85))`;
  }, [name, region]);

  const premium =
    badges.includes('HACCP') && (badges.includes('ISO 22000') || badges.includes('Меркурий'));

  return (
    <div className={`glass-card p-2 ${premium ? 'premium' : ''}`} title={name}>
      {/* Медиа */}
      <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
        {img ? (
          <img
            src={img}
            alt={name}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = '/images/no-image.webp')}
            className="w-full h-full object-cover img-fade-in"
          />
        ) : (
          <div
            className="w-full h-full grid place-items-center text-white/95 font-extrabold text-xl"
            style={{ background: bg }}
          >
            {getInitials(name)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

        {/* Производительность (если задана) */}
        {capacity && (
          <div className="absolute bottom-1 left-1">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold text-white bg-[rgba(59,175,218,.85)] border border-white/20 backdrop-blur-sm">
              {capacity}
            </span>
          </div>
        )}

        {/* Премиум-метка (если сертификации) */}
        {premium && (
          <div
            className="absolute top-1 right-1 w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm"
            title="Комплекс сертифицирован"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)">
              <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
            </svg>
          </div>
        )}
      </div>

      {/* Текст */}
      <div className="mt-2 text-center">
        <div className="text-white font-semibold text-sm truncate" title={name}>
          {name}
        </div>

        {region && (
          <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] text-white/75">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            <span className="truncate">{region}</span>
          </div>
        )}

        {!!lines.length && (
          <div className="mt-1 flex flex-wrap justify-center gap-1">
            {lines.slice(0, 3).map((l, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/[0.06] backdrop-blur-sm"
              >
                {l}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
