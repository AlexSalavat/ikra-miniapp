// src/components/TopProducers.js
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import producers from "../data/producers";

const REGIONS = ["Камчатка", "Сахалин", "Хабаровск", "Магадан"];

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

export default function TopProducers() {
  const [filter, setFilter] = useState(REGIONS[0]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filter]);

  const filtered = useMemo(
    () => producers.filter((p) => p.region === filter),
    [filter]
  );

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
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
            Топ Производители
          </h2>
          <span className="w-16" />
        </div>

        {/* Filters */}
        <div className="max-w-md mx-auto px-3 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {REGIONS.map((r) => {
              const active = r === filter;
              return (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className={[
                    "px-3 py-1.5 rounded-lg text-[12.5px] font-semibold whitespace-nowrap transition",
                    active
                      ? "text-[#23df81] border border-[#22b978] bg-[#0a1918]"
                      : "text-[#d3d3d7] border border-[#20222b]",
                  ].join(" ")}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of producers */}
      <div className="max-w-md mx-auto px-3 pt-3 grid grid-cols-2 gap-3">
        {filtered.map((p) => (
          <ProducerCard key={p.id} p={p} onClick={() => navigate(`/producer/${p.id}`)} />
        ))}
        {filtered.length === 0 &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card aspect-square animate-pulse" />
          ))}
      </div>
    </div>
  );
}

function ProducerCard({ p, onClick }) {
  const img = p.logo?.trim() ? p.logo : null;
  const verified = p.badges?.includes("Проверенный");
  const premium =
    p.badges?.includes("Честный знак") && p.badges?.includes("Меркурий");

  const bg = useMemo(() => {
    const h = stringHue(p.name || p.region || "x");
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .85),hsl(${
      (h + 40) % 360
    } 80% 30% / .85))`;
  }, [p.name, p.region]);

  return (
    <div
      className={`glass-card p-2 ${premium ? "premium" : ""} cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
      onClick={onClick}
      title={p.name}
    >
      {/* Image square */}
      <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
        {img ? (
          <img
            src={img}
            alt={p.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.remove();
            }}
            className="w-full h-full object-cover img-fade-in"
          />
        ) : (
          <div
            className="w-full h-full grid place-items-center text-white/95 font-extrabold text-xl"
            style={{ background: bg }}
          >
            {getInitials(p.name)}
          </div>
        )}

        {/* readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

        {/* region pill */}
        {p.region && (
          <div className="absolute top-1 left-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-black/35 backdrop-blur-sm">
              {p.region}
            </span>
          </div>
        )}

        {/* badges */}
        {verified && (
          <div className="absolute top-1 right-[30px]">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/60 backdrop-blur-sm">
              ✅ Проверенный
            </span>
          </div>
        )}
        {premium && (
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

      {/* name */}
      <div className="mt-2 text-center">
        <div className="text-white font-semibold text-sm truncate">{p.name}</div>
      </div>
    </div>
  );
}
