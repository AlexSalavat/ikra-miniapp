import React from 'react';

const CompanyProfile = ({ company }) => {
  if (!company) {
    return <div className="p-6 text-white">Поставщик не найден</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-32 max-w-md mx-auto rounded-2xl shadow-2xl relative font-sans">
      {/* Логотип */}
      <div className="flex justify-center mb-5">
        <img
          src={company.logo}
          alt={company.name}
          className="w-24 h-24 rounded-xl object-contain bg-zinc-800 shadow-md"
        />
      </div>

      {/* Название и бейдж */}
      <div className="text-xl font-semibold mb-2 flex items-center justify-center gap-3 break-words text-center leading-tight max-w-xs mx-auto">
        {company.name}
        {company.verified && (
          <span className="bg-green-600 text-white rounded px-2 py-0.5 text-xs font-semibold select-none">
            Проверенный
          </span>
        )}
      </div>

      {/* Регион и город */}
      <div className="text-zinc-400 text-base mb-3 text-center">
        🌍 {company.region}
        {company.city && <> · {company.city}</>}
      </div>

      {/* Описание */}
      <p className="text-zinc-300 text-base mb-5 whitespace-pre-line text-center">{company.fullDescription}</p>

      {/* Категории / Продукция */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
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
        <div className="text-zinc-400 text-sm mb-4 text-center">{company.volumes}</div>
      )}

      {/* Сертификация */}
      {company.certs && company.certs.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {company.certs.map(cert => (
            <span
              key={cert}
              className="bg-yellow-300 text-yellow-900 rounded px-2 py-0.5 text-xs font-semibold"
            >
              {cert}
            </span>
          ))}
        </div>
      )}

      {/* Адрес склада с ссылкой на карту */}
      <div className="mb-5 text-center">
        <h3 className="text-white mb-1 font-semibold text-base">📍 Адрес склада</h3>
        <p className="text-sm">{company.address}</p>
        <a
          href="https://yandex.ru/maps/-/CHsNY49G"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white font-semibold text-sm"
        >
          Открыть на Яндекс.Картах
        </a>
      </div>

      {/* Контакты */}
      <div className="text-zinc-300 text-sm mb-6 text-center flex flex-col gap-2 items-center">
        {company.contacts?.telegram && (
          <a
            href={`https://t.me/${company.contacts.telegram.replace(/^@/, '')}`}
            className="text-sky-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram: {company.contacts.telegram}
          </a>
        )}
        {company.contacts?.phone && <span>Телефон: {company.contacts.phone}</span>}
        {company.contacts?.email && (
          <a href={`mailto:${company.contacts.email}`} className="text-zinc-200 hover:underline">
            {company.contacts.email}
          </a>
        )}
      </div>

      {/* Галерея фото */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="flex gap-3 justify-center flex-wrap mb-10">
          {company.gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Фото ${idx + 1}`}
              className="w-24 h-20 object-cover rounded-md shadow cursor-pointer"
              onClick={() => window.open(img, '_blank')}
            />
          ))}
        </div>
      )}

      {/* Кнопка "Связаться" */}
      <div className="fixed left-0 right-0 bottom-0 bg-black pb-4 pt-4 z-50 flex justify-center border-t border-zinc-800">
        <button
          onClick={() => {
            if (company.contacts?.telegram) {
              window.open(`https://t.me/${company.contacts.telegram.replace(/^@/, '')}`, '_blank');
            }
          }}
          className="w-56 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-base rounded-xl py-3 shadow-lg hover:scale-105 transition-transform"
        >
          Связаться
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
