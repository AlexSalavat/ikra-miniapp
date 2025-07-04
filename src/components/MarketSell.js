import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const offers = [
  {
    id: 1,
    img: '/images/ikr.webp',
    gallery: [
      '/images/ikr.webp',
      '/images/more-i-sol-1.webp',
      '/images/more-i-sol-2.webp',
    ],
    title: 'Икра красная, 1 кг',
    price: '10 500 ₽/кг',
    category: 'Икра',
    company: 'ООО "Море и Соль"',
    desc: 'Свежая лососевая икра высшего качества. Доставка по РФ. Документы, опт и розница.',
    phone: '+7 985 550-57-47',
    volume: '20 кг',
    docs: 'Ветдокументы, декларация, сертификат происхождения',
    region: 'Камчатка',
  },
];

const categories = ['Икра', 'Рыба', 'Краб', 'Морепродукты'];

const MarketSell = () => {
  const [selected, setSelected] = useState('Икра');
  const [modalOffer, setModalOffer] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(0);
  const navigate = useNavigate();

  const filtered = offers.filter((o) => o.category === selected);

  return (
    <div className="bg-black min-h-screen p-4 pt-6">
      <button
        onClick={() => navigate('/market')}
        className="mb-6 px-4 py-2 rounded-xl bg-zinc-800 text-white font-semibold text-xs hover:bg-zinc-700 transition-all"
      >
        ← Назад
      </button>
      <div className="flex gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-3 py-1 rounded-xl font-semibold text-xs transition-all
              ${selected === cat
                ? 'bg-green-500 text-white shadow'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {filtered.map((offer) => (
          <div
            key={offer.id}
            className="bg-zinc-900 rounded-2xl shadow flex flex-row items-center overflow-hidden min-h-[120px] max-h-[136px]"
          >
            <img
              src={offer.img}
              alt={offer.title}
              className="w-28 h-28 object-cover bg-zinc-800"
              style={{ minWidth: 104, minHeight: 104, maxWidth: 116, maxHeight: 116 }}
              onError={e => { e.target.src = '/images/no-image.webp'; }}
            />
            <div className="flex-1 flex flex-col justify-center bg-black px-2 py-1 h-full pl-3">
              <div className="flex flex-col justify-center h-full text-left">
                <div className="font-bold text-white text-xs leading-tight mb-0.5 truncate">{offer.title}</div>
                <div className="flex flex-wrap gap-2 mb-0.5 text-xs items-center leading-tight">
                  <span className="text-white font-bold">Цена: <span className="text-green-400">{offer.price}</span></span>
                  <span className="text-white font-bold">Объем: {offer.volume}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-0.5 text-xs items-center leading-tight">
                  <span className="text-zinc-400">Компания: <span className="text-white">{offer.company}</span></span>
                </div>
                <div className="text-zinc-400 text-xs mb-1 leading-tight">
                  Тел: <a href={`tel:${offer.phone.replace(/\s+/g, '')}`} className="text-sky-400 hover:underline">{offer.phone}</a>
                </div>
                <div className="flex gap-1 mt-0.5">
                  <a
                    href={`tel:${offer.phone.replace(/\s+/g, '')}`}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-2 py-0.5 text-xs font-semibold transition-colors"
                  >
                    Позвонить
                  </a>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-2 py-0.5 text-xs font-semibold transition-colors"
                    onClick={() => { setModalOffer(offer); setPhotoIdx(0); }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center text-zinc-500 mt-10 text-xs">
          Нет объявлений в этой категории.
        </div>
      )}
      {modalOffer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setModalOffer(null)}
        >
          <div
            className="bg-zinc-900 rounded-2xl p-5 shadow-xl max-w-xs w-full flex flex-col gap-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setModalOffer(null)}
            >
              ×
            </button>
            {modalOffer.gallery && modalOffer.gallery.length > 1 ? (
              <div className="mb-2 relative">
                <img
                  src={modalOffer.gallery[photoIdx]}
                  alt={`Фото ${photoIdx + 1}`}
                  className="w-full h-40 object-cover rounded-xl bg-zinc-800"
                  onError={e => { e.target.src = '/images/no-image.webp'; }}
                />
                {photoIdx > 0 && (
                  <button
                    onClick={() => setPhotoIdx(photoIdx - 1)}
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white"
                  >‹</button>
                )}
                {photoIdx < modalOffer.gallery.length - 1 && (
                  <button
                    onClick={() => setPhotoIdx(photoIdx + 1)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white"
                  >›</button>
                )}
              </div>
            ) : (
              <img
                src={modalOffer.img}
                alt={modalOffer.title}
                className="w-full h-40 object-cover rounded-xl mb-2 bg-zinc-800"
                onError={e => { e.target.src = '/images/no-image.webp'; }}
              />
            )}
            <div className="font-bold text-white text-base mb-1">{modalOffer.title}</div>
            <div className="flex gap-2 text-xs text-zinc-300 mb-1 flex-wrap">
              <span className="font-semibold text-green-400">{modalOffer.price}</span>
              <span>· {modalOffer.volume}</span>
            </div>
            <div className="text-zinc-400 text-xs mb-1">Компания: <span className="text-white">{modalOffer.company}</span></div>
            <div className="text-zinc-300 text-xs mb-2">
              <span className="font-semibold text-white">Регион: {modalOffer.region}</span><br />
              {modalOffer.desc}
            </div>
            <div className="text-zinc-400 text-xs mb-2">
              <b>Документы:</b> <span className="text-white">{modalOffer.docs}</span>
            </div>
            <div className="text-zinc-400 text-xs mb-2">Телефон: <a href={`tel:${modalOffer.phone.replace(/\s+/g, '')}`} className="text-sky-400 hover:underline">{modalOffer.phone}</a></div>
            <a
              href={`tel:${modalOffer.phone.replace(/\s+/g, '')}`}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 font-bold text-base text-center shadow transition-colors mt-1"
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
