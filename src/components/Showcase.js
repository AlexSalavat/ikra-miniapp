// src/components/Showcase.js
import React from "react";
import { useNavigate } from "react-router-dom";

const showcaseItems = [
  {
    key: "suppliers",
    title: "Поставщики",
    desc: "Каталог всех надёжных компаний-поставщиков.",
    icon: "🧑‍💼",
    to: "/catalog/suppliers",
  },
  {
    key: "logistics",
    title: "Логистика ДВ",
    desc: "Надёжные перевозчики и логистические компании Дальнего Востока.",
    icon: "🚚",
    to: "/logistics",
  },
  {
    key: "production",
    title: "Производство",
    desc: "Каталог рыбных и икорных производств региона.",
    icon: "🏭",
    to: "/production",
  },
  {
    key: "neirobiz",
    title: "Neirobiz",
    desc: "AI-сервисы и инструменты для бизнеса.",
    icon: "🤖",
    to: "/neirobiz",
  },
];

function Showcase() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold text-blue-400 mb-8 text-center">Витрина</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {showcaseItems.map((item) => (
          <div
            key={item.key}
            className="bg-neutral-900 rounded-2xl shadow-xl p-8 cursor-pointer flex flex-col items-center hover:shadow-2xl transition active:bg-blue-950"
            onClick={() => navigate(item.to)}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-bold text-blue-200 text-lg mb-2">{item.title}</h3>
            <p className="text-gray-300 text-center text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showcase;
