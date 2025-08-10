import React, { useState, useMemo } from "react";
import logistics from "../data/logistics";
import { useNavigate } from "react-router-dom";

const FILTERS = [
  { label: "Все", keys: [] },
  { label: "Авто", keys: ["авто", "грузовик", "транспорт"] },
  { label: "Морской", keys: ["морской", "корабль", "судно"] },
  { label: "ЖД", keys: ["жд", "поезд", "железная дорога"] },
  { label: "Авиа", keys: ["авиа", "самолет", "воздушный"] },
];

const isMatchByKeys = (item, keys) => {
  if (!keys.length) return true;
  const lower = (item.name + " " + item.description).toLowerCase();
  return keys.some((key) => lower.includes(key));
};

export default function LogisticsShowcase() {
  const [filter, setFilter] = useState("Все");
  const navigate = useNavigate();

  const { activeKeys, filtered } = useMemo(() => {
    const keys = FILTERS.find((f) => f.label === filter)?.keys || [];
    return {
      activeKeys: keys,
      filtered: logistics.filter((item) => isMatchByKeys(item, keys)),
    };
  }, [filter]);

  return (
    <div className="bg-black min-h-screen pb-20 pt-6 flex flex-col items-center">
      <div className="w-full max-w-[420px] px-4">
        <h1 className="text-white font-extrabold text-[22px]">Логистика</h1>
        <div className="text-white/70 text-[13px] mt-1">
          Выберите способ доставки
        </div>
      </div>

      {/* Фильтры */}
      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar px-4 w-full max-w-[420px]">
        {FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => setFilter(f.label)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
              filter === f.label
                ? "bg-[#23df81] text-black"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Карточки */}
      <div className="mt-4 grid gap-4 px-4 w-full max-w-[420px]">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/logistics/${item.id}`)}
            className="glass-card p-3 text-left rounded-xl border border-white/10 hover:bg-white/5 transition"
          >
            <div className="font-bold text-white">{item.name}</div>
            <div className="text-white/70 text-sm mt-1">{item.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
