import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
const exampleAds = [
  {
    id: 1,
    title: 'Икра кеты солёная, 2024',
    images: ['/images/more-i-sol-1.webp', '/images/ikra1.webp', '/images/ikra2.webp'],
    category: 'ikra',
    company: 'ООО КамчатИкра',
    region: 'Камчатка',
    price: '3 200 ₽/кг',
    contact: '+7 900 123-45-67',
    description: 'Свежий улов, доставка по РФ. Все документы.',
    documents: ['Меркурий', 'Честный знак'],
    warehouse: 'Петропавловск-Камчатский, ул. Морская, 5',
    payment: 'Безналичный, наличный',
    verified: true,
    premium: true,
  },
];

const CATEGORY_LABELS = { ikra: 'Икра', ryba: 'Рыба', krab: 'Краб', mor: 'Морепродукты' };

export default function MarketSellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = exampleAds.find((x) => String(x.id) === String(id));
  if (!ad) return <div className="bg-black text-white p-8">Объявление не найдено</div>;

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
          >
            <svg width="20" height="20" fill="none">
              <path
                d="M13 5l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">Назад</span>
          </button>
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">
            {CATEGORY_LABELS[ad.category]}
          </h2>
          <span className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-3 pt-3">
        <div className={`glass-card p-3 ${ad.premium ? 'premium' : ''}`}>
          {/* Gallery */}
          <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 mb-3">
            <Swiper spaceBetween={12} slidesPerView={1} style={{ borderRadius: 12 }}>
              {(ad.images?.length ? ad.images : ['/images/no-image.webp']).map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    loading="lazy"
                    src={src}
                    alt={`${ad.title} ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/no-image.webp';
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* badges */}
            {ad.verified && (
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold text-white border border-white/20 bg-green-600/70 backdrop-blur-sm">
                  ✅ Проверенный
                </span>
              </div>
            )}
            {ad.premium && (
              <div
                className="absolute top-2 right-2 w-6 h-6 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm"
                title="Premium"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgb(59,175,218)">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
                </svg>
              </div>
            )}
          </div>

          {/* Main info */}
          <div className="flex items-center justify-between mb-2">
            <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
              {ad.company}
              {ad.region ? ` · ${ad.region}` : ''}
            </span>
            <span className="text-lg font-extrabold text-white">{ad.price}</span>
          </div>

          <div className="text-white font-bold text-base mb-1">{ad.title}</div>
          <div className="text-white/90 text-sm mb-3">{ad.description}</div>

          {ad.warehouse && <div className="text-xs text-[#8fe3b9] mb-2">Склад: {ad.warehouse}</div>}
          {ad.payment && <div className="text-xs text-[#bbffcc] mb-2">Оплата: {ad.payment}</div>}

          {ad.documents?.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center text-xs text-blue-200 mb-3">
              {ad.documents.map((doc, i) => (
                <span
                  key={i}
                  className="bg-blue-900/40 px-3 py-1 rounded-full border border-white/10"
                >
                  📄 {doc}
                </span>
              ))}
            </div>
          )}

          {ad.contact && (
            <a
              href={`tel:${ad.contact.replace(/[^+\d]/g, '')}`}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-[rgba(59,175,218,.9)] hover:bg-[rgba(59,175,218,1)] text-white font-bold rounded-xl py-3 shadow-lg transition text-base"
            >
              Позвонить: {ad.contact}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
