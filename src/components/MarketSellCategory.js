// src/components/MarketSellCategory.js
import React, { useState } from "react";

// Пример данных — подключи свои через src/data/
const exampleSell = [
  {
    id: 1,
    title: "Продам красную икру, 500 кг",
    image: "/images/ikra1.webp",
    price: "3200 ₽/кг",
    desc: "Свежий улов, доставка по РФ",
    contact: "+7 900 123-45-67"
  },
  {
    id: 2,
    title: "Рыба Камчатка, опт",
    image: "/images/ryba1.webp",
    price: "от 180 ₽/кг",
    desc: "Горбуша, кижуч, чавыча, отличное качество.",
    contact: "+7 900 000-00-00"
  },
];

function MarketSellCategory() {
  const [items] = useState(exampleSell);

  return (
    <div className="max-w-2xl mx-auto p-3">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Борт полный — объявления о продаже</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.id} className="bg-neutral-900 rounded-2xl p-4 border border-blue-700 shadow hover:bg-blue-950 transition">
            <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl mb-2" />
            <h3 className="font-bold text-blue-200 mb-1">{item.title}</h3>
            <div className="text-blue-400 font-semibold mb-1">{item.price}</div>
            <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
            <div className="text-sm text-blue-300">Контакты: {item.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketSellCategory;
