import React, { useState } from 'react';

const partners = [
  {
    icon: '/images/koryak.jpg', // логотип
    name: 'ООО "Корякморепродукт"',
    city: 'Камчатка',
    role: 'производство',
    type: 'image',
  },
  {
    icon: '🚚',
    name: '"ЕвразияТрансКарго"',
    city: 'Камчатка',
    role: 'логистика',
    type: 'emoji',
  },
];

const CERT_COLORS = {
  'Честный знак': 'bg-blue-600 text-white',
  'Меркурий': 'bg-blue-500 text-white',
};

const CompanyProfile = ({ company }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);

  const mainCerts = (company.certs || []).filter(
    c => c === 'Честный знак' || c === 'Меркурий'
  );
  const otherCerts = (company.certs || []).filter(
    c => c !== 'Честный знак' && c !== 'Меркурий'
  );

  if (!company) {
    return <div className="p-6 text-white">Поставщик не найден</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-36 max-w-2xl mx-auto rounded-2xl shadow-2xl font-sans">
      {/* Верхний блок: логотип + инфа */}
      <div className="flex flex-row items-center mb-6 gap-6">
        {/* Логотип */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src={company.logo}
            alt={company.name}
            className="w-28 h-28 rounded-2xl object-contain bg-zinc-800 shadow-lg border border-zinc-800"
          />
        </div>
        {/* Инфо справа */}
        <div className="flex-1 min-w-0 flex flex-col justify-center items-start gap-2">
          <div className="flex items-center gap-2 flex-wrap w-full">
            <span className="font-bold text-base break-words leading-tight text-white max-w-xs">
              {company.name}
            </span>
            {company.verified && (
              <span className="bg-green-600 text-white rounded px-2 py-0.5 text-[10px] font-semibold select-none whitespace-nowrap">
                Проверенный
              </span>
            )}
            {mainCerts.length > 0 && (
              <span className="flex gap-1 items-center ml-1">
                {mainCerts.map(cert => (
                  <span
                    key={cert}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold select-none whitespace-nowrap ${CERT_COLORS[cert]}`}
                  >
                    {cert}
                  </span>
                ))}
              </span>
            )}
          </div>
          <div className="text-zinc-400 text-sm">
            🌍 {company.region}{company.city && <> · {company.city}</>}
          </div>
          {/* Категории */}
          <div className="flex flex-wrap gap-2">
            {(company.products || []).map(prod => (
              <span
                key={prod}
                className="bg-zinc-800 text-white text-xs rounded-md px-3 py-1 font-medium"
              >
                {prod}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Объемы / сезонность + остальные сертификаты */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        {company.volumes && (
          <div className="text-zinc-400 text-xs">{company.volumes}</div>
        )}
        {otherCerts.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {otherCerts.map(cert => (
              <span
                key={cert}
                className="bg-yellow-300 text-yellow-900 rounded px-2 py-0.5 text-xs font-semibold"
              >
                {cert}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Описание */}
      <div className="mb-4 text-zinc-300 text-base text-center">
        {company.fullDescription && (
          <>
            {showFullDesc || company.fullDescription.length < 140 ? (
              company.fullDescription
            ) : (
              <>
                {company.fullDescription.slice(0, 140)}...{' '}
                <button
                  className="underline text-blue-400"
                  onClick={() => setShowFullDesc(true)}
                >
                  Показать полностью
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Галерея фото */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          {company.gallery.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Фото ${idx + 1}`}
              className="w-28 h-20 object-cover rounded-lg shadow cursor-pointer border border-zinc-800 bg-zinc-900"
              onClick={() => window.open(img, '_blank')}
            />
          ))}
        </div>
      )}

      {/* Наши партнёры - только иконка и текст на чёрном фоне */}
      <div className="mb-6">
        <div className="font-semibold text-base mb-1 text-center">🤝 Наши партнёры</div>
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {partners.map((p, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs bg-black">
              {p.type === 'image' ? (
                <img src={p.icon} alt={p.name} className="w-8 h-8 rounded-full object-cover bg-black border border-zinc-700" />
              ) : (
                <span className="text-2xl">{p.icon}</span>
              )}
              <span className="font-medium text-white whitespace-nowrap text-xs">{p.name}</span>
              <span className="text-zinc-400 whitespace-nowrap text-xs">({p.city})</span>
              <span className="ml-1 text-zinc-400 whitespace-nowrap text-xs">{p.role}</span>
            </div>
          ))}
        </div>
        {/* Кнопка показать всех */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowAllPartners(!showAllPartners)}
            className="mt-1 px-3 py-1 bg-zinc-700 text-white text-xs rounded hover:bg-zinc-600 shadow"
          >
            {showAllPartners ? 'Скрыть список' : 'Показать всех'}
          </button>
        </div>
        {showAllPartners && (
          <div className="mt-2 p-2 text-xs text-center text-zinc-300 bg-zinc-900 rounded-md shadow">
            ООО "Корякморепродукт", ЕвразияТрансКарго и др.
          </div>
        )}
      </div>

      {/* Адрес склада с картой + прайс-лист */}
      <div className="mb-6 flex flex-col md:flex-row gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 items-center w-full md:w-auto">
          <div className="font-semibold text-base mb-1">📍 Адрес склада</div>
          <p className="text-sm text-center">{company.address}</p>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <a
            href="https://yandex.ru/maps/-/CHsNY49G"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 min-w-[160px] bg-blue-600 rounded hover:bg-blue-700 text-white font-semibold text-sm text-center transition-colors"
          >
            Карта
          </a>
          {company.priceList && (
            <a
              href={company.priceList}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 min-w-[160px] bg-yellow-500 text-yellow-900 rounded font-semibold shadow hover:bg-yellow-600 transition-colors text-center"
            >
              Прайс-лист
            </a>
          )}
        </div>
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

      {/* Только кнопка "Стать партнёром" */}
      <div className="fixed left-0 right-0 bottom-0 bg-black pb-4 pt-4 z-50 flex flex-col md:flex-row justify-center items-center gap-2 border-t border-zinc-800">
        <a
          href="https://t.me/your_bot_partner_form"
          target="_blank"
          rel="noopener noreferrer"
          className="w-56 bg-yellow-400 text-yellow-900 font-bold text-base rounded-xl py-3 px-2 text-center shadow-lg hover:bg-yellow-300 transition-colors"
        >
          Стать партнёром
        </a>
      </div>
    </div>
  );
};

export default CompanyProfile;
