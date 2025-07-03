// src/components/CompanyProfile.js

import React from 'react';

const CompanyProfile = ({ company }) => {
  return (
    <div className="bg-black rounded-2xl p-6 max-w-md mx-auto shadow-2xl min-h-screen pb-32 relative text-white">
      {/* Логотип */}
      <div className="flex justify-center mb-6">
        <img
          src={company.logo}
          alt={company.name}
          className="w-20 h-20 rounded-xl object-contain bg-zinc-800 shadow-md"
        />
      </div>

      {/* Название и бейдж */}
      <div className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
        {company.name}
        {company.verified && (
          <span className="bg-green-600 text-white rounded px-2 py-0.5 text-xs font-medium">
            Проверенный
          </span>
        )}
      </div>

      {/* Регион и город */}
      <div className="text-zinc-300 text-base mb-3 text-center">
        <span role="img" aria-label="region">🌍</span> {company.region}
        {company.city && <> · <span>{company.city}</span></>}
      </div>

      {/* Описание */}
      <div className="text-zinc-400 text-base mb-4 text-center">
        {company.fullDescription}
      </div>

      {/* Категории / Продукция */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {(company.products || []).map(prod => (
          <span
            key={prod}
            className="bg-zinc-800 text-white text-xs rounded-md px-3 py-1 font-medium"
          >
            {prod}
          </span>
        ))}
      </div>

      {/* Объёмы / сезонность */}
      {company.volumes && (
        <div className="text-zinc-200 text-sm mb-3 text-center">
          {company.volumes}
        </div>
      )}

      {/* Сертификация */}
      {company.certs && company.certs.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {company.certs.map(cert => (
            <span
              key={cert}
              className="bg-yellow-100 text-yellow-700 rounded px-2 py-0.5 text-xs font-semibold"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Контакты */}
      <div className="text-zinc-300 text-sm mb-5 text-center flex flex-col gap-1 items-center">
        {company.contacts?.telegram && (
          <a
            href={`https://t.me/${company.contacts.telegram.replace('@', '')}`}
            className="text-sky-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        )}
        {company.contacts?.phone && (
          <span>{company.contacts.phone}</span>
        )}
        {company.contacts?.email && (
          <a href={`mailto:${company.contacts.email}`} className="text-zinc-200 hover:underline">
            {company.contacts.email}
          </a>
        )}
      </div>

      {/* Галерея фото */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="flex gap-2 justify-center flex-wrap mb-5">
          {company.gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Фото"
              className="w-20 h-16 object-cover rounded-md shadow cursor-pointer"
              onClick={() => window.open(img, '_blank')}
            />
          ))}
        </div>
      )}

      {/* Прайс-лист */}
      {company.priceList && (
        <div className="mb-5 text-center">
          <a
            href={company.priceList}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline text-sm"
          >
            Скачать прайс-лист
          </a>
        </div>
      )}

      {/* Адрес склада с превью карты и кнопкой */}
      <div className="mb-5 text-center">
        <h3 className="text-white mb-2 font-semibold">📍 Адрес склада</h3>
        {/* Превью карты: положи скриншот карты в public/images/map-preview.png */}
        <a
          href="https://yandex.ru/maps/-/CHsNY49G" // Замени на реальную ссылку
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/map-preview.png"
            alt="Превью карты"
            className="mx-auto rounded-lg shadow-md cursor-pointer"
            style={{ maxWidth: '300px', width: '100%' }}
          />
        </a>
        <a
          href="https://yandex.ru/maps/-/CHsNY49G"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white font-semibold"
        >
          Открыть на Яндекс.Картах
        </a>
      </div>

      {/* Кнопка "Связаться" */}
      <div className="fixed left-0 right-0 bottom-0 bg-black pb-4 pt-4 z-50 flex justify-center border-t border-zinc-800">
        <button className="w-56 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-base rounded-xl py-3 shadow-lg hover:scale-105 transition-all">
          Связаться
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
