// src/components/NeirobizScreen.js
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import services from '../data/neirobiz';
import neirobizServices from '../data/neirobizServices';

// размер карточки (мобайл-первый)
const CARD = 172;
const RADIUS = 20;

function mergeServices() {
  // склеиваем: визуальные карточки + описания из services
  const byId = Object.fromEntries(services.map((s) => [s.id, s]));
  return neirobizServices.map((card) => ({
    ...card,
    // эмодзи НЕ выводим — по просьбе клиента
    short: byId[card.id]?.short || card.description || '',
  }));
}

export default function NeirobizScreen() {
  const navigate = useNavigate();
  const items = useMemo(mergeServices, []);

  return (
    <div className="bg-black min-h-screen pb-24 pt-6 flex flex-col items-center">
      {/* Заголовок */}
      <div className="w-full max-w-[420px] px-4">
        <h1 className="text-white font-extrabold text-[22px] tracking-[.02em]">NeiroBiz</h1>
        <div className="text-[#b5e0fe] text-[14.5px] mt-1 font-semibold">
          AI‑сервисы и генерация упаковки
        </div>
        <div className="text-white/70 text-[13px] mt-1">
          Автоматизируйте бизнес через ботов, мини‑приложения, дизайн и аналитику.{' '}
          <span className="text-[#23df81] font-semibold">Оформите заявку — результат быстрее.</span>
        </div>
      </div>

      {/* Сетка карточек */}
      <div
        className="mt-4 grid justify-center gap-4"
        style={{ gridTemplateColumns: `repeat(2, min(${CARD}px, 44vw))` }}
      >
        {items.map((svc) => (
          <button
            key={svc.id}
            onClick={() => navigate(`/neirobiz/service/${svc.id}`)}
            className={[
              // стекло
              'relative text-left bg-white/10 border border-white/10 backdrop-blur-md',
              // форма
              'rounded-2xl p-2',
              // эффект/свечение
              'shadow-[0_10px_30px_rgba(14,129,255,0.18)]',
              'hover:shadow-[0_14px_40px_rgba(14,129,255,0.26)]',
              'transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[.99]',
            ].join(' ')}
            style={{ width: CARD, maxWidth: '44vw' }}
          >
            {/* Медиа */}
            <div
              className="relative w-full overflow-hidden border border-white/10"
              style={{ borderRadius: RADIUS - 6 }}
            >
              <div className="w-full aspect-square bg-[#0f141c]">
                <img
                  loading="lazy"
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  onError={(e) => (e.currentTarget.src = '/images/no-image.webp')}
                />
              </div>

              {/* хладный градиент снизу */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />
              {/* Акцентная тонкая кайма */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[16px]"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,255,255,.08), 0 24px 60px -26px rgba(14,129,255,.38)',
                }}
              />
            </div>

            {/* Текст */}
            <div className="mt-2 px-0.5">
              <div
                className="text-white font-bold text-[14px] leading-tight truncate"
                title={svc.title}
              >
                {svc.title}
              </div>
              <div className="text-white/70 text-[11.5px] leading-snug mt-1 line-clamp-2">
                {svc.short}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
