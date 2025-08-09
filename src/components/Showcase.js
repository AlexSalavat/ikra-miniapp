import React from "react";
import { useNavigate } from "react-router-dom";

const showcaseItems = [
  {
    key: "suppliers",
    title: "Поставщики",
    desc: "Проверенные компании — прямые контакты.",
    image: "/images/suppliers.webp",
    to: "/catalog/suppliers",
  },
  {
    key: "logistics",
    title: "Логистика ДВ",
    desc: "Вся информация по логистике Дальнего Востока.",
    image: "/images/logistics.webp",
    to: "/logistics",
  },
  {
    key: "production",
    title: "Производство",
    desc: "Рыбные и икорные производства.",
    image: "/images/production.webp",
    to: "/production",
  },
  {
    key: "neirobiz",
    title: "Neirobiz",
    desc: "AI-сервисы для бизнеса.",
    image: "/images/neirobiz.webp",
    to: "/neirobiz",
  },
];

export default function Showcase() {
  const navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen p-4 flex flex-col items-center">
      <h2 className="text-white font-bold text-lg mb-4">Категории</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {showcaseItems.map((item) => (
          <div
            key={item.key}
            onClick={() => navigate(item.to)}
            className="glass-card p-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/images/no-image.webp'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />
            </div>
            <div className="mt-2 text-center">
              <div className="text-white font-semibold text-sm truncate">
                {item.title}
              </div>
              <div className="text-white/70 text-xs mt-0.5">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
