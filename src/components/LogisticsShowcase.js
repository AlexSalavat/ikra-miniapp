import React, { useMemo, useState } from "react";
import logistics from "../data/logistics";
import { useNavigate } from "react-router-dom";

const FILTERS = [
  { label: "Камчатка", keys: ["Камчатка", "Камчатский"] },
  { label: "Владивосток", keys: ["Владивосток"] },
  { label: "Сахалин", keys: ["Сахалин"] },
  { label: "Хабаровск", keys: ["Хабаровск"] },
];

const getInitials = (name = "") =>
  name.replace(/["«»]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "??";

const stringHue = (s = "") => { let h = 0; for (let i = 0; i < s.length; i++) h = (h*31 + s.charCodeAt(i)) % 360; return h; };

const matchKeys = (item, keys) => {
  if (!keys?.length) return true;
  const text = `${item.address || ""} ${item.name || ""} ${item.region || ""}`;
  return keys.some(k => text.toLowerCase().includes(k.toLowerCase()));
};

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState(FILTERS[0].label);
  const navigate = useNavigate();

  const activeKeys = FILTERS.find(f => f.label === filter)?.keys || [];
  const filtered = useMemo(() => logistics.filter(x => matchKeys(x, activeKeys)), [activeKeys]);

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition">
            <svg width="20" height="20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Логистика ДВ</h2>
          <span className="w-16" />
        </div>
        {/* Filters */}
        <div className="max-w-md mx-auto px-3 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {FILTERS.map(f => {
              const active = f.label === filter;
              return (
                <button
                  key={f.label}
                  onClick={() => setFilter(f.label)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition",
                    active ? "text-[#23df81] border border-[#22b978] bg-[#0a1918]" : "text-[#d3d3d7] border border-[#20222b]"
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {filtered.map(item => <Card key={item.id} item={item} />)}
        {filtered.length === 0 && Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass-card aspect-square animate-pulse" />)}
      </div>
    </div>
  );
}

function Card({ item }) {
  const img = item.logo?.trim() ? item.logo : null;
  const bg = useMemo(() => {
    const h = stringHue(item.name || item.region || "x");
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .85),hsl(${(h+40)%360} 80% 30% / .85))`;
  }, [item.name, item.region]);

  return (
    <div className="glass-card p-2">
      <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
        {img ? (
          <img src={img} alt={item.name} loading="lazy" onError={(e)=>{ e.currentTarget.remove(); }} className="w-full h-full object-cover img-fade-in" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/95 font-extrabold text-xl" style={{ background: bg }}>
            {getInitials(item.name || item.region || "??")}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
        {item.region && (
          <div className="absolute top-1 left-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-black/35 backdrop-blur-sm">
              {item.region}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 text-center">
        <div className="text-white font-semibold text-sm truncate" title={item.name}>{item.name}</div>
      </div>
    </div>
  );
}
