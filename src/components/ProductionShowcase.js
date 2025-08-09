import React, { useMemo } from "react";
import producers from "../data/production";
import { useNavigate } from "react-router-dom";

const getInitials = (name = "") =>
  name.replace(/["«»]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "??";

const stringHue = (s = "") => { let h = 0; for (let i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))%360; return h; };

export default function ProductionShowcase() {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition">
            <svg width="20" height="20" fill="none"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Производство</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {producers.map(item => <Card key={item.id} item={item} />)}
        {producers.length === 0 && Array.from({length:4}).map((_,i)=>(<div key={i} className="glass-card aspect-square animate-pulse" />))}
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

  const verified = item.badges?.includes("Проверенный");
  const premium = item.badges?.includes("Честный знак") && item.badges?.includes("Меркурий");

  return (
    <div className={`glass-card p-2 ${premium ? "premium" : ""}`}>
      <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
        {img ? (
          <img src={img} alt={item.name} loading="lazy" onError={(e)=>{ e.currentTarget.remove(); }} className="w-full h-full object-cover img-fade-in" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/95 font-extrabold text-xl" style={{ background: bg }}>
            {getInitials(item.name)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

        {verified && (
          <div className="absolute top-1 left-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/60 backdrop-blur-sm">
              ✅ Проверенный
            </span>
          </div>
        )}

        {premium && (
          <div className="absolute top-1 right-1 w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm" title="Premium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)">
              <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/>
            </svg>
          </div>
        )}
      </div>

      <div className="mt-2 text-center">
        <div className="text-white font-semibold text-sm truncate" title={item.name}>{item.name}</div>
      </div>
    </div>
  );
}
