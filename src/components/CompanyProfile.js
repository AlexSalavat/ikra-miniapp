import React from 'react';

const CompanyProfile = ({ company }) => {
  return (
    <div className="bg-black text-white min-h-screen p-6 max-w-md mx-auto rounded-xl shadow-xl relative pb-32">
      {/* Логотип */}
      <div className="flex justify-center mb-6">
        <img
          src={company.logo}
          alt={company.name}
          className="w-24 h-24 rounded-xl object-contain bg-zinc-900 shadow-md"
        />
      </div>

      {/* Название + статус */}
      <h1 className="text-2xl font-bold flex items-center justify-center gap-3 mb-2">
        {company.name}
        {company.verified && (
          <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Проверенный
          </span>
        )}
      </h1>

      {/* Краткое описание */}
      <p className="text-center text-zinc-300 mb-4">{company.shortDescription}</p>

      {/* Регион, город, адрес */}
      <p className="text-center mb-4 text-zinc-400 flex flex-col gap-1">
        <span>🌍 {company.region}{company.city ? `, г. ${company.city}` : ''}</span>
        <span>📍 {company.address}</span>
      </p>

      {/* Полное описание */}
      <p className="text-justify mb-6 text-zinc-300">{company.fullDescription}</p>

      {/* Продукты */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {company.products.map((prod) => (
          <span
            key={prod}
            className="bg-zinc-800 text-white px-3 py-1 rounded-full text-sm font-medium"
          >
            {prod}
          </span>
        ))}
      </div>

      {/* Объемы / сезонность */}
      {company.volumes && (
        <p className="text-center text-sm text-zinc-400 mb-6">{company.volumes}</p>
      )}

      {/* Сертификаты */}
      {company.certs && company.certs.length > 0 && (
        <div className="flex justify-center flex-wrap gap-3 mb-6">
          {company.certs.map((cert) => (
            <span
              key={cert}
              className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Галерея */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mb-6">
          {company.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${company.name} photo ${i + 1}`}
              className="w-32 h-20 object-cover rounded-lg shadow-md flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* Контакты */}
      <div className="mb-6 space-y-2 text-center text-sm text-zinc-300">
        {company.contacts.telegram && (
          <a
            href={`https://t.me/${company.contacts.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:underline"
          >
            Telegram
          </a>
        )}
        {company.contacts.phone && <p>{company.contacts.phone}</p>}
        {company.contacts.email && (
          <a
            href={`mailto:${company.contacts.email}`}
            className="hover:underline text-zinc-200"
          >
            {company.contacts.email}
          </a>
        )}
      </div>

      {/* Прайс-лист */}
      {company.priceList && (
        <div className="mb-16 text-center">
          <a
            href={company.priceList}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Скачать прайс-лист
          </a>
        </div>
      )}

      {/* Кнопка "Связаться" */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 flex justify-center shadow-lg z-50">
        <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-16 rounded-xl shadow-lg hover:scale-105 transition-transform">
          Связаться
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
