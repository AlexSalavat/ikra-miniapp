import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const partners = [
  {
    icon: '/images/koryak.webp',
    name: 'ООО "Корякморепродукт"',
    city: 'Камчатка',
    role: 'производство',
    type: 'image',
  },
  {
    icon: '/images/VA.jpg',
    name: 'ООО "Витязь-Авто"',
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

const BADGE_STYLE = 'px-2 py-0.5 rounded text-[11px] font-semibold select-none whitespace-nowrap';

const CompanyProfile = ({ company }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);
  const navigate = useNavigate();

  const otherCerts = (company.certs || []).filter(
    c => c !== 'Честный знак' && c !== 'Меркурий'
  );

  if (!company) {
    return <div className="p-6 text-white">Поставщик не найден</div>;
  }

  const certBadges = ['Честный знак', 'Меркурий'].filter(cert => company.certs?.includes(cert));

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-36 max-w-2xl mx-auto rounded-2xl shadow-2xl font-sans">
      {/* КНОПКА НАЗАД */}
      <button
        onClick={() => navigate('/catalog/suppliers')}
        className="mb-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-5 py-2 text-sm font-semibold shadow transition"
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontSize: '1.2em', marginRight: '4px' }}>←</span>
        Назад к поставщикам
      </button>

      {/* Верхний блок: логотип + инфа */}
      <div className="flex flex-row items-center mb-6 gap-6">
        {/* Логотип */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <picture>
            <source srcSet={company.logo && company.logo.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" />
            <img
              src={company.logo || '/images/no-logo.png'}
              alt={company.name}
              loading="lazy"
              className="w-32 h-32 rounded-2xl object-contain bg-zinc-800 shadow-lg border border-zinc-800"
              onError={e => { e.target.src = '/images/no-logo.png'; }}
            />
          </picture>
        </div>
        {/* Инфо справа */}
        <div className="flex-1 min-w-0 flex flex-col justify-center items-start gap-2">
          <div className="flex items-center gap-2 flex-wrap w-full">
            <span className="font-bold text-base break-words leading-tight text-white max-w-xs">
              {company.name}
            </span>
            {company.verified && (
              <span className={`bg-green-600 text-white ${BADGE_STYLE}`}>
                Проверенный
              </span>
            )}
            {certBadges.length > 0 && (
              <span className="flex gap-1 items-center">
                {certBadges.map(cert => (
                  <span
                    key={cert}
                    className={`${CERT_COLORS[cert]} ${BADGE_STYLE}`}
                  >
                    {cert}
                  </span>
                ))}
              </span>
            )}
          </div>
          <div className="text-zinc-400 text-sm">
            🌍 {company.region}
            {company.city && company.city !== company.region && <> · {company.city}</>}
          </div>
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

      {company.gallery && company.gallery.length > 0 && (
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          {company.gallery.map((img, idx) => (
            <picture key={idx}>
              <source srcSet={img.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" />
              <img
                src={img || '/images/no-image.png'}
                alt={`Фото ${idx + 1}`}
                loading="lazy"
                className="w-28 h-20 object-cover rounded-lg shadow cursor-pointer border border-zinc-800 bg-zinc-900"
                onClick={() => window.open(img, '_blank')}
                onError={e => { e.target.src = '/images/no-image.png'; }}
              />
            </picture>
          ))}
        </div>
      )}

      {/* Наши партнёры */}
      <div className="mb-6">
        <div className="font-semibold text-base mb-1 text-center">
          🤝 Наши партнёры
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 justify-items-start mb-2">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs bg-black"
            >
              {p.type === 'image' ? (
                <img
                  src={p.icon}
                  alt={p.name}
                  className="w-8 h-8 rounded-full object-cover bg-black border border-zinc-700"
                />
              ) : (
                <span className="text-2xl">{p.icon}</span>
              )}
              <span className="font-medium text-white whitespace-nowrap text-xs">
                {p.name}
              </span>
              <span className="text-zinc-400 whitespace-nowrap text-xs">
                ({p.city})
              </span>
              <span className="ml-1 text-zinc-400 whitespace-nowrap text-xs">
                {p.role}
              </span>
            </div>
          ))}
        </div>
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
            ООО "Начикинское", ООО "Камчат-Рыба", ООО "Коль"
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
