// src/components/LogisticsShowcase.js
import React, { useState, useMemo } from "react";
import styles from "../styles/LogisticsShowcase.module.css";
import logisticsData from "../data/logistics";
import { useNavigate } from "react-router-dom";

export default function LogisticsShowcase() {
  const [region, setRegion] = useState(null);
  const navigate = useNavigate();

  const regions = useMemo(() => {
    const all = logisticsData.map(item => item.region).filter(Boolean);
    return [...new Set(all)];
  }, []);

  const filtered = region
    ? logisticsData.filter(item => item.region === region)
    : logisticsData;

  return (
    <div className={styles.wrap}>
      {/* Фильтр регионов */}
      <div className={styles.regionFilter}>
        <button
          className={region === null ? styles.regionActive : styles.regionBtn}
          onClick={() => setRegion(null)}
        >
          Все
        </button>
        {regions.map(r => (
          <button
            key={r}
            className={region === r ? styles.regionActive : styles.regionBtn}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Сетка карточек */}
      <div className={styles.grid}>
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className={`${styles.card} group hover:shadow-glass-blue-hover transition-shadow`}
            onClick={() => navigate(`/supplier/${item.id}`)}
          >
            <div className={styles.imgBox}>
              <img
                src={item.logo || "/images/no-image.webp"}
                alt={item.name}
                className={styles.logo}
                onError={(e) => (e.currentTarget.src = "/images/no-image.webp")}
              />
            </div>

            {/* Название + город компактно */}
            <div className="px-2 py-2 text-center leading-snug">
              <div className="text-white font-semibold text-[13px] truncate">
                {item.name}
              </div>
              {item.city && (
                <div className="text-white/60 text-[11px] truncate">
                  {item.city}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
