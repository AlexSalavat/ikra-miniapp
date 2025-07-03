import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    id: 1,
    img: '/images/ikr.jpg',
    title: 'Икра красная, 1 кг',
    price: '10 500 ₽/кг',
    category: 'Икра',
    company: 'ООО "Море и Соль"',
    desc: 'Свежая лососевая икра',
  },
  {
    id: 2,
    img: '/images/fish.jpg',
    title: 'Кета свежемороженая',
    price: '950 ₽/кг',
    category: 'Рыба',
    company: 'ООО "МурманРыба"',
    desc: 'Крупная, опт, доставка',
  },
  {
    id: 3,
    img: '/images/crab.jpg',
    title: 'Краб-стригун',
    price: '4 200 ₽/кг',
    category: 'Краб',
    company: 'ООО "Корякморепродукт"',
    desc: 'С борта, доставка Москва',
  },
  {
    id: 4,
    img: '/images/seafood.jpg',
    title: 'Мидии свежие',
    price: '700 ₽/кг',
    category: 'Морепродукты',
    company: 'ООО "СахалинМоре"',
    desc: 'Вылов июль',
  },
];

const categories = ['Икра', 'Рыба', 'Краб', 'Морепродукты'];

const MarketSell = () => {
  const [selected, setSelected] = useState('Икра');
  const navigate = useNavigate();

  const filtered = offers.filter((o) => o.category === selected);

  return (
    <div className="bg-black min-h-screen p-4 pt-6">
      {/* Кнопка назад */}
      <button
        onClick={() => navigate('/market')}
        className="mb-6 px-4 py-2 rounded-xl bg-zinc-800 text-white font-semibold text-sm hover:bg-zinc-700 transition-all"
      >
        ← Назад
      </button>

      {/* Фильтр категорий */}
      <div className="flex gap-3 justify-center mb-7">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all
              ${selected === cat
                ? 'bg-green-500 text-white shadow'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка объявлений */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((offer) => (
          <div key={offer.id} className="bg-zinc-900 rounded-xl p-2 flex flex-col items-center shadow">
            <img
              src={offer.img}
              alt={offer.title}
              className="w-full h-20 object-cover rounded-lg mb-2 bg-zinc-800"
            />
            <div className="font-bold text-white text-xs mb-1 text-center">{offer.title}</div>
            <div className="text-green-400 font-bold text-xs">{offer.price}</div>
            {/* Показываем компанию вместо категории */}
            <div className="text-zinc-400 text-xs">{offer.company}</div>
            <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 text-xs font-semibold">
              Подробнее
            </button>
          </div>
        ))}
      </div>

      {/* Сообщение если объявлений нет */}
      {filtered.length === 0 && (
        <div className="text-center text-zinc-500 mt-10">
          Нет объявлений в этой категории.
        </div>
      )}
    </div>
  );
};

export default MarketSell;
