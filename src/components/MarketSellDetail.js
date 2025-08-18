// src/components/MarketSellDetail.js
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ads from '../data/marketAdsDemo';
import ImageGallery from './ImageGallery';

const normPhone = (phone = '') => (phone ? phone.replace(/[^\d+]/g, '').replace(/^8/, '+7') : '');

export default function MarketSellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // поиск по демо-данным (можно расширить чтением из localStorage)
  const ad = useMemo(() => {
    const n = Number(id);
    return ads.find((x) => Number(x.id) === n) || null;
  }, [id]);

  if (!ad) {
    return (
      <div className="bg-black min-h-screen text-white p-6">
        <button onClick={() => navigate(-1)} className="text-[#23df81] mb-3">
          ← Назад
        </button>
        Объявление не найдено
      </div>
    );
  }

  const phone = normPhone(ad.contacts?.phone || '');
  const tel = phone ? `tel:${phone}` : '';
  const tg = ad.contacts?.telegram?.replace(/^@/, '') || '';

  const verified = !!ad.verified;
  const premium = !!ad.premium;

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg line-clamp-1">Объявление</h2>
          <span className="w-16" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-3 pt-3 space-y-3">
        {/* Галерея */}
        {Array.isArray(ad.images) && ad.images.length > 0 && (
          <div className="glass-card p-2">
            <ImageGallery images={ad.images} height={240} alt={ad.title} />
          </div>
        )}

        {/* Заголовок + бейджи + цена */}
        <div className={`glass-card p-3 ${premium ? 'premium' : ''}`}>
          <div className="text-white font-bold text-[16px] leading-snug">{ad.title}</div>

          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
            {verified && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/20 bg-green-600/60 backdrop-blur-sm">
                ✅ Проверенный
              </span>
            )}
            {premium && (
              <span
                className="w-5 h-5 rounded-full border border-[rgba(59,175,218,.7)] bg-white/10 grid place-items-center backdrop-blur-sm"
                title="Premium"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="rgb(59,175,218)">
                  <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
                </svg>
              </span>
            )}
          </div>

          {ad.price && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-extrabold text-white bg-[rgba(59,175,218,.85)] border border-white/20 backdrop-blur-sm">
                {ad.price}
              </span>
            </div>
          )}

          {(ad.company || ad.region) && (
            <div className="mt-2 flex items-center gap-1 text-white/80 text-sm">
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
              <span className="truncate">
                {ad.company}
                {ad.region ? ` · ${ad.region}` : ''}
              </span>
            </div>
          )}
        </div>

        {/* Описание */}
        {ad.description && (
          <div className="glass-card p-3">
            <div className="text-white/80 text-sm mb-1">Описание</div>
            <div className="text-white/90 text-[14px] leading-relaxed">{ad.description}</div>
          </div>
        )}

        {/* Условия/документы */}
        {(ad.documents || ad.warehouse || ad.payment) && (
          <div className="glass-card p-3 grid gap-2">
            {ad.documents && (
              <div>
                <div className="text-white/70 text-[12px]">Документы</div>
                <div className="text-white text-[14px]">{ad.documents}</div>
              </div>
            )}
            {ad.warehouse && (
              <div>
                <div className="text-white/70 text-[12px]">Склад</div>
                <div className="text-white text-[14px]">{ad.warehouse}</div>
              </div>
            )}
            {ad.payment && (
              <div>
                <div className="text-white/70 text-[12px]">Оплата</div>
                <div className="text-white text-[14px]">{ad.payment}</div>
              </div>
            )}
          </div>
        )}

        {/* Контакты/действия */}
        {(tel || tg) && (
          <div className="grid grid-cols-2 gap-2">
            <a
              href={tg ? `https://t.me/${tg}` : '#'}
              target={tg ? '_blank' : undefined}
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full ${
                tg
                  ? 'text-white border-white/10 bg-white/10 hover:bg-white/15'
                  : 'opacity-40 pointer-events-none bg-white/10 border-white/10'
              }`}
            >
              Telegram
            </a>
            <a
              href={tel || '#'}
              className={`inline-flex items-center justify-center gap-2 rounded-lg py-2 font-semibold border transition w-full ${
                tel
                  ? 'text-white border-white/10 bg-white/10 hover:bg-white/15'
                  : 'opacity-40 pointer-events-none bg-white/10 border-white/10'
              }`}
            >
              Позвонить
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
