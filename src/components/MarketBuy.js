// src/components/MarketBuy.js
import React, { useState } from "react";

const exampleBuy = [
  {
    id: 101,
    title: "Куплю свежую икру лососевых",
    quantity: "100-300 кг",
    desc: "Ищу надёжного поставщика, Самовывоз Владивосток.",
    contact: "@buyer_fish"
  },
  {
    id: 102,
    title: "Ищу оптом краба, живого/варёного",
    quantity: "до 1 тонны",
    desc: "Постоянный контракт, рассмотрю предложения.",
    contact: "+7 999 888-77-66"
  },
];

function MarketBuy() {
  const [items] = useState(exampleBuy);

  return (
    <div className="max-w-2xl mx-auto p-3">
      <h2 className="text-xl font-bold text-blue-400 mb-4">На охоте за уловом — ищу товар</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.id} className="bg-neutral-900 rounded-2xl p-4 border border-blue-700 shadow hover:bg-blue-950 transition">
            <h3 className="font-bold text-blue-200 mb-1">{item.title}</h3>
            <div className="text-blue-400 font-semibold mb-1">{item.quantity}</div>
            <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
            <div className="text-sm text-blue-300">Контакты: {item.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketBuy;
