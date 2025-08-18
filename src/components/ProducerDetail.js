import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducer } from '../lib/useProducers';

const getInitials = (name = '') =>
  (name || '')
    .replace(/["]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '??';

const stringHue = (s = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

const BADGE_INFO = {
  Проверенный: 'Контакты и документы подтверждены.',
  'Честный знак': 'Государственная система маркировки.',
  Меркурий: 'Электронные ветсертификаты (РСХН).',
};

export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producer, loading, error } = useProducer(id);

  const {
    name = '',
    region = '',
    address = '',
    logo,
    description = '',
    fullDescription = '',
    site = '',
    contacts = {},
    badges = [],
    gallery = [],
    categories = [],
    productionCapacity = '',
    exportMarkets = [],
    founded,
  } = producer || {};

  const initialsBG = useMemo(() => {
    const h = stringHue(name || region || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .95),hsl(${(h + 40) % 360} 80% 30% / .95))`;
  }, [name, region]);

  const phone = contacts?.phone || '';
  const email = contacts?.email || '';
  const tel = phone ? `tel:${phone.replace(/[^\d+]/g, '').replace(/^8/, '+7')}` : '';
  const mailto = email ? `mailto:${email}` : '';
  const images = (Array.isArray(gallery) && gallery.length ? gallery : logo ? [logo] : []).slice(
    0,
    12
  );

  if (loading) {
    return <div className="max-w-md mx-auto px-3 pt-6 text-white/80">Загрузка</div>;
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto px-3 pt-6 text-red-400">
        Ошибка: {String(error.message || error)}
      </div>
    );
  }
  if (!producer) {
    return <div className="max-w-md mx-auto px-3 pt-6 text-white/90">Производитель не найден</div>;
  }

  return (
    <div className="bg-black min-h-screen pb-24">
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

      <div className="max-w-md mx-auto px-3 pt-3 space-y-3">
        <div className="glass-card p-2">
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
            <div className="w-full aspect-[16/10] bg-black/35">
              {images.length ? (
                <img
                  loading="lazy"
                  src={images[0]}
                  alt={`${name} баннер`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/no-image.webp';
                  }}
                />
              ) : (
                <div className="w-full h-full" style={{ background: initialsBG }} />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
              <div className="text-white font-extrabold text-[18px] leading-tight">{name}</div>
              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                {badges?.includes('Проверенный') && (
                  <BadgeHint color="green" label="Проверенный" hint={BADGE_INFO['Проверенный']} />
                )}
                {badges?.map((b, i) => (
                  <BadgeHint
                    key={i}
                    color={b === 'Честный знак' || b === 'Меркурий' ? 'blue' : 'gray'}
                    label={b}
                    hint={BADGE_INFO[b]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-3">
          <div className="grid grid-cols-[92px,1fr] gap-3 items-start">
            <div className="relative w-[92px] h-[92px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 grid place-items-center">
              {logo ? (
                <img
                  loading="lazy"
                  src={logo}
                  alt={name}
                  className="w-[86%] h-[86%] object-contain img-fade-in"
                  onError={(e) => e.currentTarget.remove()}
                />
              ) : (
                <div
                  className="w-full h-full grid place-items-center text-white font-extrabold text-xl"
                  style={{ background: initialsBG }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              {region && (
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                  <span className="truncate">{region}</span>
                </div>
              )}
              {!!categories?.length && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {categories.slice(0, 4).map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/10 backdrop-blur-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {(description || fullDescription) && (
            <div className="mt-2 text-white/90 text-[14px] leading-relaxed">
              {fullDescription || description}
            </div>
          )}

          <div className="mt-2 grid grid-cols-2 gap-2 text-white/90 text-[13px]">
            {typeof founded !== 'undefined' && (
              <Fact icon="" title="Основано" value={String(founded)} />
            )}
            {productionCapacity && <Fact icon="" title="Мощность" value={productionCapacity} />}
            {!!exportMarkets?.length && (
              <Fact
                icon=""
                title="Экспорт"
                value={exportMarkets.slice(0, 3).join(', ') + (exportMarkets.length > 3 ? '' : '')}
              />
            )}
          </div>
        </div>

        {(phone || email) && (
          <div className="glass-card p-3">
            <div className="grid grid-cols-2 gap-2">
              {tel && (
                <a
                  href={tel}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  Позвонить
                </a>
              )}
              {mailto && (
                <a
                  href={mailto}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  Написать
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

        {site && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-1">Сайт</div>
            <a
              href={site.startsWith('http') ? site : `https://${site}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[rgba(59,175,218,0.95)] font-bold"
            >
              Открыть сайт
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function BadgeHint({ label, hint, color = 'gray' }) {
  const base = 'px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm border';
  const palette =
    color === 'green'
      ? 'text-white bg-green-600/60 border-white/20'
      : color === 'blue'
        ? 'text-white bg-[rgba(59,175,218,0.6)] border-[rgba(255,255,255,0.25)]'
        : 'text-white/90 bg-white/10 border-white/20';

  return (
    <span className={`${base} ${palette}`} title={hint || label}>
      {label}
    </span>
  );
}

function Fact({ icon, title, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm px-2 py-1.5">
      <div className="text-white/70 text-[10px] flex items-center gap-1">
        <span className="text-[12px]">{icon}</span>
        <span>{title}</span>
      </div>
      <div className="text-white font-semibold text-[12.5px] mt-0.5 leading-tight">{value}</div>
    </div>
  );
}
