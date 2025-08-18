import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ads from '../data/marketAdsDemo';

const CATEGORY_LABELS = { ikra: 'Икра', ryba: 'Рыба', krab: 'Краб', mor: 'Морепродукты' };

const stringHue = (s = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

export default function MarketSellCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return ads.filter(
      (a) =>
        a.category === category &&
        [a.title, a.company, a.region]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [category, query]);

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header + search */}
      <div className="sticky top-0 z-20 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-3 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
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
            {CATEGORY_LABELS[category] || 'Объявления'}
          </h2>
          <span className="w-16" />
        </div>
        <div className="max-w-md mx-auto px-3 pb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, компании или региону…"
            className="w-full text-sm rounded-lg px-3 py-2 bg-white/10 text-white placeholder-white/60 outline-none border border-white/10 focus:ring-2 focus:ring-[rgba(59,175,218,.6)]"
          />
        </div>
      </div>

      {/* Grid of ads */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {filtered.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center text-white/70 mt-10">Нет объявлений</div>
        )}
      </div>
    </div>
  );
}

function AdCard({ ad }) {
  const img = ad.images?.[0];
  const bg = useMemo(() => {
    const h = stringHue(ad.title || ad.company || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .85),hsl(${(h + 40) % 360} 80% 30% / .85))`;
  }, [ad.title, ad.company]);

  return (
    <Link to={`/market/sell/detail/${ad.id}`} className="block">
      <div className={`glass-card p-2 ${ad.premium ? 'premium' : ''}`}>
        <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
          {img ? (
            <img
              loading="lazy"
              src={img}
              alt={ad.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/no-image.webp';
              }}
            />
          ) : (
            <div className="w-full h-full" style={{ background: bg }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

          {/* price pill */}
          {ad.price && (
            <div className="absolute bottom-1 left-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold text-white bg-[rgba(59,175,218,.85)] border border-white/20 backdrop-blur-sm">
                {ad.price}
              </span>
            </div>
          )}

          {/* verified / premium */}
          {ad.verified && (
            <div className="absolute top-1 left-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/60 backdrop-blur-sm">
                ✅ Проверенный
              </span>
            </div>
          )}
          {ad.premium && (
            <div
              className="absolute top-1 right-1 w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm"
              title="Premium"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)">
                <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
              </svg>
            </div>
          )}
        </div>

        <div className="mt-2 text-center">
          <div className="text-white font-semibold text-sm truncate" title={ad.title}>
            {ad.title}
          </div>
          <div className="flex items-center justify-center gap-1 text-xs text-white/75 mt-0.5">
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
            <span className="truncate">
              {ad.company}
              {ad.region ? ` · ${ad.region}` : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
