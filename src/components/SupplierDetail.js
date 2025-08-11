// src/components/SupplierDetail.js
import React, { useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import suppliers from '../data/suppliers';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

/* ===== helpers ===== */
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
  Проверенный: 'Контакты и документы верифицированы администрацией сервиса.',
  'Честный знак': 'Государственная система маркировки и прослеживаемости.',
  Меркурий: 'Электронные ветеринарные сертификаты (Россельхознадзор).',
};

const normalizePhone = (phone = '') => phone.replace(/[^\d+]/g, '').replace(/^8/, '+7');

/* ===== component ===== */
export default function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const company = suppliers.find((s) => s.id === id) || null;

  const {
    name = '',
    region = '',
    city = '',
    address = '',
    products = [],
    logo,
    verified = false,
    shortDescription = '',
    fullDescription = '',
    advantages = [],
    delivery = '',
    volumes = '',
    priceList,
    contacts = {},
    certs = [],
    gallery = [],
    mapUrl,
  } = company || {};

  const initialsBG = useMemo(() => {
    const h = stringHue(name || city || region || 'x');
    return `linear-gradient(135deg,hsl(${h} 80% 20% / .95),hsl(${(h + 40) % 360} 80% 30% / .95))`;
  }, [name, city, region]);

  const phone = contacts?.phone ? normalizePhone(contacts.phone) : '';
  const email = contacts?.email || '';
  const tg = contacts?.telegram?.replace(/^@/, '') || '';

  const tel = phone ? `tel:${phone}` : '';
  const mailto = email ? `mailto:${email}` : '';
  const site =
    company?.site || contacts?.site
      ? String(company?.site || contacts?.site).startsWith('http')
        ? String(company?.site || contacts?.site)
        : `https://${String(company?.site || contacts?.site)}`
      : '';

  // Галерея
  const swiperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const images = (gallery && gallery.length ? gallery : logo ? [logo] : []).slice(0, 12);

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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">Поставщик</h2>
          <span className="w-16" />
        </div>
      </div>

      {!company ? (
        <div className="max-w-md mx-auto px-3 pt-6 text-white/90">Компания не найдена</div>
      ) : (
        <div className="max-w-md mx-auto px-3 pt-3 space-y-3">
          {/* BANNER (крупное фото) */}
          <div className="glass-card p-2">
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
              {/* Если Tailwind < v3, замени aspect-[16/10] на h-56 */}
              <div className="w-full aspect-[16/10] bg-black/35">
                {images.length ? (
                  <img
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

              {/* Заголовок + бейджи */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                <div className="text-white font-extrabold text-[18px] leading-tight">{name}</div>
                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                  {verified && (
                    <BadgeHint color="green" label="Проверенный" hint={BADGE_INFO['Проверенный']} />
                  )}
                  {certs.map((b, i) => (
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

          {/* ВИЗИТКА: лого + город/регион + чипы + краткое описание (без контактов!) */}
          <div className="glass-card p-3">
            <div className="grid grid-cols-[92px,1fr] gap-3 items-start">
              {/* Логотип */}
              <div className="relative w-[92px] h-[92px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 grid place-items-center">
                {logo ? (
                  <img
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

              {/* Правый блок */}
              <div className="min-w-0">
                {(city || region) && (
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
                    <span className="truncate">{city || region}</span>
                  </div>
                )}

                {!!products.length && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {products.slice(0, 4).map((p, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white/90 border border-white/15 bg-white/10 backdrop-blur-sm"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {shortDescription && (
              <div className="mt-2 text-white/90 text-[14px] leading-relaxed">
                {shortDescription}
              </div>
            )}
          </div>

          {/* О компании */}
          {(fullDescription || shortDescription) && (
            <div className="glass-card p-3">
              <div className="text-white font-semibold text-[15px] mb-1">О компании</div>
              <div className="text-white/90 text-[14px] leading-relaxed">
                {fullDescription || shortDescription}
              </div>
            </div>
          )}

          {/* Преимущества */}
          {!!advantages.length && (
            <div className="glass-card p-3">
              <div className="text-white font-semibold text-[15px] mb-1">Преимущества</div>
              <ul className="list-disc pl-5 space-y-1.5 text-white/95 text-[14px]">
                {advantages.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Доставка */}
          {delivery && (
            <div className="glass-card p-3">
              <div className="text-white/80 text-sm mb-1">Доставка</div>
              <div className="text-white font-medium text-[14px]">{delivery}</div>
            </div>
          )}

          {/* Объёмы */}
          {volumes && (
            <div className="glass-card p-3">
              <div className="text-white/80 text-sm mb-1">Объёмы</div>
              <div className="text-white font-medium text-[14px]">{volumes}</div>
            </div>
          )}

          {/* Документы / Прайс */}
          {(certs.length || priceList) > 0 && (
            <div className="glass-card p-3">
              <div className="text-white/80 text-sm mb-2">Документы</div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {certs.map((b, i) => (
                  <BadgeHint
                    key={i}
                    color={b === 'Честный знак' || b === 'Меркурий' ? 'blue' : 'gray'}
                    label={b}
                    hint={BADGE_INFO[b]}
                    large
                  />
                ))}
              </div>
              {priceList && (
                <a
                  href={priceList}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold bg-[rgba(59,175,218,0.95)] text-black hover:opacity-90 transition"
                >
                  📄 Скачать прайс
                </a>
              )}
            </div>
          )}

          {/* КОНТАКТЫ — отдельная премиум секция */}
          {(phone || email || tg || site) && (
            <div className="glass-card p-3">
              <div className="text-white font-semibold text-[15px] mb-2">Контакты</div>

              {/* Крупные кнопки */}
              <div className="grid grid-cols-2 gap-2">
                <ActionBtn
                  href={tg ? `https://t.me/${tg}` : ''}
                  label="Telegram"
                  icon="tg"
                  disabled={!tg}
                />
                <ActionBtn
                  href={phone ? `https://wa.me/${phone.replace('+', '')}` : ''}
                  label="WhatsApp"
                  icon="wa"
                  disabled={!phone}
                />
                <ActionBtn href={tel || '#'} label="Позвонить" icon="call" disabled={!tel} />
                <ActionBtn href={mailto || '#'} label="Email" icon="mail" disabled={!mailto} />
              </div>

              {/* Сайт — отдельной строкой */}
              {site && (
                <a
                  href={site}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 w-full rounded-lg py-2 px-3 bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                    <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
                  </svg>
                  {site.replace(/^https?:\/\//, '')}
                </a>
              )}

              {/* Текстовые контакты */}
              <div className="mt-2 grid gap-1 text-white/90 text-[13px]">
                {contacts?.phone && <div>Тел.: {contacts.phone}</div>}
                {email && <div>E‑mail: {email}</div>}
                {tg && <div>Telegram: @{tg}</div>}
              </div>
            </div>
          )}

          {/* Адрес */}
          {address && (
            <div className="glass-card p-3">
              <div className="text-white/80 text-sm mb-1">Адрес</div>
              <div className="text-white font-medium text-[14px]">{address}</div>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-[rgba(59,175,218,0.95)] font-bold"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                    <path d="M5 5h7v2H7v10h10v-5h2v7H5z" />
                  </svg>
                  Открыть карту
                </a>
              )}
            </div>
          )}

          {/* ГАЛЕРЕЯ */}
          {images.length > 0 && (
            <div className="glass-card p-2">
              <div className="text-white font-semibold text-[15px] mb-2 px-1">Галерея</div>
              <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
                {/* Если Tailwind < v3, замени aspect-[4/3] на h-56 */}
                <div className="w-full aspect-[4/3]">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    onSwiper={(s) => (swiperRef.current = s)}
                    onSlideChange={(s) => setActiveIdx(s.activeIndex)}
                    style={{ borderRadius: 12 }}
                  >
                    {images.map((src, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={src}
                          alt={`${name} фото ${i + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/no-image.webp';
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              {images.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar px-1">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => swiperRef.current?.slideTo(i)}
                      className={[
                        'shrink-0 w-16 h-12 rounded-lg overflow-hidden border',
                        i === activeIdx ? 'border-[rgba(59,175,218,0.9)]' : 'border-white/15',
                      ].join(' ')}
                      title={`фото ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/no-image.webp';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ===== small UI bits ===== */
function BadgeHint({ label, hint, color = 'gray', large = false }) {
  const [open, setOpen] = useState(false);
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

function ActionBtn({ href, label, icon, disabled, gradient = false }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full';
  const palette = disabled
    ? 'opacity-40 pointer-events-none bg-white/10 border-white/10'
    : gradient
      ? 'text-white border-white/10 bg-gradient-to-r from-[#2678f3] to-[#44e2ff] hover:brightness-110'
      : 'text-white border-white/10 bg-white/10 hover:bg-white/15';

  return (
    <a
      href={href || '#'}
      target={href ? '_blank' : undefined}
      rel="noreferrer"
      className={`${base} ${palette}`}
    >
      {icon === 'tg' && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.04 15.47l-.37 5.2c.53 0 .76-.23 1.04-.51l2.5-2.41 5.18 3.79c.95.52 1.62.25 1.88-.88l3.41-16.02.01-.01c.3-1.4-.5-1.95-1.4-1.6L2.2 9.4c-1.36.53-1.34 1.28-.23 1.62l5.2 1.62L19.4 6.1c.6-.38 1.14-.17.7.21" />
        </svg>
      )}
      {icon === 'wa' && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3.5A10 10 0 004.3 17.8L3 22l4.3-1.3A10 10 0 1020 3.5zm-8 17a8.8 8.8 0 01-4.5-1.2l-.3-.2-2.6.8.8-2.5-.2-.3A8.8 8.8 0 1112 20.5zm4.9-6.4c-.3-.2-1.6-.8-1.8-.9-.3-.1-.5-.2-.7.2-.2.3-.9 1-.9 1.2-.2.2-.3.2-.6 0s-1.2-.4-2.3-1.5c-.8-.8-1.3-1.7-1.5-2-.2-.3 0-.4.2-.6l.5-.6c.2-.2.2-.3.3-.5s0-.4-.1-.5c-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4s-1 1-1 2.5 1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.2-.2-.4-.3-.7-.5z" />
        </svg>
      )}
      {icon === 'call' && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.72 19.72 0 01-8.63-3.12A19.72 19.72 0 013.2 6.18 2 2 0 015.09 4h3a2 2 0 012 1.72c.07.64.2 1.28.39 1.9a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.62.19 1.26.32 1.9.39A2 2 0 0122 16.92z" />
        </svg>
      )}
      {icon === 'mail' && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      )}
      {label}
    </a>
  );
}
