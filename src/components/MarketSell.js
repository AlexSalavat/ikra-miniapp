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
    desc: 'Свежая лососевая икра высшего качества. Доставка по РФ. Готовы предоставить документы, опт и розница.',
    phone: '+7 985 550-57-47',
    volume: '20 кг',
    docs: 'Ветеринарные, декларация, чек, сертификат происхождения',
    region: 'Камчатка',
  },
  // Добавляй ещё!
];

const categories = ['Икра', 'Рыба', 'Краб', 'Морепродукты'];

const MarketSell = () => {
  const [selected, setSelected] = useState('Икра');
  const [modalOffer, setModalOffer] = useState(null);
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

      {/* Список объявлений */}
      <div className="flex flex-col gap-4">
        {filtered.map((offer) => (
          <div
            key={offer.id}
            className="bg-zinc-900 rounded-2xl flex flex-row items-stretch shadow w-full overflow-hidden"
          >
            {/* Фото слева */}
            <div className="flex-shrink-0 flex items-stretch">
              <img
                src={offer.img}
                alt={offer.title}
                className="w-28 h-full object-cover bg-zinc-800"
                style={{ minHeight: 112, maxHeight: 148 }}
              />
            </div>
            {/* Инфо справа */}
            <div className="flex-1 bg-black flex flex-col justify-between p-3 gap-1 min-h-[7rem]">
              <div>
                <div className="font-bold text-white text-base mb-1">{offer.title}</div>
                <div className="flex flex-wrap gap-3 mb-2">
                  <span className="text-white font-bold text-sm">Цена: <span className="text-green-400">{offer.price}</span></span>
                  <span className="text-white font-bold text-sm">Объем: {offer.volume}</span>
                  <span className="text-white font-bold text-sm">Регион: {offer.region}</span>
                </div>
                <div className="text-zinc-400 text-xs mb-1">
                  Компания: <span className="text-white">{offer.company}</span>
                </div>
                <div className="text-zinc-400 text-xs mb-2">
                  Телефон: <a href={`tel:${offer.phone.replace(/\s+/g, '')}`} className="text-sky-400 hover:underline">{offer.phone}</a>
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                <a
                  href={`tel:${offer.phone.replace(/\s+/g, '')}`}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-1 text-xs font-semibold transition-colors"
                >
                  Позвонить
                </a>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 text-xs font-semibold transition-colors"
                  onClick={() => setModalOffer(offer)}
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Сообщение если объявлений нет */}
      {filtered.length === 0 && (
        <div className="text-center text-zinc-500 mt-10">
          Нет объявлений в этой категории.
        </div>
      )}

      {/* Модальное окно: описание и документы */}
      {modalOffer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setModalOffer(null)}
        >
          <div
            className="bg-zinc-900 rounded-2xl p-6 shadow-xl max-w-sm w-full flex flex-col gap-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setModalOffer(null)}
            >
              ×
            </button>
            <img
              src={modalOffer.img}
              alt={modalOffer.title}
              className="w-full h-40 object-cover rounded-xl mb-2 bg-zinc-800"
            />
            <div className="font-bold text-white text-lg mb-1">{modalOffer.title}</div>
            <div className="flex gap-2 text-sm text-zinc-300 mb-1">
              <span className="font-semibold text-green-400">{modalOffer.price}</span>
              <span>· {modalOffer.volume}</span>
              <span>· {modalOffer.region}</span>
            </div>
            <div className="text-zinc-400 text-sm mb-1">Компания: <span className="text-white">{modalOffer.company}</span></div>
            {/* Описание товара */}
            <div className="text-zinc-300 text-sm mb-2">{modalOffer.desc}</div>
            {/* Документы */}
            <div className="text-zinc-400 text-xs mb-2">
              <b>Документы:</b> <span className="text-white">{modalOffer.docs}</span>
            </div>
            {/* Телефон */}
            <div className="text-zinc-400 text-sm mb-2">Телефон: <a href={`tel:${modalOffer.phone.replace(/\s+/g, '')}`} className="text-sky-400 hover:underline">{modalOffer.phone}</a></div>
            <a
              href={`tel:${modalOffer.phone.replace(/\s+/g, '')}`}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-bold text-base text-center shadow transition-colors mt-2"
            >
              Позвонить
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketSell;
