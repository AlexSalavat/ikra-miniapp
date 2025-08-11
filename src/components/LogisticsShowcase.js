// src/components/LogisticsShowcase.js
import React, { useMemo, useState } from 'react';
import styles from '../styles/LogisticsShowcase.module.css';
import logistics from '../data/logistics';

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

function initialsBG(seed = 'x') {
  const h = stringHue(seed);
  return `linear-gradient(135deg,
      hsl(${h} 80% 20% / .95),
      hsl(${(h + 40) % 360} 80% 30% / .95)
    )`;
}

/* ===== main ===== */
export default function LogisticsShowcase() {
  // Список регионов строим из данных, чтобы ничего не потерять
  const regions = useMemo(() => {
    const set = new Set(logistics.map((i) => i.region).filter(Boolean));
    return ['Все', ...Array.from(set)];
  }, []);

  const [filter, setFilter] = useState(regions[0] || 'Все');

  const filtered = useMemo(() => {
    if (filter === 'Все') return logistics;
    return logistics.filter((i) => i.region === filter);
  }, [filter]);

  // Добиваем пустыми карточками, чтобы сетка выглядела ровно
  const cards = useMemo(() => {
    const arr = [...filtered];
    const minTotal = 10;
    if (arr.length < minTotal) {
      for (let i = arr.length; i < minTotal; i++) arr.push({ isEmpty: true, id: `empty-${i}` });
    }
    return arr;
  }, [filtered]);

  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Шапка */}
      <div className="sticky top-0 z-20 w-full bg-black/75 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[800px] mx-auto px-3 py-3 flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-[#23df81] hover:text-white transition"
            aria-label="Назад"
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
          <h2 className="ml-auto mr-auto text-white font-bold text-lg">Логистика ДВ</h2>
          <span className="w-16" />
        </div>
      </div>

      {/* Контент */}
      <div className={styles.wrap}>
        {/* Фильтры регионов */}
        <div className={styles.regionFilter}>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={r === filter ? styles.regionActive : styles.regionBtn}
              title={r}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Сетка карточек */}
        <div className={styles.grid}>
          {cards.map((item, idx) => {
            if (item.isEmpty) {
              return (
                <div key={item.id || `empty-${idx}`} className={`${styles.card} ${styles.empty}`}>
                  <div className={styles.placeholderText}>Место свободно</div>
                </div>
              );
            }

            const showLogo = Boolean(item.logo);
            const city = item.city || ''; // адрес/город мы в карточке НЕ показываем по ТЗ
            const bg = initialsBG(item.name || item.region || 'x');

            return (
              <div key={item.id || idx} className={styles.card}>
                {/* Медиа‑зона */}
                <div className={styles.imgBox}>
                  {showLogo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className={styles.logo}
                      onError={(e) => (e.currentTarget.src = '/images/no-image.webp')}
                    />
                  ) : (
                    // fallback — стеклянная плитка с инициалами
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: 24,
                        background: bg,
                      }}
                    >
                      {getInitials(item.name)}
                    </div>
                  )}
                </div>

                {/* Тексты */}
                <div className={styles.text}>
                  <div className={styles.name} title={item.name}>
                    {item.name}
                  </div>
                  {/* Город/регион — аккуратно и компактно */}
                  <div className={styles.city}>{city || item.region || '—'}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
