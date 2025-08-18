// src/components/ProducerDetail.js
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducer } from '../lib/useProducers';

/* === helpers === */
const getInitials = (name = '') =>
  name
    .replace(/["«»]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '??';

const stringHue = (s = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
  return h;
};

const BADGE_INFO = {
  'Честный знак': 'Федеральная система маркировки и прослеживаемости товаров.',
  Меркурий: 'Гос. система электронных ветсертификатов (Россельхознадзор).',
  Проверенный: 'Проверка документов/контактов администрацией сервиса.',
};

export default function ProducerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producer, loading, error } = useProducer(id);

  if (loading) {
    return <div className="max-w-md mx-auto px-3 pt-6 text-white/80">Загрузка…</div>;
  }
  if (error) {
    return <div className="max-w-md mx-auto px-3 pt-6 text-red-400">Ошибка загрузки производителя</div>;
  }
  if (!producer) {
    return <div className="max-w-md mx-auto px-3 pt-6 text-white/90">Производитель не найден</div>;
  }

  const {
    name = '',
    logo,
    region = '',
    fullDescription,
    description,
    address,
    categories = [],
    badges = [],
    site,
    contacts = {},
    gallery = [],
    founded,
    productionCapacity,
    exportMarkets = [],
  } = producer;

  const verified = badges?.includes('Проверенный');
  const premium = badges?.includes('Честный знак') && badges?.includes('Меркурий');

  const phones = Object.values(contacts).filter(
    (v) => typeof v === 'string' && /^[-+()\d\s]{7,}$/.test(v)
  );
  const emails = Object.values(contacts).filter((v) => typeof v === 'string' && /@/.test(v));
  const safeSite = site ? (site.startsWith('http') ? site : `https://${site}`) : null;

  const initialsBG = useMemo(() => {
    const h = stringHue(name || region || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .95),hsl(${(h + 40) % 360} 80% 30% / .95))`;
  }, [name, region]);

  const images = (gallery.length ? gallery : logo ? [logo] : []).slice(0, 12);

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
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
        {/* Баннер */}
        <div className="glass-card p-2">
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
            <div className="w-full aspect-[16/10] bg-black/40">
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
                {verified && (
                  <BadgeHint color="green" label="Проверенный" hint={BADGE_INFO['Проверенный']} />
                )}
                {badges
                  .filter((b) => b !== 'Проверенный')
                  .map((b, i) => (
                    <BadgeHint
                      key={i}
                      color={b === 'Честный знак' || b === 'Меркурий' ? 'blue' : 'gray'}
                      label={b}
                      hint={BADGE_INFO[b]}
                    />
                  ))}
                {premium && (
                  <span
                    className="ml-auto w-6 h-6 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm"
                    title="Premium"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgb(59,175,218)">
                      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Лого + инфо */}
        <div className={`glass-card p-3 ${premium ? 'premium' : ''}`}>
          <div className="grid grid-cols-[92px,1fr] gap-3 items-start">
            <div className="relative w-[92px] h-[92px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 grid place-items-center">
              {logo ? (
                <img
                  loading="lazy"
                  src={logo}
                  alt={name}
                  className="w-[86%] h-[86%] object-contain img-fade-in"
                  onError={(e) => {
                    e.currentTarget.remove();
                  }}
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 2C8 2 4 6 4 11c0 5.5 7 11 8 11s8-5.5 8-11c0-5-4-9-8-9z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                  <span>{region}</span>
                </div>
              )}

              {!!categories.length && (
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

              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {typeof founded !== 'undefined' && <Fact icon="📅" title="Основано" value={String(founded)} />}
                {productionCapacity && <Fact icon="⚙️" title="Мощность" value={productionCapacity} />}
                {exportMarkets && exportMarkets.length > 0 && (
                  <Fact
                    icon="🌍"
                    title="Экспорт"
                    value={exportMarkets.slice(0, 3).join(', ') + (exportMarkets.length > 3 ? '…' : '')}
                  />
                )}
              </div>
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

        {(phones.length || emails.length) > 0 && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-2">Контакты</div>
            <div className="grid grid-cols-2 gap-2">
              {phones[0] && (
                <a
                  href={`tel:${phones[0].replace(/[^+\d]/g, '')}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.72 19.72 0 01-8.63-3.12A19.72 19.72 0 013.2 6.18 2 2 0 015.09 4h3a2 2 0 012 1.72c.07.64.2 1.28.39 1.9a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.62.19 1.26.32 1.9.39A2 2 0 0122 16.92z" />
                  </svg>
                  Позвонить
                </a>
              )}
              {emails[0] && (
                <a
                  href={`mailto:${emails[0]}`}
                  className="flex items-center justify-center gap-2 rounded-lg py-2 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
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

        {safeSite && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-1">Сайт</div>
            <a
              href={safeSite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[rgba(59,175,218,0.95)] font-bold"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
              </svg>
              {safeSite.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {badges && badges.length > 0 && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-2">Сертификаты и статусы</div>
            <div className="flex flex-wrap gap-1.5">
              {badges.map((b, i) => (
                <BadgeHint
                  key={i}
                  color={b === 'Проверенный' ? 'green' : b === 'Меркурий' || b === 'Честный знак' ? 'blue' : 'gray'}
                  label={b}
                  hint={BADGE_INFO[b]}
                  large
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* === UI bits === */
function BadgeHint({ label, hint, color = 'gray', large = false }) {
  const [open, setOpen] = React.useState(false);
  const base = 'px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm border';
  const palette =
    color === 'green'
      ? 'text-white bg-green-600/60 border-white/20'
      : color === 'blue'
      ? 'text-white bg-[rgba(59,175,218,0.6)] border-[rgba(255,255,255,0.25)]'
      : 'text-white/90 bg-white/10 border-white/20';

  return (
    <span className="relative">
      <button
        onClick={() => hint && setOpen((v) => !v)}
        className={`${base} ${palette} ${large ? 'text-[11px] px-2.5' : ''}`}
        title={hint || label}
      >
        {label}
      </button>
      {open && hint && (
        <div
          className="absolute z-10 mt-1 w-56 glass-card p-2 text-[12px] text-white/90 border border-white/10 rounded-xl"
          onClick={() => setOpen(false)}
        >
          {hint}
        </div>
      )}
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
