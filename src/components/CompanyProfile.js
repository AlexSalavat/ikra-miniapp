// src/components/CompanyProfile.js

import React from 'react';

const CompanyProfile = ({ company }) => {
  // Формируем ссылку на карту (Яндекс) по адресу
  const getMapLink = () => {
    if (company.address) {
      return `https://yandex.ru/maps/?text=${encodeURIComponent(company.address)}`;
    }
    return null;
  };

  return (
    <div className="bg-black min-h-screen pb-28 px-3 pt-6 max-w-md mx-auto relative">
      {/* Логотип */}
      <div className="flex justify-center mb-3">
        <img
          src={company.logo}
          alt={company.name}
          className="w-16 h-16 rounded-lg object-contain bg-zinc-800 shadow"
          style={{ maxWidth: 64, maxHeight: 64 }}
        />
      </div>

      {/* Название и статус */}
      <div className="text-xl font-bold text-white flex items-center gap-2 justify-center mb-1">
        {company.name}
        {company.verified && (
          <span className="bg-green-500 text-white rounded px-2 py-0.5 text-xs font-medium flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#fff"/><path d="M6.6 10.2L4.8 8.4 4 9.2l2.6 2.6 5-5-.8-.8-4.2 4.2z" fill="#22c55e"/></svg>
            Проверенный
          </span>
        )}
      </div>

      {/* Слоган / Описание */}
      {company.shortDescription && (
        <div className="text-zinc-300 text-sm mb-2 text-center">{company.shortDescription}</div>
      )}

      {/* Регион / адрес */}
      <div className="text-zinc-400 text-xs mb-3 text-center flex flex-col items-center gap-1">
        <div>
          <span role="img" aria-label="region">🌍</span> {company.region}
          {company.city && <> · <span>{company.city}</span></>}
        </div>
        {company.address && (
          <div>
            <span>{company.address}</span>
            {getMapLink() && (
              <a
                href={getMapLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sky-400 underline"
              >
                Показать на карте
              </a>
            )}
          </div>
        )}
      </div>

      {/* Полное описание */}
      {company.fullDescription && (
        <div className="text-zinc-200 text-sm mb-3 text-center leading-snug">
          {company.fullDescription}
        </div>
      )}

      {/* Категории продукции */}
      {(company.products || []).length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {(company.products || []).map(prod => (
            <span
              key={prod}
              className="bg-zinc-800 text-white text-xs rounded-md px-2 py-0.5 font-medium"
            >
              {prod}
            </span>
          ))}
        </div>
      )}

      {/* Сертификация */}
      {(company.certificates || company.certs) && ((company.certificates && company.certificates.length > 0) || (company.certs && company.certs.length > 0)) && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {((company.certificates && company.certificates.length > 0 ? company.certificates : company.certs) || []).map(cert => (
            <span
              key={cert}
              className="bg-yellow-100 text-yellow-700 rounded px-2 py-0.5 text-xs font-semibold"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Галерея фото/видео */}
      {(company.gallery || []).length > 0 && (
        <div className="flex gap-2 justify-center flex-wrap mb-2">
          {company.gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Фото"
              className="w-16 h-12 object-cover rounded shadow"
            />
          ))}
        </div>
      )}

      {/* Объёмы / сезонность */}
      {(company.volumes || company.season) && (
        <div className="text-zinc-400 text-xs mb-2 text-center">
          {company.volumes && <span>Объём: {company.volumes}</span>}
          {company.season && <span className="ml-2">Сезон: {company.season}</span>}
        </div>
      )}

      {/* Акция / промо */}
      {company.promo && (
        <div className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded mb-2 text-center shadow">
          🎁 {company.promo}
        </div>
      )}

      {/* Бизнес-достижения */}
      {(company.achievements || []).length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {company.achievements.map((a, idx) => (
            <span
              key={idx}
              className="bg-zinc-800 text-yellow-300 text-xs rounded-md px-2 py-0.5 font-medium"
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Контакты */}
      <div className="text-white text-xs mb-3 text-center flex flex-col gap-1 items-center">
        {company.contacts?.telegram && (
          <a
            href={`https://t.me/${company.contacts.telegram.replace(/^@/, '')}`}
            className="text-sky-400 hover:underline"
            target="_blank" rel="noopener noreferrer"
          >
            Telegram
          </a>
        )}
        {company.contacts?.phone && (
          <a href={`tel:${company.contacts.phone.replace(/[^+\d]/g, '')}`} className="hover:underline">{company.contacts.phone}</a>
        )}
        {company.contacts?.email && (
          <a href={`mailto:${company.contacts.email}`} className="hover:underline">
            {company.contacts.email}
          </a>
        )}
        {company.contacts?.website && (
          <a href={company.contacts.website} className="text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">
            Сайт
          </a>
        )}
      </div>

      {/* Прайс-лист */}
      {company.priceList && (
        <div className="mb-3 text-center">
          <a
            href={company.priceList}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-200 underline text-xs"
          >
            Скачать прайс-лист
          </a>
        </div>
      )}

      {/* Кнопка "Связаться" */}
      <div className="fixed left-0 right-0 bottom-0 bg-black pb-4 pt-4 z-50 flex justify-center border-t border-zinc-800">
        <button
          onClick={() => {
            if (company.contacts?.telegram) {
              window.open(`https://t.me/${company.contacts.telegram.replace(/^@/, '')}`, '_blank');
            } else if (company.contacts?.phone) {
              window.open(`tel:${company.contacts.phone.replace(/[^+\d]/g, '')}`);
            }
          }}
          className="w-48 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-base rounded-xl py-3 shadow-lg hover:scale-105 transition-all"
        >
          Связаться
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
