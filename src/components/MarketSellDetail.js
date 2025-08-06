import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Моковые данные (пример)
const exampleAds = [
  {
    id: 1,
    title: "Икра кеты солёная, 2024",
    images: [
      "/images/more-i-sol-1.webp",
      "/images/ikra1.webp",
      "/images/ikra2.webp"
    ],
    category: "ikra",
    company: "ООО КамчатИкра",
    region: "Камчатка",
    price: "3200 ₽/кг",
    contact: "+7 900 123-45-67",
    description: "Свежий улов, доставка по РФ. Все документы.",
    documents: ["Меркурий", "Честный знак"],
    warehouse: "Петропавловск-Камчатский, ул. Морская, 5",
    payment: "Безналичный, наличный",
  },
  // ...ещё объявления
];

const CATEGORY_LABELS = {
  ikra: "Икра",
  ryba: "Рыба",
  krab: "Краб",
  mor: "Морепродукты",
};

export default function MarketSellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ad = exampleAds.find(ad => String(ad.id) === String(id));
  if (!ad) return (
    <div className="text-white p-10">Объявление не найдено</div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0a182a] via-[#1b2b40] to-[#221f4c] px-1 pb-10 pt-6">
      {/* Назад */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-[#23df81] font-semibold hover:text-white transition self-start ml-2"
      >
        <svg width="20" height="20" fill="none">
          <path d="M13 5l-5 5 5 5" stroke="#23df81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-4 relative">
        {/* Галерея фото — свайп */}
        <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{ borderRadius: 18 }}
          >
            {ad.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={ad.title}
                  className="w-full h-full object-cover rounded-xl"
                  onError={e => { e.target.src = '/images/no-image.webp'; }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Категория и цена */}
        <div className="flex items-center justify-between mb-2">
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow">
            {CATEGORY_LABELS[ad.category]}
          </span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            {ad.price}
          </span>
        </div>
        {/* Название */}
        <div className="text-xl text-white font-bold mb-2">{ad.title}</div>
        {/* Описание */}
        <div className="text-base text-white/90 mb-3">{ad.description}</div>
        {/* Компания и регион */}
        <div className="text-sm text-white/70 mb-2">{ad.company}{ad.region ? ` · ${ad.region}` : ""}</div>
        {/* Склад */}
        {ad.warehouse && (
          <div className="text-xs text-[#8fe3b9] mb-2">Склад: {ad.warehouse}</div>
        )}
        {/* Оплата */}
        {ad.payment && (
          <div className="text-xs text-[#bbffcc] mb-2">Оплата: {ad.payment}</div>
        )}
        {/* Документы */}
        {ad.documents && ad.documents.length > 0 && (
          <div className="flex gap-2 items-center text-xs text-blue-200 mb-3">
            {ad.documents.map((doc, i) => (
              <span key={i} className="bg-blue-900/50 px-3 py-1 rounded-full">
                📄 {doc}
              </span>
            ))}
          </div>
        )}
        {/* Контакты */}
        {ad.contact && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <a
              href={`tel:${ad.contact.replace(/[^+\d]/g, '')}`}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl py-3 shadow-lg hover:scale-105 transition text-base"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 2 4.18 2 2 0 0 1 4 2.09h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.18-1.18a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Позвонить: {ad.contact}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
