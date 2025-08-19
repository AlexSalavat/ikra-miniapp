// src/components/ProducerDetail.js
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducer } from '../lib/useProducers';

// helpers
const getInitials = (name = '') =>
  String(name || '')
    .replace(/["«»]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '??';

const stringHue = (s = '') => {
  let h = 0;
  const str = String(s || '');
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
};

// приведение типов
const asStr = (v, def = '') => (typeof v === 'string' ? v : def);
const asStrArr = (v) =>
  Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()) : [];
const asObj = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});

export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producer, loading, error } = useProducer(id);

  const Header = (
    <div className="sticky top-0 z-20 w-full bg-black/75 backdrop-blur-md border-b border-white/10">
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
        <h2 className="ml-auto mr-auto text-white font-bold text-lg">Производитель</h2>
        <span className="w-16" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="bg-black min-h-screen pb-24">
        {Header}
        <div className="max-w-md mx-auto px-4 pt-6 text-red-400">
          Ошибка загрузки: {String(error?.message || error)}
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="bg-black min-h-screen pb-24">
        {Header}
        <div className="max-w-md mx-auto px-4 pt-6 text-white/80">Загрузка…</div>
      </div>
    );
  }
  if (!producer) {
    return (
      <div className="bg-black min-h-screen pb-24">
        {Header}
        <div className="max-w-md mx-auto px-4 pt-6 text-white/80">Производитель не найден</div>
      </div>
    );
  }

  // — безопасно нормализуем всё, НИЧЕГО не мапим —
  const name = asStr(producer.name, 'Без названия');
  const region = asStr(producer.region);
  const logo = asStr(producer.logo);
  const description = asStr(producer.description);
  const fullDescription = asStr(producer.fullDescription);
  const address = asStr(producer.address);
  const site = asStr(producer.site);
  const categories = asStrArr(producer.categories);
  const badges = asStrArr(producer.badges);
  const gallery = asStrArr(producer.gallery);
  const exportMarkets = asStrArr(producer.exportMarkets);
  const contacts = asObj(producer.contacts);
  const founded =
    typeof producer.founded === 'number' || typeof producer.founded === 'string'
      ? String(producer.founded)
      : undefined;
  const productionCapacity = asStr(producer.productionCapacity);

  const bgInitials = useMemo(() => {
    const h = stringHue(name || region || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .95),hsl(${(h + 40) % 360} 80% 30% / .95))`;
  }, [name, region]);

  const banner =
    (gallery.length && gallery[0]) || (logo && logo.trim() ? logo : '') || '';

  const contactValues = Object.values(contacts);
  const phones = contactValues.filter(
    (v) => typeof v === 'string' && /^[-+()0-9\s]{7,}$/.test(v)
  );
  const emails = contactValues.filter((v) => typeof v === 'string' && v.includes('@'));
  const safeSite = site ? (site.startsWith('http') ? site : `https://${site}`) : null;

  return (
    <div className="bg-black min-h-screen pb-24">
      {Header}

      <div className="max-w-md mx-auto px-3 pt-3 space-y-3">
        {/* Баннер — только одна картинка или фон-инициалы */}
        <div className="glass-card p-2">
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
            <div className="w-full aspect-[16/10] bg-black/40">
              {banner ? (
                <img
                  loading="lazy"
                  src={banner}
                  alt={`${name} баннер`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full" style={{ background: bgInitials }} />
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
              <div className="text-white font-extrabold text-[18px] leading-tight">
                {name}
              </div>
              {region && (
                <div className="mt-1 text-white/80 text-sm">{region}</div>
              )}
            </div>
          </div>
        </div>

        {/* Лого + краткая инфа */}
        <div className="glass-card p-3">
          <div className="grid grid-cols-[92px,1fr] gap-3 items-start">
            <div className="relative w-[92px] h-[92px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 grid place-items-center">
              {logo ? (
                <img
                  loading="lazy"
                  src={logo}
                  alt={name}
                  className="w-[86%] h-[86%] object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div
                  className="w-full h-full grid place-items-center text-white font-extrabold text-xl"
                  style={{ background: bgInitials }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              {founded && (
                <div className="text-white/80 text-sm">Основано: {founded}</div>
              )}
              {productionCapacity && (
                <div className="text-white/80 text-sm">
                  Мощность: {productionCapacity}
                </div>
              )}
              {exportMarkets.length > 0 && (
                <div className="text-white/80 text-sm">
                  Экспорт: {exportMarkets.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {(fullDescription || description) && (
          <div className="glass-card p-3">
            <div className="text-white font-semibold text-[15px] mb-1">О компании</div>
            <div className="text-white/90 text-[14px] leading-relaxed">
              {fullDescription || description}
            </div>
          </div>
        )}

        {(phones.length > 0 || emails.length > 0) && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-2">Контакты</div>
            <div className="grid grid-cols-2 gap-2">
              {phones[0] && (
                <a
                  href={`tel:${phones[0].replace(/[^+\d]/g, '')}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  📞 Позвонить
                </a>
              )}
              {emails[0] && (
                <a
                  href={`mailto:${emails[0]}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  ✉️ Написать
                </a>
              )}
            </div>
          </div>
        )}

        {address && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-1">Адрес</div>
            <div className="text-white font-medium text-[14px]">{address}</div>
          </div>
        )}

        {safeSite && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-1">Сайт</div>
            <a
              href={safeSite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[rgba(59,175,218,0.95)] font-bold"
            >
              🔗 {safeSite.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {/* Отладка: посмотреть реальные данные, которые пришли */}
        <details className="glass-card p-3">
          <summary className="cursor-pointer text-white/80 text-sm">Отладка данных</summary>
          <pre className="mt-2 text-[11px] text-white/80 whitespace-pre-wrap break-words">
{JSON.stringify(producer, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
