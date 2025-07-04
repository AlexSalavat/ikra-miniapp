import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import partners from '../data/partners';
import PartnersList from './PartnersList';

const CERT_COLORS = {
  'Честный знак': 'bg-blue-600 text-white',
  'Меркурий': 'bg-blue-500 text-white',
};
const BADGE_STYLE = 'px-2 py-0.5 rounded text-[11px] font-semibold select-none whitespace-nowrap';

const CompanyProfile = ({ company }) => {
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const navigate = useNavigate();

  const certBadges = ['Честный знак', 'Меркурий'].filter(cert => company.certs?.includes(cert));

  // Для description с возможностью "Показать полностью"
  const shortDesc =
    company.fullDescription.length > 160 && !showFullDesc
      ? company.fullDescription.slice(0, 160) + '...'
      : company.fullDescription;

  return (
    <div className="bg-black text-white min-h-screen p-4 pb-36 max-w-2xl mx-auto rounded-2xl shadow-2xl font-sans">
      <div className="mb-3">
        <button
          onClick={() => navigate('/catalog/suppliers')}
          className="px-4 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold mb-2"
        >
          ← Назад
        </button>
      </div>
      <div className="flex flex-row items-center mb-6 gap-6">
        <div className="flex-shrink-0 flex items-center justify-center">
          <div style={{
            width: 90,
            height: 90,
            background: '#fff',
            borderRadius: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 1.5px 7px #2226',
            border: '1.5px solid #eee',
          }}>
            <img
              src={company.logo || '/images/no-logo.webp'}
              alt={company.name}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: '#eee'
              }}
              onError={e => { e.target.src = '/images/no-logo.webp'; }}
            />
          </div>
        </div>
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

      {/* Объемы поставок / сезонность */}
      {company.volumes && (
        <div className="mb-2 text-sm text-zinc-300">
          {company.volumes}
        </div>
      )}

      {/* Описание с кнопкой "Показать полностью" */}
      <div className="mb-3">
        <div className="text-white text-base font-semibold mb-1">О компании</div>
        <div className="text-zinc-300 text-sm">
          {shortDesc}
          {company.fullDescription.length > 160 && (
            <button
              onClick={() => setShowFullDesc(v => !v)}
              className="text-blue-400 underline ml-2"
            >
              {showFullDesc ? 'Скрыть' : 'Показать полностью'}
            </button>
          )}
        </div>
      </div>

      {/* Галерея */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2">
            {company.gallery.map((img, idx) => (
              <img key={idx} src={img} alt="" className="w-24 h-24 rounded-lg object-cover bg-zinc-700" onError={e => { e.target.src = '/images/no-image.webp'; }} />
            ))}
          </div>
        </div>
      )}

      {/* Партнеры */}
      <PartnersList partners={partners} showAll={showAllPartners} onToggleAll={() => setShowAllPartners(!showAllPartners)} />

      {/* Адрес и кнопки */}
      <div className="mb-2 text-base text-zinc-300 mt-5">
        <div style={{ fontWeight: 600, color: '#fff', fontSize: 18, marginBottom: 3 }}>📍 Адрес склада</div>
        {company.address && (
          <div style={{ marginBottom: 10, color: '#fff' }}>{company.address}</div>
        )}
        <div className="flex gap-3 mb-4 mt-2">
          {company.mapUrl && (
            <a href={company.mapUrl} target="_blank" rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow text-sm font-semibold transition-colors"
            >
              Карта
            </a>
          )}
          {company.priceList && (
            <a href={company.priceList} target="_blank" rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg shadow text-sm font-semibold transition-colors"
            >
              Прайс-лист
            </a>
          )}
        </div>
      </div>

      {/* Контакты */}
      <div className="mb-4 text-base text-zinc-300">
        {company.contacts?.telegram && (
          <div>Telegram: <a href={`https://t.me/${company.contacts.telegram.replace('@', '')}`} className="text-sky-400 hover:underline" target="_blank" rel="noreferrer">{company.contacts.telegram}</a></div>
        )}
        {company.contacts?.phone && (
          <div>Телефон: <a href={`tel:${company.contacts.phone.replace(/\s+/g, '')}`} className="text-sky-400 hover:underline">{company.contacts.phone}</a></div>
        )}
        {company.contacts?.email && (
          <div>{company.contacts.email}</div>
        )}
      </div>

      {/* Стать партнёром */}
      <div className="flex justify-center">
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2 rounded-lg shadow text-base font-semibold transition-colors">
          Стать партнёром
        </button>
      </div>
    </div>
  );
};

export default CompanyProfile;
