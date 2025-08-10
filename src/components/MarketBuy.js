import React from "react";
import { useNavigate } from "react-router-dom";

const exampleBuy = [
  { id: 101, title: "Куплю свежую икру лососевых", quantity: "100–300 кг", desc: "Ищу надёжного поставщика, Самовывоз Владивосток.", contact: "@buyer_fish" },
  { id: 102, title: "Ищу оптом краба, живого/варёного", quantity: "до 1 тонны", desc: "Постоянный контракт, рассмотрю предложения.", contact: "+7 999 888-77-66" },
];

export default function MarketBuy() {
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Забирай!</h2>
          <span className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-3 pt-3 flex flex-col gap-3">
        {exampleBuy.map((item) => (
          <div key={item.id} className="glass-card p-3 border border-white/10 rounded-xl">
            <div className="text-[#3fa6ff] font-semibold text-sm mb-1">{item.title}</div>
            <div className="text-[#88c4ff] font-semibold text-xs mb-1">{item.quantity}</div>
            <div className="text-white/85 text-xs mb-1">{item.desc}</div>
            <div className="text-white/70 text-[11px]">Контакты: {item.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
