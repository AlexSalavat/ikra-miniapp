import React from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Борт полный — забирай!',
    desc: 'Размести предложение и найди покупателей на свой улов.',
    img: '/images/kamc.png',
    link: '/market/sell',
    icon: '📤',
  },
  {
    title: 'На охоте за уловом',
    desc: 'Создай заявку или найди свежие предложения.',
    img: '/images/kam.png',
    link: '/market/buy',
    icon: '🎯',
  },
];

const Market = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-xl flex flex-row gap-4 mt-24 justify-center items-start">
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.link)}
            className="cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col flex-1 min-h-[180px] max-h-[220px]"
            style={{ minWidth: 0 }}
          >
            <div className="relative w-full h-28 sm:h-36 flex items-center justify-center overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover opacity-90"
                loading="lazy"
              />
              <span className="absolute left-2 top-2 text-2xl sm:text-3xl select-none">{card.icon}</span>
            </div>
            <div className="p-3 sm:p-4 flex flex-col gap-1 sm:gap-2 flex-1 justify-between">
              <div className="text-base sm:text-lg font-bold text-white">{card.title}</div>
              <div className="text-zinc-300 text-xs sm:text-sm">{card.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
